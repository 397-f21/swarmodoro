// sound imported from: https://material.io/design/sound/sound-resources.html#
import alertSound from "./ringtone_minimal.wav";

// reference: https://betterprogramming.pub/add-sound-to-a-react-ui-c58e33e0a96c
const playSound = () => {
  const alarmAudio = new Audio(alertSound);
  alarmAudio.play();
}

// reference: https://www.studytonight.com/post/javascript-desktopbrowser-push-notification-example
export const askForApproval = () => {
  Notification.requestPermission();
}

export const timeEndAlert = () => {
  if (Notification.permission === "granted") {
    playSound();
    createNotification("Swarmodoro", "Time's Up!");
  }
  else {
    Notification.requestPermission(permission => {
      if (permission === "granted") {
        playSound();
        createNotification("Swarmodoro", "Time's Up!");
      }
    });
  }
}

const createNotification = (title, text) => {
  const noti = new Notification(title, { body: text });
}