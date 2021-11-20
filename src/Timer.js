import { React, useState } from 'react';
import { useTimer } from 'react-timer-hook';

export const MyTimer = ({ expiryTimestamp, secondsToAdd }) => {
  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  const [startTimer, setStartTimer] = useState(false);
  const [playing, setPlaying] = useState(true);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1> Swarmodoro </h1>
      <p>A perfect swarm timer</p>
      <div style={{ fontSize: '100px' }}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? 'Swarming...' : 'Next person!'}</p>

      <button type="button" class="btn btn-primary me-2"
        onClick={() => {
          const time = new Date();
          time.setSeconds(time.getSeconds() + secondsToAdd);
          restart(time, false);
          setStartTimer(false);
          setPlaying(true)
        }}>
        <i className="fas fa-stopwatch me-2"></i>Set Time</button>

      {startTimer ?
        playing ?
          <button type="button" className="btn btn-warning me-2" onClick={() => {
            pause();
            setPlaying(false);
          }}>
            <i className="fas fa-pause me-2"></i>Pause</button> :
          <button type="button" class="btn btn-info me-2" onClick={() => {
            resume();
            setPlaying(true);
          }}>
            <i className="fas fa-play me-2"></i>Resume</button>
        :
        <button type="button" className="btn btn-success me-2"
          onClick={() => {
            const time = new Date();
            time.setSeconds(time.getSeconds() + secondsToAdd);
            restart(time);
            setStartTimer(true);
          }}>
          <i className="fas fa-hourglass-start me-2"></i>Start</button>}

    </div>
  );
}

export const toSeconds = (min, sec) => {
  return ((min * 60) + sec);
}

export const shuffleArr = (original_arr) => {
  let arr = original_arr.slice();
  var j, x, index;
  for (index = arr.length - 1; index > 0; index--) {
    j = Math.floor(Math.random() * (index + 1));
    x = arr[index];
    arr[index] = arr[j];
    arr[j] = x;
  }
  return arr;
}

export const SwarmOrder = ({ names }) => {
  return (
    <div className="mt-4">
      <ol>
        {Array.from(names).map(form => <li>{form}</li>)}
      </ol>
    </div>
  );
}