import { alchemyEvents } from "./alchemy.js";
import { blackSwanEvents } from "./blackSwan.js";
import { bombEvents } from "./bombs.js";
import { chainEvents } from "./chain.js";
import { courtEvents } from "./court.js";
import { eraSpecificEvents } from "./eraSpecific.js";
import { haremEvents } from "./harem.js";
import { longGameEvents } from "./longGame.js";
import { militaryEvents } from "./military.js";
import { peopleEvents } from "./people.js";
import { pleasureEvents } from "./pleasure.js";
import { rareEvents } from "./rare.js";
import { treasuryEvents } from "./treasury.js";

export const EVENT_POOL = [
  ...courtEvents,
  ...treasuryEvents,
  ...peopleEvents,
  ...militaryEvents,
  ...haremEvents,
  ...alchemyEvents,
  ...pleasureEvents,
  ...blackSwanEvents,
  ...eraSpecificEvents,
  ...longGameEvents,
  ...chainEvents,
  ...rareEvents
];

export const BOMB_EVENTS = bombEvents;
