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
}