import {AbstractModel} from './AbstractModel';
import {dbFields} from "../Interface/DbTableFieldsInterface";

export class SoundModel extends AbstractModel{

    /**
     * @private
     */
    private table: string = 'sounds';

    /**
     * @private
     */
    private fieldCommand: string = 'command';

    /**
     * @private
     */
    private fieldPlayedCount: string = 'played_count';

    constructor() {
        super();
    }

    /**
     * @public
     * @returns {Promise<Array<string> | string>}
     */
    public preLoadSounds = (): Promise<any> => {
        return new Promise((resolve, reject) => {
           this.query('select', this.table, {}, {}).then((rows: dbFields) => {
                   resolve(rows);
           }).catch((err: object) => {
               reject(err)
           });
        });
    }

    /**
     * @public
     * @param sound
     * @returns {void}
     */
    public updateSoundPlayedCount = (sound: string): void => {
        this.query('update', this.table, {field: this.fieldCommand, fieldValue: sound}, {fieldToUpdate: this.fieldPlayedCount, fieldToUpdateNewValue: `${this.fieldPlayedCount} + 1`}).then((_rows) => {
            console.log(`${sound}'s count updated`);
        }).catch((err: object) => {
            console.error(err)
        });
    }
}