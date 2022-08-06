const { Plugin } = require('powercord/entities');
const { join } = require('path');
const { React, getModule, getAllModules, getModuleByDisplayName } = require('powercord/webpack');
const { forceUpdateElement, getOwnerInstance } = require('powercord/util');
const { inject, uninject } = require('powercord/injector');
const { get } = require('powercord/http');

const { loadStyle, unloadStyle } = require('./util');
// const Badges = require('./Badges');

module.exports = class GlobalBadges extends Plugin {

    startPlugin() {
        this.injectUsers();
    };
    
    pluginWillUnload () {
        const styleId = loadStyle(join(__dirname, 'style.css'));
    
        unloadStyle(styleId);
        uninject('pc-badges-users-render');
        uninject('pc-badges-users-update');
        uninject('pc-badges-users-fetch');
    
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
  inject('pc-badges-users', UserProfileBadgeList, 'default', ([ props ], res) => {
    const [ badges, setBadges ] = React.useState(null);
    React.useEffect(() => {
      if (!cache[props.user.id]) {
        const baseUrl = `https://api.obamabot.cf/v2/text/data`;
        cache[props.user.id] = get(`${baseUrl}`)
          .catch((e) => e)
          .then((res) => {
            if (res.statusCode === 200 || res.statusCode === 404) {
              return res.body.badges || {};
            }

            delete cache[props.user.id];
            return {};
          });
      }

      cache[props.user.id].then((b) => setBadges(b));
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
    if (badges.developer) {
      res.props.children.push(render(Badges.Developer, 'developer'));
    }
    if (badges.staff) {
      res.props.children.push(render(Badges.Staff, 'staff'));
    }
    if (badges.support) {
      res.props.children.push(render(Badges.Support, 'support'));
    }
    if (badges.contributor) {
      res.props.children.push(render(Badges.Contributor, 'contributor'));
    }
    if (badges.translator) {
      res.props.children.push(render(Badges.Translator, 'translator'));
    }
    if (badges.hunter) {
      res.props.children.push(render(Badges.BugHunter, 'hunter'));
    }
    if (badges.early) {
      res.props.children.push(render(Badges.EarlyUser, 'early'));
    }
    if (badges.booster) {
      res.props.children.push(render(Badges.Booster, 'booster'));
    }

    return res;
  });

  UserProfileBadgeList.default.displayName = 'UserProfileBadgeList';
}


}