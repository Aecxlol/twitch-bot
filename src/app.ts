import * as dotenv from 'dotenv';
import * as tmi from 'tmi.js';
import {Bot} from './Bot/Bot';
import {Twitch} from "./Api/Twitch";

dotenv.config();

new Twitch();
new Bot(tmi);