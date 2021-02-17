import {soundsList, newSoundsList} from './GlobalVars';

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
    }
]