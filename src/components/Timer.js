import { React, useState } from 'react';
import { useTimer } from 'react-timer-hook';
import { timeEndAlert } from './Alert';

let memberIndex = 0;

export const MyTimer = ({ expiryTimestamp, secondsToAdd, members }) => {
  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => timeEnd() });

  const [startTimer, setStartTimer] = useState(false);
  const [playing, setPlaying] = useState(true);

  const timeEnd = () => {
    var checkEnd = startTimer;
    setStartTimer(false);
    setPlaying(true);
    if (checkEnd) {
      memberIndex = (memberIndex+1)%members.length;
      console.log(memberIndex);
      timeEndAlert();
    }
  }

  let secDisplay = String(seconds);
  if (secDisplay.length < 2) {
    secDisplay += "0";
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1> Swarmodoro </h1>
      <p><i>A perfect swarm timer</i></p>
      <div data-cy="timeDisplayCy" style={{ fontSize: '100px' }}>
        <span>{minutes}</span>:<span>{secDisplay}</span>
      </div>
      <h5 className="mt-2 mb-4">
        {startTimer ? playing ? members[memberIndex] + " is typing." : members[memberIndex] + "'s session is paused." : "Next typist: " + members[memberIndex]}
      </h5>

      <button type="button" className="btn btn-primary me-2"
        onClick={() => {
          const time = new Date();
          time.setSeconds(time.getSeconds() + secondsToAdd);
          restart(time, false);
          setStartTimer(false);
          setPlaying(true);
        }}>
        <i data-cy="setButtonCy" className="fas fa-stopwatch me-2"></i>Set Time</button>

      {startTimer ?
        playing ?
          <button type="button" className="btn btn-warning me-2" onClick={() => {
            pause();
            setPlaying(false);
          }}>
            <i className="fas fa-pause me-2"></i>Pause</button> :
          <button type="button" className="btn btn-info me-2" onClick={() => {
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
          <i className="fas fa-hourglass-start me-2" data-cy="startButtonCy"></i>Start</button>}

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