import {options} from '../../Interface/BotOptionsInterface';

/**
 * Define configuration options
 */
export const BOT_SECRETS: options = {
    identity: {
        username: process.env.BOT_OPTIONS_USERNAME,
        password: process.env.BOT_OPTIONS_PASSWORD,
    },
    channels: [
        process.env.BOT_OPTIONS_CHANNEL
    ]
}