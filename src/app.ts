import * as tmi from 'tmi.js';
import {ENV_VAR} from './secrets/bot';
import {Bot} from './Bot/Bot';

new Bot(tmi, ENV_VAR);