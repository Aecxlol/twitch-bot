import {twitchApiResponse} from '../Interface/ApiTwitchResponse';
import * as say from 'say';

// SOUNDS RELATED
let soundsList: Array<string> | null = null;
let newSoundsList: string;
let soundsCounter: Array<object> | null = [];
let soundsAreEnabled: boolean = true;
let botAccents: any = {};
let onCD: boolean | null = false;

let currentBotAccent = 'Microsoft Hortense Desktop';

function setSoundsListAsGlobalVar(v: Array<string>) {
    soundsList = v;
    newSoundsList = soundsList.join('  -  ');
}

function setSoundsCounterAsGlobalVar(v: Array<object>) {
    soundsCounter = v;
}

function setSoundsAreEnabled(v: boolean){
    soundsAreEnabled = v;
}

// RIGHTS RELATED
let userRights: Array<string> | null = null;

function setUserRightsAsGlobalVar(v: Array<string>) {
    userRights = v;
}

// USERS RELATED
let followers: twitchApiResponse;

function setFollowersListAsGlobalVar(v: twitchApiResponse) {
    followers = v
}

// ACCENT RELATED
let accents = ['(français - F)', '(anglais US - H)', '(anglais US - F)', '(espagnol - F)', '(allemand - F)', '(italien - F)', '(japonais - F)', '(chinois - F)'];

function loadBotAccents(){
    say.getInstalledVoices((err, voices) => {
        for (let i = 0; i < voices.length; i++) {
            botAccents[voices[i]] = accents[i];
        }
    });
}

function setCurrentBotAccent(v: string){
    currentBotAccent = v;
}

function setCDState(v: boolean){
    onCD = v;
}

export {
    soundsList,
    setSoundsListAsGlobalVar,
    newSoundsList,
    setUserRightsAsGlobalVar,
    userRights,
    setSoundsCounterAsGlobalVar,
    soundsCounter,
    setSoundsAreEnabled,
    soundsAreEnabled,
    followers,
    setFollowersListAsGlobalVar,
    currentBotAccent,
    setCurrentBotAccent,
    loadBotAccents,
    botAccents,
    setCDState,
    onCD
}

