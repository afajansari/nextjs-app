import React from 'react'
import { Circle } from 'better-react-spinkit'

export default function loading() {
    return (
        <center style={{display: "grid", placeItems: "center", height: "100vh"}}>
            
            <div>
                <img
                    src="https://cdn.pngsumo.com/whatsapp-logo-transparent-png-stickpng-whatsapppng-1000_1000.png"
                    alt="img"
                    style={{marginBottom: 10}}
                    height={200}
                />
            <Circle color="#3cbc28"/>
            </div>
        </center>
    )
}
