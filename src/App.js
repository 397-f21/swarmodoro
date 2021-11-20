import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useState } from 'react';
import { useTimer } from 'react-timer-hook';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

const MyTimer = ({ expiryTimestamp, secondsToAdd }) => {
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

const toSeconds = (min, sec) => {
  return ((min * 60) + sec);
}

const shuffle_arr = (original_arr) => {
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

const SwarmOrder = ({ names }) => {
  return (
    <div className="mt-4">
      <ol>
        {Array.from(names).map(form => <li>{form}</li>)}
      </ol>
    </div>
  );
}

const App = () => {
  const time = new Date();
  const [value, setValue] = useState(new Date('2021-01-01T00:15:00.000Z'));
  const [secondsToAdd, setSecondsToAdd] = useState(900); // by default 15min
  const [tags, setTags] = useState(["Member1"]);
  const [shuffle, setShuffle] = useState(["Member1"]);

  return (
    <div style={{ margin: '15px' }}>
      <div>
        <MyTimer expiryTimestamp={time} secondsToAdd={secondsToAdd} />
      </div>

      <div style={{ textAlign: 'center' }} className="mt-4 mb-4">
        {/* reference: https://mui.com/components/time-picker/ */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            ampm={false}
            ampmInClock={false}
            views={['minutes', 'seconds']}
            inputFormat="mm:ss"
            mask="__:__"
            label="Minutes and seconds"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
              var min = newValue.getMinutes();
              var sec = newValue.getSeconds();
              setSecondsToAdd(toSeconds(min, sec));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>

      {/* reference: https://betterstack.dev/projects/react-tag-input/ */}
      <div class="form-inline justify-content-center mb-4">
        <div class="form-group col-sm-8">
          <ReactTagInput
            placeholder="Type name and press enter"
            tags={tags}
            onChange={(newTags) => setTags(newTags)}
          />
        </div>
        <button type="button" class="btn btn-danger"
          onClick={() => setShuffle(shuffle_arr(tags))}>Go!</button>
      </div>
      {<SwarmOrder names={shuffle} />}
    </div>
  );
}

export default App;
