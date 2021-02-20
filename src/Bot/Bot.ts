import {SoundModel} from '../Database/SoundModel';
import {Message} from '../Message/Message';
import {options} from "../Interface/BotOptionsInterface";
import {dbFields} from "../Interface/DbTableFieldsInterface";
import {setSoundsListAsGlobalVar, setSoundsCounterAsGlobalVar} from './GlobalVars';

export class Bot {

    /**
     * @private
     */
    private BOT_MESSAGE: string = 'Commandes disponibles : !sonsdispos (sons disponibles) - !nomDuSon (jouer un son) - ?nomDuSon (combien de fois un son a été joué) - !animelist';

    /**
     * @private
     */
    private readonly botSecrets: options;

    /**
     * @private
     */
    private readonly client: any;

    /**
     * @public
     */
    public preLoadedSounds: Array<string> = [];

    /**
     * @public
     */
    public soundsCounter: Array<object> = [];

    /**
     * @public
     */
    public preLoadedRights: Array<string> = [];

    /**
     * @param tmi
     * @param botSecrets
     */
    constructor(tmi: any, botSecrets: options) {
        this.botSecrets = botSecrets;
        // Create a client with our options
        this.client = new tmi.client(this.botSecrets);

        this.init();
    }

    /**
     * @private
     * @returns {void}
     */
    private init = (): void => {
        this.registerEventHandlers();
        this.connectClientToTwitch();
    };

    /**
     * @private
     * @returns {void}
     */
    private registerEventHandlers = (): void => {
        this.client.on('message', this.onMessageHandler);
        this.client.on('connected', this.onConnectedHandler);
    }

    /**
     * @private
     * @returns {void}
     */
    private connectClientToTwitch = (): void => {
        this.client.connect().then(() => {
            let soundModel: InstanceType<typeof SoundModel> = new SoundModel();

            soundModel.preLoadSoundTable().then((rows: dbFields | any) => {
                if (rows.length > 0) {
                    for (let i = 0; i < rows.length; i++) {
                        this.preLoadedSounds[i] = rows[i].command;
                        this.soundsCounter[i] = {name: `?${rows[i].name}`, playedCount: rows[i].played_count};
                        setSoundsListAsGlobalVar(this.preLoadedSounds);
                        setSoundsCounterAsGlobalVar(this.soundsCounter);
                    }
                    console.log('3 - All the sounds have been preloaded !');
                } else {
                    console.log('> Error during the sounds preloading ! <');
                }
            }).catch((e) => {
                console.log('> Error during the sounds preloading ! <' + e);
            });

            this.sendBotMessageInChat(this.botSecrets.channels[0], this.BOT_MESSAGE, 25);
        }).catch((err: any) => {
            console.log(err);
        });
    }

    /**
     * @private
     * @param{string} channel
     * @param{string} message
     * @param{number} delayBetweenMessageInMinutes
     * @returns {void}
     */
    private sendBotMessageInChat = (channel: string, message: string, delayBetweenMessageInMinutes: number): void => {
        setTimeout(() => {
            setInterval(() => {
                this.client.say(channel, message);
            }, delayBetweenMessageInMinutes * 60 * 1000);
        }, 1000)
    }

    /**
     * Called every time a message comes in
     * @private
     * @param {string} target
     * @param {username: string} context
     * @param {string} message
     * @param {boolean} self
     */
    private onMessageHandler = (target: string, context: { username: string }, message: string, self: boolean) => {
        // Ignore messages from the bot
        if (self) {
            return;
        }

        new Message(target, context, message.trim(), this.client);
    }

    /**
     * Called every time the bot connects to Twitch chat
     * @private
     * @param {string} addr
     * @param {number} port
     * @returns {void}
     */
    private onConnectedHandler = (addr: string, port: number): void => {
        console.log(`* Connected to ${addr}:${port}`);
    }
}