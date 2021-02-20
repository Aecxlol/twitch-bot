import {SoundModel} from '../Database/SoundModel';
import {Helper} from '../Helper/Helper';
import {User} from "../User/User";
import {getAudioDurationInSeconds} from 'get-audio-duration';
import {isSoundOnCooldown, cooldownRemaining, setIsSoundOnCooldown, setCooldownRemaining} from './CooldownInfos';
import {soundsList, userRights} from "../Bot/GlobalVars";

export class Sound {

    /**
     * @private
     */
    private readonly sound: string;

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
    private SOUND_EXTENSION: string = '.mp3';

    /**
     * @private
     */
    private SOUND_FOLDER_PATH: string = `${process.cwd()}\\dist\\misc\\sounds\\`;

    /**
     * @private
     */
    private SOUND_PLAY = require('sound-play');

    /**
     * @private
     */
    private soundCooldown: number = 1;

    /**
     * @private
     */
    private cooldownRemaining: number | null = null;

    /**
     * @private
     */
    private soundInterval: any = null;

    constructor(sound: string, username: string, client: any, target: string, context: any) {
        this.sound = sound.split('!')[1];
        this.username = username;
        this.client = client;

        this.init(this.sound, target, context);
    }

    init = (sound: string, target: string, context: any) => {
        this.playSound(sound, target, context);
    }

    /**
     * @private
     * @param sound {string}
     * @param target {string}
     * @param context
     * @returns {void}
     */
    private playSound = (sound: string, target: string, context: any): void => {
        if (this.soundExists(sound)) {
            let user: InstanceType<typeof User> = new User(context);

            console.log(userRights);
            user.hasRightToPlaySounds().then((hasRight) => {
                if (hasRight) {
                    if (!isSoundOnCooldown || user.isBroadcaster()) {
                        const SOUND_PATH = `${this.SOUND_FOLDER_PATH}${sound}${this.SOUND_EXTENSION}`;
                        getAudioDurationInSeconds(SOUND_PATH).then((duration) => {
                            this.SOUND_PLAY.play(`${this.SOUND_FOLDER_PATH}${sound}${this.SOUND_EXTENSION}`);
                            setIsSoundOnCooldown(true);
                            this.cooldownRemaining = duration + this.soundCooldown;
                            this.cooldownRemaining = Math.ceil(this.cooldownRemaining);

                            setCooldownRemaining(this.cooldownRemaining);
                            this.soundInterval = setInterval(() => {
                                if (this.cooldownRemaining && this.cooldownRemaining > 0) {
                                    this.cooldownRemaining--;
                                    setCooldownRemaining(this.cooldownRemaining);
                                }
                            }, 1000);

                            setTimeout(() => {
                                clearInterval(this.soundInterval);
                                setIsSoundOnCooldown(false);
                            }, this.cooldownRemaining * 1000);

                            let soundModel: InstanceType<typeof SoundModel> = new SoundModel();
                            soundModel.updateSoundPlayedCount(`!${sound}`);
                            console.log(`Sound : ${sound} requested by ${Helper.uppercaseFirstLetter(this.username)}`);
                        });
                    } else {
                        this.displayErrorMessage(target);
                    }
                } else {
                    this.client.say(target, `T'as pas les droits @${this.username} KEKW`);
                }
            }).catch((err) => {
                console.log(err);
            });
        } else {
            console.error(`The sound or command: ${sound} does not exist`);
        }
    }

    /**
     * Check if the sound exists in both database and folder's sounds
     * @private
     * @param sound
     * @returns {boolean}
     */
    private soundExists = (sound: string): boolean => {
        let fs = require('fs');
        const SOUND_PATH = `${this.SOUND_FOLDER_PATH}${sound}${this.SOUND_EXTENSION}`;

        return fs.existsSync(SOUND_PATH) && soundsList?.indexOf(`!${sound}`) !== -1;
    }



    /**
     * @private
     * @param target
     * @returns {void}
     */
    private displayErrorMessage = (target: string): void => {
        this.client.say(target, `Son en cd -> ${cooldownRemaining}s restantes FeelsBadMan`);
    }
}