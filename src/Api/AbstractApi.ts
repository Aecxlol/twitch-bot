// import * as https from 'https';
import * as request from 'request';

export abstract class AbstractApi {

    protected constructor() {
    }

    protected request = (hostname: string, path: string): Promise<any> => {
        return new Promise((resolve, reject) => {

            let options = {
                url: `https://${hostname}${path}`,
                headers: {
                    'client-id': process.env.API_CLIENT_ID,
                    'Authorization': `Bearer ${process.env.API_TOKEN}`
                }
            }

            console.log('Connecting to the Twitch\'s API...');

            request(options, (err, response, body) => {
                if (err) {
                    reject(err);
                }
                console.log(response.statusCode === 200 ? `Connection to the Twitch\'s API successful(STATUS : ${response.statusCode}). Waiting for the response...` : `Error (STATUS : ${response.statusCode})`);

                resolve(body);
            })
        });
    }
}