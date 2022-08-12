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

/* Aliucord Badges */

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

const aliucordCustom = React.memo(({ text, url, tooltipPosition, gap }) => (
  <Base
    tooltipPosition={tooltipPosition}
    onClick={(() => void 0)}
    className='gb-badge-aliucordCustom'
    tooltip={text}
    gap={gap}
  >
    <img src={url} alt={text}/>
  </Base>
));


/* Better Discord Badges */
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


/* Enmity Badges */
const EnDevs = React.memo(({ name, url, tooltipPosition, gap }) => (
  <Base
    tooltipPosition={tooltipPosition}
    onClick={(() => void 0)}
    className='gb-badge-EnDevs'
    tooltip={name}
    gap={gap}
  >
    <img src={url.dark} alt={name}/>
  </Base>
));

const EnCon = React.memo(({ name, url, tooltipPosition, gap }) => (
  <Base
    tooltipPosition={tooltipPosition}
    onClick={(() => void 0)}
    className='gb-badge-EnContributor'
    tooltip={name}
    gap={gap}
  >
    <img src={url.dark} alt={name}/>
  </Base>
));

const EnStaff = React.memo(({ name, url, tooltipPosition, gap }) => (
  <Base
    tooltipPosition={tooltipPosition}
    onClick={(() => void 0)}
    className='gb-badge-EnStaff'
    tooltip={name}
    gap={gap}
  >
    <img src={url.dark} alt={name}/>
  </Base>
));

const EnSupporter = React.memo(({ name, url, tooltipPosition, gap }) => (
  <Base
    tooltipPosition={tooltipPosition}
    onClick={(() => void 0)}
    className='gb-badge-EnSupporter'
    tooltip={name}
    gap={gap}
  >
    <img src={url.dark} alt={name}/>
  </Base>
));

/* GooseMod */
const GMSponsor = React.memo(({ tooltipPosition, gap }) => (
  <Base
    tooltipPosition={tooltipPosition}
    onClick={(() => void 0)}
    className='gb-badge-GMSponsor'
    tooltip='GooseMod Sponsor'
    gap={gap}
  >
    <img src='https://goosemod.com/img/goose_gold.jpg' alt='GooseMod Sponsor'/>
  </Base>
));

const GMTranslator = React.memo(({ tooltipPosition, gap }) => (
  <Base
    tooltipPosition={tooltipPosition}
    onClick={(() => void 0)}
    className='gb-badge-GMTranslaor'
    tooltip='GooseMod Translator'
    gap={gap}
  >
    <img src='https://goosemod.com/img/goose_globe.png' alt='GooseMod Translator'/>
  </Base>
));

const GMDeveloper = React.memo(({ tooltipPosition, gap }) => (
  <Base
    tooltipPosition={tooltipPosition}
    onClick={(() => void 0)}
    className='gb-badge-GMDeveloper'
    tooltip='GooseMod Developer'
    gap={gap}
  >
    <img src='https://goosemod.com/img/goose_glitch.jpg' alt='GooseMod Developer'/>
  </Base>
));

module.exports = {
  BDB,
  // Better Discord
  BDDevs,
  // Aliucord
  // aliucordDev,
  aliucordContr,
  aliucordDono,
  aliucordCustom,
  // Enmity
  EnDevs,
  EnCon,
  EnStaff,
  EnSupporter,
  // GooseMod
  GMSponsor,
  GMTranslator,
  GMDeveloper
};