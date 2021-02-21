import {UserModel} from "../Database/UserModel";
import {dbFields} from "../Interface/DbTableFieldsInterface";
import {setSoundsAreEnabled} from "../Bot/GlobalVars";

export class Admin {

    /**
     * @private
     */
    private readonly action: string;

    /**
     * @private
     */
    private readonly arg3: string;

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
    private SOUNDS: string = 'sounds';

    /**
     * @private
     */
    private grant: number = 1;

    /**
     * @private
     */
    private remove: number = 0;

    constructor(arg2: string, arg3: string, client: any, target: string) {
        this.action = arg2;
        this.arg3 = arg3;
        this.client = client;
        this.target = target;

        this.process();
    }

    private process = () => {

        switch (this.action) {
            case this.GRANT_PERM:
                this.setPermission(this.grant);
                break;

            case this.REMOVE_PERM:
                this.setPermission(this.remove);
                break;

            case this.SOUNDS:
                this.toggleSounds();
                break;

            default:
                console.error('Unknown admin command');
        }
    }

    private setPermission = (perm: number) => {

        let userModel: InstanceType<typeof UserModel> = new UserModel();
        let stringCustomChat: string = perm === this.grant ? '' : 'plus';
        let emoteStringCustomChat: string = perm === this.grant ? 'EZ Clap' : 'FeelsBadMan Clap';
        let stringCustomConsole: string = perm === this.grant ? 'granted' : 'removed';

        userModel.getUser(this.arg3).then((rows: dbFields | any) => {
            if (rows.length > 0) {
                userModel.setRightToUser(this.arg3, perm).then((done) => {
                    if (done) {
                        this.client.say(this.target, `T'as ${stringCustomChat} la permission de jouer des sons @${this.arg3} ${emoteStringCustomChat}`);
                        console.log(`Permission ${stringCustomConsole} to -> ${this.arg3}`);
                    }
                }).catch((err) => {
                    console.error(err)
                });
            } else {
                userModel.addUser(this.arg3, perm).then((done) => {
                    if (done) {
                        this.client.say(this.target, `T'as ${stringCustomChat} la permission de jouer des sons @${this.arg3} ${emoteStringCustomChat}`);
                        console.log(`Permission ${stringCustomConsole} to -> ${this.arg3}`);
                    }
                }).catch((err) => {
                    console.error(err)
                });
            }
        })
    }

    private toggleSounds = () => {
        if (this.arg3 === 'enable') {
            setSoundsAreEnabled(true);
            this.client.say(this.target, 'Sons activés');
        } else if (this.arg3 === 'disable') {
            setSoundsAreEnabled(false);
            this.client.say(this.target, 'Sons désactivés');
        } else {
            return;
        }
    }
}