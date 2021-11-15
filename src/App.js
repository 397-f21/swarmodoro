import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useState } from 'react';
import { useTimer } from 'react-timer-hook';

function MyTimer({ expiryTimestamp, secondsToAdd }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });


  return (
    <div style={{ textAlign: 'center' }}>
      <h1> Swarmodoro </h1>
      <p>A perfect swarm timer</p>
      <div style={{ fontSize: '100px' }}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? 'Swarming...' : 'Next person!'}</p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button onClick={() => {
        // Restarts to 5 minutes timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + secondsToAdd);
        restart(time)
      }}>Restart</button>
    </div>
  );
}

const App = () => {
  const time = new Date();
  const [secondsToAdd, setSecondsToAdd] = useState(0);
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
  return (
    <>
      <div>
        <MyTimer expiryTimestamp={time} secondsToAdd={secondsToAdd} />
      </div>

      <div class="md-form">
        <input type="text" id="manual-operations-input" class="form-control" placeholder="How many seconds would you like to add lol"
          onChange={ (e) => {
            setSecondsToAdd(parseInt(e.target.value))
          }}/>
        <label for="form1" class =""></label>
      </div>

    </>
  );
}

export default App;
