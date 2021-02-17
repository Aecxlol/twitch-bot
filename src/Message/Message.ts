import {Helper} from '../Helper/Helper';
import {Sound} from '../Sound/Sound';
import {User} from "../User/User";
import {BotCommands} from '../Bot/BotCommands';

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
                    /**
                     * @todo faire un cache pour ceux qui ont les droits de jouer un son
                     */

                    const BOT_COMMAND = BotCommands.filter((commands) => {
                        return commands.command === this.message;
                    });

                    if(Helper.isEmpty(BOT_COMMAND)){
                        new Sound(this.message, this.username, this.client, this.target, this.context);
                    }else{
                        BOT_COMMAND[0].execute(this.client, this.target, this.username);
                    }
                    break;

                case this.QUESTION_COMMAND:
                    if (!user.isBroadcaster()) {
                        this.client.say(this.target, `Commandes désactivées, je mets le bot à jour`);
                    }
                    break;

                case this.ADMIN_COMMAND:
                    if (user.isBroadcaster()) {

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