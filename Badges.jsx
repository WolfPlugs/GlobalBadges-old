const { Clickable, Tooltip, Icons: { badges: BadgeIcons }  } = require('powercord/components');

const { gotoOrJoinServer } = require('powercord/util');
const { shell: { openExternal } } = require('electron');
const { WEBSITE, I18N_WEBSITE, DISCORD_INVITE, REPO_URL } = require('powercord/constants');

const { React, getModule, i18n: { Messages } } = require('powercord/webpack');


const Base = React.memo(({ color, tooltip, tooltipPosition, onClick, className, children, gap }) => {
  const { profileBadge22 } = getModule([ 'profileBadge22' ], false);
  return (
    <Clickable onClick={onClick || (() => void 0)} className='gb-badge-wrapper'>
      <Tooltip text={tooltip} position={tooltipPosition || 'top' } spacing={gap === false ? 0 : 24}>
        <div className={`${profileBadge22} gb-badge ${className}`} style={{ color: `#${color || '7289da'}` }}>
          {children}
        </div>
      </Tooltip>
    </Clickable>
  );
});

const BDB = React.memo(({ name, img, tooltipPosition, gap }) => (
  <Base
    tooltipPosition={tooltipPosition}
    onClick={() => openModal(DonateModal)}
    className='gb-badge-bdb'
    tooltip={name}
    gap={gap}
  >
    <img src={img} alt='Custom badge'/>
  </Base>
));

const aliucordDev = React.memo(({ name, img, tooltipPosition, gap }) => (
  <Base
    tooltipPosition={tooltipPosition}
    onClick={() => openModal(DonateModal)}
    className='gb-badge-aliDev'
    tooltip={name}
    gap={gap}
  >
    <img src={img} alt='Aliucord Developer'/>
  </Base>
));

const aliucordContr = React.memo(({ tooltipPosition, gap }) => (
  <Base
    tooltipPosition={tooltipPosition}
    onClick={() => openModal(DonateModal)}
    className='gb-badge-aliContr'
    tooltip='Aliucord Contributor'
    gap={gap}
  >
    <img src='https://cdn.discordapp.com/emojis/886587553187246120.webp' alt='Aliucord Contributor'/>
  </Base>
));

const aliucordDono = React.memo(({ name, img, tooltipPosition, gap }) => (
  <Base
    tooltipPosition={tooltipPosition}
    onClick={() => openModal(DonateModal)}
    className='gb-badge-aliDono'
    tooltip={name}
    gap={gap}
  >
    <img src='https://cdn.discordapp.com/emojis/859801776232202280.webp' alt='Aliucord Donor'/>
  </Base>
));

module.exports = {
  BDB,
  aliucordDev,
  aliucordContr,
  aliucordDono
};