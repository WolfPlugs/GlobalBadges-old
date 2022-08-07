const { Clickable, Tooltip, Icons: { badges: BadgeIcons }  } = require('powercord/components');

const { gotoOrJoinServer } = require('powercord/util');
const { shell: { openExternal } } = require('electron');
const { WEBSITE, I18N_WEBSITE, DISCORD_INVITE, REPO_URL } = require('powercord/constants');

const { React, getModule, i18n: { Messages } } = require('powercord/webpack');


const Base = React.memo(({ color, tooltip, tooltipPosition, onClick, className, children, gap }) => {
  const { profileBadge22 } = getModule([ 'profileBadge22' ], false);
  return (
    <Clickable onClick={onClick || (() => void 0)} className='powercord-badge-wrapper'>
      <Tooltip text={tooltip} position={tooltipPosition || 'top' } spacing={gap === false ? 0 : 24}>
        <div className={`${profileBadge22} powercord-badge ${className}`} style={{ color: `#${color || '7289da'}` }}>
          {children}
        </div>
      </Tooltip>
    </Clickable>
  );
});

const Custom = React.memo(({ name, icon, tooltipPosition, gap }) => (
  <Base
    tooltipPosition={tooltipPosition}
    onClick={() => openModal(DonateModal)}
    className='powercord-badge-cutie'
    tooltip={name}
    gap={gap}
  >
    <img src={icon} alt='Custom badge'/>
  </Base>
));


module.exports = {
  Custom,
};