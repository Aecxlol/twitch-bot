import {UserModel} from "../Database/UserModel";
import {dbFields} from "../Interface/DbTableFieldsInterface";

export class User {

    /**
     * @private
     */
    private readonly BROADCASTER: string = 'broadcaster';

    /**
     * @private
     */
    private readonly REGULAR: string = 'regular';

    /**
     * @private
     */
    private readonly context: any;

    /**
     * @private
     */
    private readonly BADGES_KEY: string = 'badges-raw';

    /**
     * @private
     */
    private userRole: Array<string> = [];


    /**
     * @param context
     */
    constructor(context: { username: string }) {
        this.context = context;
        this.getUserRight();
    }


    public hasRightToPlaySounds = () => {
        return new Promise((resolve, reject) => {
            let userModel = new UserModel();
            let username = this.context.username;
            userModel.getUserRightToPlayASound(username).then((rows: dbFields | any) => {
                if (rows.length > 0) {
                    resolve(rows[0].has_right_to_play_sounds === 1);
                } else if (this.isBroadcaster()) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch((err) => {
                reject(err);
            });
        });
    }

    public hasRightToUseTTS = () => {
        return new Promise((resolve, reject) => {
            let userModel = new UserModel();
            let username = this.context.username;
            userModel.getUserRightToUseTTS(username).then((rows: dbFields | any) => {
                if (rows.length > 0) {
                    resolve(rows[0].has_right_to_tts === 1);
                } else if (this.isBroadcaster()) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch((err) => {
                reject(err);
            });
        });
    }

    /**
     * @public
     * @returns {boolean}
     */
    public isBroadcaster = (): boolean => {
        return this.userRole.includes(this.BROADCASTER);
    };

    /**
     * @private
     * @returns {void}
     */
    private getUserRight = (): void => {
        let role: Array<string> = [];
        if (this.context[this.BADGES_KEY] !== null) {
            // if the user has several badges
            if (this.context[this.BADGES_KEY].includes(',')) {
                // get them separetly
                role = this.context[this.BADGES_KEY].split(',');
                // get rid of the the slash and the characters after it
                for (let i = 0; i < role.length; i++) {
                    this.userRole[i] = role[i].split('/')[0];
                }
            } else {
                role = this.context[this.BADGES_KEY].split('/');
                this.userRole[0] = role[0];
            }
        } else {
            this.userRole[0] = this.REGULAR;
        }
    }
}