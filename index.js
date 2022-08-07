const { Plugin } = require('powercord/entities');
const { join } = require('path');
const { React, getModule, getAllModules, getModuleByDisplayName } = require('powercord/webpack');
const { forceUpdateElement, getOwnerInstance } = require('powercord/util');
const { inject, uninject } = require('powercord/injector');
const { get } = require('powercord/http');

const { loadStyle, unloadStyle } = require('./util');
const Badges = require('./Badges');

const cache = { _guilds: {} };
const REFRESH_INTERVAL = 1000 * 60 * 30;

module.exports = class GlobalBadges extends Plugin {

    startPlugin() {
        this.injectUsers();
    };
    
    pluginWillUnload () {
        const styleId = loadStyle(join(__dirname, 'style.css'));
    
        unloadStyle(styleId);
        uninject('gb-badges-users-render');
        uninject('gb-badges-users-update');
        uninject('gb-badges-users-fetch');
    
        const containerClasses = getModule([ 'subscribeTooltipText' ], false);
        const modalClasses = getModule([ 'topSectionNormal' ], false);
        if (containerClasses) {
          forceUpdateElement(`.${containerClasses.container}`);
        }
        if (modalClasses) {
          const modalHeader = document.querySelector(`.${modalClasses.topSectionNormal} header`);
          if (modalHeader) {
            const instance = getOwnerInstance(modalHeader);
            (instance._reactInternals || instance._reactInternalFiber).return.stateNode.forceUpdate();
          }
        }
    }

async injectUsers () {
  const UserProfileBadgeList = getAllModules((m) => m.default?.displayName === 'UserProfileBadgeList')[1]; // Discord have two identical components but only 2nd is actually used?
  inject('gb-badges-users', UserProfileBadgeList, 'default', ([ props ], res) => {
    const [ badges, setBadges ] = React.useState(null);
    const userId = props.user.id;
      React.useEffect(async () => {
        if (!cache[userId] || cache[userId].lastFetch < Date.now() - REFRESH_INTERVAL) {
        cache[userId] = await get(`https://api.obamabot.cf/v2/text/data`)
          .catch((e) => e)
          .then((res) => {
            if (res.statusCode === 200 || res.statusCode === 404) {
              return{
                badges: res.body.badges || {},
                lastFetch: Date.now()
              };
            }

            delete cache[userId];
            return {
              badges: {},
              lastFetch: Date.now()
            };
          });
      }

      setBadges(cache[userId].badges);
    }, []);

    if (!badges) {
      return res;
    }

    const render = (Component, key, props = {}) => (
      React.createElement(Component, {
        key: `pc-${key}`,
        color: badges.custom && badges.custom.color,
        ...props
      })
    );

    if (badges.custom && badges.custom.name && badges.custom.icon) {
      res.props.children.push(render(Badges.Custom, 'cutie', badges.custom));
    }

    return res;
  });

  UserProfileBadgeList.default.displayName = 'UserProfileBadgeList';
}


}