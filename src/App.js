import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { MyTimer, toSeconds, shuffleArr, SwarmOrder } from './Timer';

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
            label="Minutes & Seconds"
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
      <div className="form-inline justify-content-center mb-4">
        <div className="form-group col-sm-8">
          <ReactTagInput
            placeholder="Type name and press enter"
            tags={tags}
            onChange={(newTags) => setTags(newTags)}
          />
        </div>
        <button type="button" className="btn btn-danger"
          onClick={() => setShuffle(shuffleArr(tags))}>Go!</button>
      </div>
      {<SwarmOrder names={shuffle} />}
    </div>
  );
}

export default App;
