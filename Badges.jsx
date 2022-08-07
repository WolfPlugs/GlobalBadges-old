const { Clickable, Tooltip } = require('powercord/components');
const { React, getModule } = require('powercord/webpack');


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
    className='global-badge-custom'
    tooltip={name}
    gap={gap}
  >
    <img src={icon} alt='Custom badge'/>
  </Base>
));

module.exports = {
  Custom
};