const { Clickable, Tooltip  } = require('powercord/components');
const Icons = require("./Icons/") ;

const { React, getModule } = require('powercord/webpack');


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
    onClick={(() => void 0)}
    className='gb-badge-bdb'
    tooltip={name}
    gap={gap}
  >
    <img src={img} alt='BDB Badge'/>
  </Base>
));

// const aliucordDev = React.memo(({ name, img, tooltipPosition, gap }) => (
//   <Base
//     tooltipPosition={tooltipPosition}
//     onClick={(() => void 0)}
//     className='gb-badge-aliDev'
//     tooltip={name}
//     gap={gap}
//   >
//     <img src={img} alt='Aliucord Developer'/>
//   </Base>
// ));

const aliucordContr = React.memo(({ tooltipPosition, gap }) => (
  <Base
    tooltipPosition={tooltipPosition}
    onClick={(() => void 0)}
    className='gb-badge-aliucordContributor'
    tooltip='Aliucord Contributor'
    gap={gap}
  >
    <img src='https://cdn.discordapp.com/emojis/886587553187246120.webp' alt='Aliucord Contributor'/>
  </Base>
));

const aliucordDono = React.memo(({ tooltipPosition, gap }) => (
  <Base
    tooltipPosition={tooltipPosition}
    onClick={(() => void 0)}
    className='gb-badge-aliucordDonor'
    tooltip='Aliucord Donor'
    gap={gap}
  >
    <img src='https://cdn.discordapp.com/emojis/859801776232202280.webp' alt='Aliucord Donor'/>
  </Base>
));

const BDDevs = React.memo(({ tooltipPosition, gap }) => (
  <Base
    tooltipPosition={tooltipPosition}
    onClick={(() => void 0)}
    className='gb-badge-BDDevs'
    tooltip='BetterDiscord Developer'
    gap={gap}
  >
    <Icons.bdlogo/>
  </Base>
));

module.exports = {
  BDB,
  // aliucordDev,
  BDDevs,
  aliucordContr,
  aliucordDono
};