import React from 'react'
import Map from '../Map/'
import Player from '../Player/'

const World = (props) => {
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