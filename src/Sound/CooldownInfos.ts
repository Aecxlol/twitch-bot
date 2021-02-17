let isSoundOnCooldown: boolean = false;
let cooldownRemaining: number | null = null;

function setIsSoundOnCooldown(v: boolean) {
    isSoundOnCooldown = v;
}

function setCooldownRemaining(v: number){
    cooldownRemaining = v;
}

export {isSoundOnCooldown , cooldownRemaining, setIsSoundOnCooldown, setCooldownRemaining}