import {soundsList, newSoundsList, currentBotAccent, botAccents} from './GlobalVars';
import * as say from 'say';

export const BotCommands = [
    {
        name: 'soundsAvailable',
        command: '!sonsdispos',
        type: 'regularCommand',
        execute: (client: any, target: string) => {
            client.say(target, `Sons disponibles (${soundsList?.length}) : ${newSoundsList}`);
        }
    },
    {
        name: 'animeList',
        command: '!animelist',
        type: 'regularCommand',
        execute: (client: any, target: string) => {
            client.say(target, 'https://myanimelist.net/animelist/aecx (pas totalement à jour)');
        }
    },
    {
        name: 'soundName',
        command: '!nomDuSon',
        type: 'regularCommand',
        execute: (client: any, target: string, username: string) => {
            client.say(target, `@${username} 2Head`);
        }
    },
    {
        name: 'soundName',
        command: '?nomDuSon',
        type: 'questionCommand',
        execute: (client: any, target: string, username: string) => {
            client.say(target, `@${username} 2Head`);
        }
    },
    {
        name: 'followAge',
        command: '!followage',
        type: 'regularCommand',
        execute: (client: any, target: string, username: string) => {
            client.say(target, `@${username} Soon`);
        }
    },
    {
        name: '!accentsList',
        command: '!accentsList',
        type: 'regularCommand',
        execute: (client: any, target: string, username: string) => {
            let accentsList: any = [];
            let accents: any = [];

            Object.keys(botAccents).map((k) => {
                accentsList.push(k.split(' ')[1]);
            });

            Object.values(botAccents).map((v) => {
                accents.push(v);
            });

            for (let i = 0; i < accentsList.length; i++) {
                accentsList[i] += ` ${accents[i]}`
            }

            client.say(target, accentsList.join(' - '));
        }
    },
    {
        name: 'botCurrentAccent',
        command: '!botCurrentAccent',
        type: 'regularCommand',
        execute: (client: any, target: string, username: string) => {
            let accentName = currentBotAccent.split(' ')[1];
            client.say(target, `Accent actuel du bot : ${accentName} -> ${botAccents[currentBotAccent]}`);
        }
    }
]