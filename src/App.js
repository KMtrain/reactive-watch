import { useState } from 'react';
import Watch from './components/Watch';

import { interval } from "rxjs";
import { map } from "rxjs/operators";

import "./App.css";




const timeStep = 1000;

export default function App(){

  const [timer, setTimer] = useState(0);
  const [diff, setDiff] = useState(0);

  const [subscription, setSubscription] = useState("");
  const [prevent, setPrevent] = useState(true);

  const onStartHandler = () => {
    if (!subscription) {
      const timerSubscription = interval(timeStep)
        .pipe(map((v) => v + 1))
        .subscribe((v) => {
          setTimer(v + diff);
        });
      setSubscription(timerSubscription);
    } else {
      subscription.unsubscribe();
      setTimer(0);
      setDiff(0);
      setSubscription("");
    }
  };

  const onWaitHandler = (event) => {
    if (prevent) {
      setPrevent(false);
      const timerInstance = setTimeout(function () {
        setPrevent(true);
        clearTimeout(timerInstance);
      }, 300);
    } else {
      if (subscription) {
        subscription.unsubscribe();
      }

      setDiff(timer);
      setSubscription("");
    }
  };

  const onResetHandler = () => {
    if (subscription) {
      subscription.unsubscribe();
    }

    const timerSubscription = interval(timeStep).subscribe((v) => {
      setTimer(v);
    });
    setSubscription(timerSubscription);
  };


  return (
    <div className="App">
      <Watch timeCurrentCount = {timer ? timer : diff} />

      <div className="btn-container">
        <button className="btn-containerStart" onClick={onStartHandler}>Start/Stop</button>
        <button className="btn-containerWait" onClick={onWaitHandler}>Wait</button>
        <button className="btn-containerReset" onClick={onResetHandler}>Reset</button>
      </div>
    
    </div>
    
  )
  
  
}

