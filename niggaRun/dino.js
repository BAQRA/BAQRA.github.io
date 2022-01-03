import { incrementCustomProperty, setCustomProperty, getCustomProperty } from "./updateCostumProperty.js"

const dinoElem = document.querySelector("[data-dino]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.0014
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let dinoFrame
let currentFrameTime
let yValocity
export function setupDino() {
    isJumping = false
    dinoFrame = 0
    currentFrameTime = 0
    yValocity = 0
    setCustomProperty(dinoElem, "--bottom", 0)
    document.removeEventListener ("keydown", onJump)
    document.addEventListener ("keydown", onJump)
    document.removeEventListener ("click", onJump)
    document.addEventListener ("click", onJump)
}

export function updateDino(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
}

export function getDinoRect ( ) {
        return dinoElem.getBoundingClientRect()
}

export function setDinoLose() {
    dinoElem.src = "img/guy-lose.png"
}

function handleRun(delta, speedScale) {
    if (isJumping) {
        dinoElem.src = `img/guy-stationary.png`
        return
    }
    if (currentFrameTime >= FRAME_TIME) {
        dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
        dinoElem.src = `img/guy-run-${dinoFrame}.png`
        currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale
}

function handleJump(delta) {
    if (!isJumping) return
    
    incrementCustomProperty(dinoElem, "--bottom", yValocity * delta)
    if (getCustomProperty(dinoElem, "--bottom") <= 0) {
        setCustomProperty(dinoElem, "--bottom", 0)
        isJumping = false
    }

    yValocity -= GRAVITY * delta
}

function onJump(e) {
    if ( isJumping) {
        return
    }
    yValocity = JUMP_SPEED
    isJumping = true
}