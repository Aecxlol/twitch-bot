import {AbstractApi} from "./AbstractApi";
import {setFollowersListAsGlobalVar} from "../Bot/GlobalVars";
import {twitchApiResponse} from '../Interface/ApiTwitchResponse';

export class Twitch extends AbstractApi {

    private hostname: string = 'api.twitch.tv';

    constructor() {
        super();

        (async () => {
            try {
                const response: twitchApiResponse = await this.request(this.hostname, `/helix/users/follows?to_id=32397736&first=100`);
                console.log('Response received');
                setFollowersListAsGlobalVar(JSON.parse(response));
            } catch (e) {
                console.error(`An error has occured during the request's fetching -> ${e}`)
            }
        })()
    }
}