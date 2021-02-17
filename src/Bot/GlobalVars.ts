let soundsList: Array<string> | null = null;
let newSoundsList: string;

function setSoundsListAsGlobalVar(v: Array<string>) {
    soundsList = v;
    newSoundsList = soundsList.join('  -  ');
}

export {soundsList, setSoundsListAsGlobalVar, newSoundsList}