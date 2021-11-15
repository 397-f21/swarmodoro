import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useState } from 'react';
import { useTimer } from 'react-timer-hook';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';

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
        {/* <span>{days}</span>:<span>{hours}</span>: */}
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? 'Swarming...' : 'Next person!'}</p>
      <button type="button" className="btn btn-success me-2"
        onClick={() => {
          const time = new Date();
          time.setSeconds(time.getSeconds() + secondsToAdd);
          restart(time)
        }}>Start</button>
      <button type="button" className="btn btn-warning me-2" onClick={pause}>Pause</button>
      <button type="button" class="btn btn-info me-2" onClick={resume}>Resume</button>
      <button type="button" class="btn btn-primary"
        onClick={() => {
          const time = new Date();
          time.setSeconds(time.getSeconds() + secondsToAdd);
          restart(time)
        }}>Restart</button>
    </div>
  );
}

const toSeconds = (min, sec) => {
  return ((min * 60) + sec);
}

const App = () => {
  const time = new Date();
  const [value, setValue] = useState(new Date('2021-01-01T00:15:00.000Z'));
  const [secondsToAdd, setSecondsToAdd] = useState(900); // by default 15min

  return (
    <>
      <div>
        <MyTimer expiryTimestamp={time} secondsToAdd={secondsToAdd} />
      </div>

      <div style={{ textAlign: 'center' }} className="mt-4">
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
    </>
  );
}

export default App;
