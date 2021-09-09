import React from "react"
import { useState, useEffect } from "react"

import "./WatchStyle.css"

const Watch = (props) => {

    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {

        let hours = Math.floor(props.timeCurrentCount / 3600);
        setHours(() => (hours.toString().length === 1 ? "0" : "") + hours);
        
        let minutes = Math.floor((props.timeCurrentCount % 3600) / 60);
        setMinutes(() => (minutes.toString().length ===1 ? "0" : "") + minutes);

        let seconds = props.timeCurrentCount % 60;
        setSeconds(() => (seconds.toString().length ===1 ? "0" : "") + seconds);

    }, [props.timeCurrentCount]);


    return (
        <div>
            <h1 className="watchDialPanel">{hours}:{minutes}:{seconds}</h1>
        </div>
    )
}

export default Watch;