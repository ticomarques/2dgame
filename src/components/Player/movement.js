import store from '../../config/store'
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from '../../config/constants'

const getNewPosition = (oldPos, direction) => {
    switch (direction){
        case 'WEST':
            return [ oldPos[0] - SPRITE_SIZE, oldPos[1] ]
            
        case 'NORTH':
            return [ oldPos[0], oldPos[1] - SPRITE_SIZE ]
            
        case 'EAST':
            return [ oldPos[0] + SPRITE_SIZE, oldPos[1] ]
            
        case 'SOUTH':
            return [ oldPos[0], oldPos[1] + SPRITE_SIZE ]
        default:
            return false
    }
}

const getSpriteLocation = (walkIndex, direction) => {
    switch(direction){
        case 'SOUTH':
            return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*0}px`
        case 'EAST':
            return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*1}px`
        case 'WEST':
            return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*2}px`
        case 'NORTH':
            return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*3}px`
        default:
            return false
    }
}

const getWalkIndex = () => {
    const walkIndex = store.getState().player.walkIndex
    return walkIndex >= 7 ? 0 : walkIndex + 1
}

const observeBoundaries = (oldPos, newPos) => {
    return (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH - SPRITE_SIZE) && 
           (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE)
}
const observeImpassable = (oldPos, newPos) => {
    const tiles = store.getState().map.tiles
    const y = newPos[1] / SPRITE_SIZE
    const x = newPos[0] / SPRITE_SIZE
    const nextTile = tiles[y][x]
    return nextTile < 5
}

const dispatchMove = (direction, newPos) => {
    const walkIndex = getWalkIndex()
    store.dispatch({
        type: 'MOVE_PLAYER',
        payload: {
            position: newPos,
            direction,
            walkIndex,
            spriteLocation: getSpriteLocation(walkIndex, direction),
        }
    })
}

const attemptMove = (direction) => {
    const oldPos = store.getState().player.position
    const newPos = getNewPosition(oldPos, direction)

    if (observeBoundaries(oldPos, newPos) && observeImpassable(oldPos, newPos)){
        dispatchMove(direction, newPos)
    }
}

const handleMovement = (player) => {

    const handleKeyDown = (e) => {
        e.preventDefault()

        switch(e.keyCode){
            case 37:
                return attemptMove('WEST')

            case 38:
                return attemptMove('NORTH')
            
            case 39:
                return attemptMove('EAST')

            case 40:
                return attemptMove('SOUTH')

            default:
                console.log(e.keyCode)
        }
    }

    window.addEventListener('keydown', (e) => {
        handleKeyDown(e)
    })

    return player
}

export default handleMovement