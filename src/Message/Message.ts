import {Helper} from '../Helper/Helper';
import {Sound} from '../Sound/Sound';
import {User} from "../User/User";
import {SoundModel} from "../Database/SoundModel";
import {BotCommands} from '../Bot/BotCommands';
import {dbFields} from "../Interface/DbTableFieldsInterface";
import {soundsList} from "../Bot/GlobalVars";
import {Admin} from "../Admin/Admin";

export class Message {

    /**
     * Name of the channel
     * @private
     */
    private readonly target: string;

    /**
     * @private
     */
    private readonly context: { username: string };

    /**
     * @private
     */
    private readonly message: string;

    /**
     * @private
     */
    private readonly client: any;

    /**
     * @private
     */
    private readonly username: string;

    /**
     * @private
     */
    private messageType: undefined | string = undefined;

    /**
     * @private
     */
    private readonly ADMIN_COMMAND: string = 'adminCommand';

    /**
     * @private
     */
    private readonly REGULAR_COMMAND: string = 'regularCommand';

    /**
     * @private
     */
    private readonly QUESTION_COMMAND: string = 'questionCommand';

    /**
     * @private
     */
    private readonly REGULAR_MESSAGE: string = 'regularMessage';

    /**
     * @param target
     * @param context
     * @param message
     * @param client
     */
    constructor(target: string, context: { username: string }, message: string, client: any) {
        this.target = target;
        this.context = context;
        this.message = message;
        this.client = client;
        this.username = this.context.username;

        this.process();
    }

    /**
     * @private
     * @returns {void}
     */
    private process = (): void => {

        let user: InstanceType<typeof User> = new User(this.context);

        this.parse(this.message).then((msgType) => {
            switch (msgType) {
                case this.REGULAR_COMMAND:
                    const BOT_REGULAR_COMMAND = BotCommands.filter((commands) => {
                        return commands.command === this.message;
                    });

                    if (Helper.isEmpty(BOT_REGULAR_COMMAND)) {
                        new Sound(this.message, this.username, this.client, this.target, this.context);
                    } else {
                        BOT_REGULAR_COMMAND[0].execute(this.client, this.target, this.username);
                    }
                    break;

                case this.QUESTION_COMMAND:
                    const BOT_QUESTION_COMMAND = BotCommands.filter((commands) => {
                        return commands.command === this.message;
                    });

                    if (Helper.isEmpty(BOT_QUESTION_COMMAND)) {
                        if (soundsList?.indexOf(this.message.replace('?', '!')) !== -1) {
                            let soundModel: InstanceType<typeof SoundModel> = new SoundModel();
                            soundModel.getSoundsPlayCount().then((rows: dbFields | any) => {
                                for (let i = 0; i < rows.length; i++) {
                                    if (this.message === `?${rows[i].name}`) {
                                        this.client.say(this.target, `!${rows[i].name} a été joué ${rows[i].played_count} fois`);
                                    }
                                }
                            });
                        }
                    } else {
                        BOT_QUESTION_COMMAND[0].execute(this.client, this.target, this.username);
                    }
                    break;

                case this.ADMIN_COMMAND:
                    if (user.isBroadcaster()) {
                        new Admin(this.message.split(' ')[1], this.message.split(' ')[2], this.client, this.target);
                    } else {
                        this.client.say(this.target, 'Commande réservée aux admins SeriousSloth');
                    }
                    break;

                case this.REGULAR_MESSAGE:

                    break;
            }
        });
    }

    /**
     * Get the message's type according to what has been typed in the chat
     * @private
     * @param message
     * @returns {Promise<string>}
     */
    private parse = (message: string): Promise<string> => {
        return new Promise((resolve) => {
            if (message.match(/^![a-zA-Z0-9]+$/)) {
                this.messageType = this.REGULAR_COMMAND;
            } else if (message.match(/^\?[a-zA-Z0-9]+$/)) {
                this.messageType = this.QUESTION_COMMAND;
            } else if (message.match(/^!(\badmin)\s[a-zA-z]+\s.+$/)) {
                this.messageType = this.ADMIN_COMMAND;
            } else {
                this.messageType = this.REGULAR_MESSAGE;
            }
            resolve(this.messageType);
        });
    }
}