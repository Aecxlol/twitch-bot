import {UserModel} from "../Database/UserModel";
import {dbFields} from "../Interface/DbTableFieldsInterface";

export class Admin {

    /**
     * @private
     */
    private readonly arg2: string;

    /**
     * @private
     */
    private readonly username: string;

    /**
     * @private
     */
    private client: any;

    /**
     * @private
     */
    private readonly target: string;

    /**
     * @private
     */
    private GRANT_PERM: string = 'grantPerm';

    /**
     * @private
     */
    private REMOVE_PERM: string = 'removePerm';

    /**
     * @private
     */
    private grant: number = 1;

    /**
     * @private
     */
    private remove: number = 0;

    constructor(arg2: string, arg3: string, client: any, target: string) {
        this.arg2 = arg2;
        this.username = arg3;
        this.client = client;
        this.target = target;

        this.process();
    }

    process = () => {

        switch (this.arg2) {
            case this.GRANT_PERM:
                this.setPermission(this.grant);
                break;

            case this.REMOVE_PERM:
                this.setPermission(this.remove);
                break;

            default:
                console.error('Unknown admin command');
        }
    }

    setPermission = (perm: number) => {

        let userModel: InstanceType<typeof UserModel> = new UserModel();
        let stringCustomChat: string = perm === this.grant ? '' : 'plus';
        let emoteStringCustomChat: string = perm === this.grant ? 'EZ Clap' : 'FeelsBadMan Clap';
        let stringCustomConsole: string = perm === this.grant ? 'granted' : 'removed';

        userModel.getUser(this.username).then((rows: dbFields | any) => {
            if (rows.length > 0) {
                userModel.setRightToUser(this.username, perm).then((done) => {
                    if (done) {
                        this.client.say(this.target, `T'as ${stringCustomChat} la permission de jouer des sons @${this.username} ${emoteStringCustomChat}`);
                        console.log(`Permission ${stringCustomConsole} to -> ${this.username}`);
                    }
                }).catch((err) => {
                    console.error(err)
                });
            } else {
                userModel.addUser(this.username, perm).then((done) => {
                    if (done) {
                        this.client.say(this.target, `T'as ${stringCustomChat} la permission de jouer des sons @${this.username} ${emoteStringCustomChat}`);
                        console.log(`Permission ${stringCustomConsole} to -> ${this.username}`);
                    }
                }).catch((err) => {
                    console.error(err)
                });
            }
        })
    }
}