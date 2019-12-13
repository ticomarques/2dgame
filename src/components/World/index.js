import React from 'react'
import Map from '../Map/'
import Player from '../Player/'

import { tiles } from '../../data/maps/1/'
import store from '../../config/store'

const World = (props) => {
    store.dispatch({
        type: 'ADD_TILES',
        payload: {
            tiles
        }
    })
    return(
        <div style={{
            position: 'relative',
            backgroundColor: 'green',
            width: '800px',
            height: '400px',
            margin: '20px auto'
        }}>
            <Map />
            <Player />
        </div>
    )
}

export default World