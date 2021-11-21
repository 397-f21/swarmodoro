import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { MyTimer, toSeconds, shuffleArr, SwarmOrder } from './components/Timer';
import Modal from "react-bootstrap/Modal";
import { askForApproval } from './components/Alert';
import { Container, Button, Link, lightColors, darkColors } from 'react-floating-action-button'

const App = () => {
  const time = new Date();
  const [value, setValue] = useState(new Date('2021-01-01T00:15:00.000Z'));
  const [secondsToAdd, setSecondsToAdd] = useState(900); // by default 15min
  const [tags, setTags] = useState(["Member1"]);
  const [shuffle, setShuffle] = useState(["Member1"]);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  return (
    <div style={{ margin: '15px' }}>
      {askForApproval()}
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

      {/* reference: https://www.npmjs.com/package/react-floating-action-button */}
      <Container>
        {/* <Link href="#"
          tooltip="Create note link"
          icon="far fa-sticky-note" /> */}
        <Button
          tooltip="Alert"
          icon="fas fa-bell"
          className="fab-item btn btn-lg text-white"
          styles={{ backgroundColor: darkColors.yellow, color: lightColors.white }}
          onClick={handleShow1}
        />
        <Button
          tooltip="Settings"
          icon="fas fa-cog fa-2x"
          styles={{ backgroundColor: darkColors.grey, color: lightColors.white }}
        // onClick={() => alert('FAB Rocks!')} 
        />
        <Modal show={show1} onHide={handleClose1}>
          <Modal.Header>
            <Modal.Title>Permission Required for Alert</Modal.Title>
          </Modal.Header>
          <Modal.Body>In order to enable the notification when time's up,
            make sure to allow "Notification" in your browser settings.</Modal.Body>
          <Modal.Footer>
            <button type="button" class="btn btn-secondary" onClick={handleClose1}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default App;
