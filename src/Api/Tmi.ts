import {AbstractApi} from "./AbstractApi";

export class Tmi extends AbstractApi {

    private hostname: string = 'tmi.twitch.tv';

    constructor() {
        super();

        (async () => {
            try {
                const response: string = await this.request(this.hostname, '/group/user/aecxlol/chatters');
                console.log(`Response received -> ${response}`);
            } catch (e) {
                console.error(`An error has occured during the request's fetching -> ${e}`)
            }
        })()
    }
}