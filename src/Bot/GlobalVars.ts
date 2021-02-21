// SOUNDS RELATED
let soundsList: Array<string> | null = null;
let newSoundsList: string;
let soundsCounter: Array<object> | null = [];
let soundsAreEnabled: boolean = true;

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

export {soundsList, setSoundsListAsGlobalVar, newSoundsList, setUserRightsAsGlobalVar, userRights, setSoundsCounterAsGlobalVar, soundsCounter, setSoundsAreEnabled, soundsAreEnabled}
