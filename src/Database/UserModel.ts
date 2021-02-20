import {AbstractModel} from './AbstractModel';

export class UserModel extends AbstractModel {

    /**
     * @private
     */
    private table = 'users';

    /**
     * @private
     */
    private fieldName = 'name';

    /**
     * @private
     */
    private fieldRole = 'role';

    /**
     * @private
     */
    private fieldHasRightToPlaySounds = 'has_right_to_play_sounds';

    constructor() {
        super();
    }

    getUserRightToPlayASound = (user: string) => {
        return new Promise((resolve, reject) => {
            this.query('select', this.table, {field: this.fieldName, fieldValue: user}, {}).then((rows) => {
                resolve(rows);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    preLoadUsersRight = () => {
        return new Promise((resolve, reject) => {
           this.query('select', this.table, {}, {}).then((rows) => {
              resolve(rows);
           }).catch((err) => {
               reject(err);
           });
        });
    }

    getUser = (user: string) => {
        return new Promise((resolve, reject) => {
            this.getUserRightToPlayASound(user).then((rows) => {
                resolve(rows);
            }).catch((err) => {
                reject(err)
            });
        });
    }

    setRightToUser = (user: string, perm: number) => {
        return new Promise((resolve, reject) => {
            this.query('update', this.table, {field: this.fieldName, fieldValue: user}, {fieldToUpdate: this.fieldHasRightToPlaySounds, fieldToUpdateNewValue: perm}).then(() => {
                resolve(true);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    addUser = (user: string, perm: number) => {
        return new Promise((resolve, reject) => {
            this.query('insert', this.table, {}, {fieldToUpdate: this.fieldName, fieldToUpdate2: this.fieldRole, fieldToUpdate3: this.fieldHasRightToPlaySounds, fieldToUpdateNewValue: user, fieldToUpdateNewValue2: 'none', fieldToUpdateNewValue3: perm}).then(() => {
                resolve(true);
            }).catch((err) => {
                reject(err);
            });
        });
    }
}