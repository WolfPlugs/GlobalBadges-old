const { Plugin } = require('powercord/entities');
const { join } = require('path');
const { React, getModule, getAllModules } = require('powercord/webpack');
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
        this.loadStylesheet(join(__dirname, 'style.css'));
    };
    
    pluginWillUnload () {
    
        uninject('gb-badges-users')
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
        cache[userId] = await get(`https://api.obamabot.me/v2/text/badges?user=${userId}`)
          .catch((e) => e)
          .then((res) => {
            if (res.statusCode === 200 || res.statusCode === 404) {
              return{
                badges: res.body || {},
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
        key: `gb-${key}`,
        ...props
      })
    );

    if (badges.BDB && badges.BDB.name && badges.BDB.img) {
      res.props.children.push(render(Badges.BDB, 'bdb', badges.BDB));
    }

    // Aliucord

    // Aliucord Contributor
    if (badges.aliu.roles && badges.aliu.roles.find(r => r == 'contributor')) {
     res.props.children.push(render(Badges.aliucordContr, 'aliucordContributor'));
    }

    // Aliucord Donor
    if (badges.aliu.roles && badges.aliu.roles.find(r => r == 'donor')) {
      res.props.children.push(render(Badges.aliucordDono, 'aliucordDonor'));
    }

    // Aliucord Custom Badge
    if (badges.aliu.roles && badges.aliu.custom) {
      res.props.children.push(render(Badges.aliucordCustom, 'aliucordCustom', badges.aliu.custom[0]));
    }

    // Better Discord

    // BD Devs
    if (badges.BD) {
      res.props.children.push(render(Badges.BDDevs, 'BDDevs'));
    }

    // Enmity

    // EN Devs
    if (badges.enmity && badges.enmity.dev) {
      res.props.children.push(render(Badges.EnDevs, 'ENDevs', badges.enmity.dev.data));
    }

    // EN Contributors
    if (badges.enmity && badges.enmity.contributor) {
      res.props.children.push(render(Badges.EnDevs, 'ENContributor', badges.enmity.contributor.data));
    }

    // EN Staff
    if (badges.enmity && badges.enmity.staff) {
      res.props.children.push(render(Badges.EnStaff, 'ENStaff', badges.enmity.staff.data));
    }

    // EN supporter
    if (badges.enmity && badges.enmity.supporter) {
      res.props.children.push(render(Badges.EnSupporter, 'ENSupporter', badges.enmity.supporter.data));
    }

    // EN Custom
    if (badges.enmity && badges.enmity[userId]) {
      res.props.children.push(render(Badges.EnCustom, 'EnCustom', badges.enmity[userId].data));
    }

    // Goosemode

    // GM Sponsor
    if (badges.goosemod && badges.goosemod.sponsor) {
      res.props.children.push(render(Badges.GMSponsor, 'GMSponsor'));
    }

    // GM Sponsor
    if (badges.goosemod && badges.goosemod.dev) {
      res.props.children.push(render(Badges.GMTranslator, 'GMTranslator'));
    }
    
    // GM Sponsor
    if (badges.goosemod && badges.goosemod.translator) {
      res.props.children.push(render(Badges.GMDeveloper, 'GMDeveloper'));
    }

    return res;
  });

  UserProfileBadgeList.default.displayName = 'UserProfileBadgeList';
}

}