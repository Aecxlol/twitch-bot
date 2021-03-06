import {Helper} from '../Helper/Helper';
import {dbConf} from "../Interface/DbConfInterface";
import {whereClause} from "../Interface/DbWhereConditionInterface";
import {setClause} from "../Interface/DbSetConditionInterface";
import {dbFields} from "../Interface/DbTableFieldsInterface";
import * as mysql from 'mysql';
import {DB_CONF} from '../Database/conf/database';

export abstract class AbstractModel {

    /**
     * @private
     */
    private dbConnector: any = null;

    /**
     * @private
     */
    private sqlStatement: string | null = null;

    /**
     * @private
     */
    private dbConf: dbConf;

    /**
     * @private
     */
    private mysql: any = null;

    protected constructor() {
        this.dbConf = DB_CONF;
        this.mysql = mysql;

        this.init();
    }

    init = () => {
        this.connect(this.dbConf.connectionLimit, this.dbConf.host, this.dbConf.user, this.dbConf.password, this.dbConf.database).then((msg) => {
            console.log(msg);
        }).catch((err) => {
            console.error(err);
        });
    }

    connect = (connectionLimit: string | undefined, host: string | undefined, user: string | undefined, password: string | undefined, database: string | undefined) => {
        return new Promise((resolve, reject) => {

            this.dbConnector = this.mysql.createPool({
                connectionLimit: connectionLimit,
                host: host,
                user: user,
                password: password,
                database: database
            });

            this.dbConnector.getConnection((err: any) => {
                console.log('1 - Connecting to the database...');
                if (err) {
                    console.error('An error has occured during the connection to the database.');
                    reject(err);
                }
                resolve('2 - Connection to the database successful.');
            });
        });
    }

    /**
     * @protected
     * @param queryType
     * @param table
     * @param whereInfosContainer
     * @param fieldsInfosContainer
     * @returns {Promise<>}
     */
    protected query = (queryType: string, table: string, whereInfosContainer: whereClause, fieldsInfosContainer: setClause): Promise<any> => {
        return new Promise((resolve, reject) => {
            switch (queryType) {
                case 'select':
                    if (Helper.isEmpty(whereInfosContainer)) {
                        this.sqlStatement = `SELECT * FROM ${table}`;
                    } else {
                        this.sqlStatement = `SELECT * FROM ${table} WHERE ${whereInfosContainer.field} = ?`;
                    }
                    this.dbConnector.query(this.sqlStatement, whereInfosContainer.fieldValue, (err: any, rows: dbFields, _fields: any) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(rows);
                    });
                    break;

                case 'update':
                    this.sqlStatement = `UPDATE ${table} SET ${fieldsInfosContainer.fieldToUpdate} = ${fieldsInfosContainer.fieldToUpdateNewValue} WHERE ${whereInfosContainer.field} = ?`;
                    this.dbConnector.query(this.sqlStatement, whereInfosContainer.fieldValue, (err: any, rows: dbFields, _fields: any) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(rows);
                    });
                    break;

                case 'insert':
                    this.sqlStatement = `INSERT INTO ${table} (${fieldsInfosContainer.fieldToUpdate}, ${fieldsInfosContainer.fieldToUpdate2}, ${fieldsInfosContainer.fieldToUpdate3}, ${fieldsInfosContainer.fieldToUpdate4}, ${fieldsInfosContainer.fieldToUpdate5}) VALUES ('${fieldsInfosContainer.fieldToUpdateNewValue}', '${fieldsInfosContainer.fieldToUpdateNewValue2}', '${fieldsInfosContainer.fieldToUpdateNewValue3}', '${fieldsInfosContainer.fieldToUpdateNewValue4}', '${fieldsInfosContainer.fieldToUpdateNewValue5}')`;
                    this.dbConnector.query(this.sqlStatement, (err: any, rows: dbFields) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(rows);
                    });
                    break;

                default:
                    reject(`Query type error -> ${queryType} does not exist`);
            }
        });
    }
}