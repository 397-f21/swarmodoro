// sound imported from: https://material.io/design/sound/sound-resources.html#
import alertSound from "./ringtone_minimal.wav";

const alarmAudio = new Audio(alertSound);

// reference: https://betterprogramming.pub/add-sound-to-a-react-ui-c58e33e0a96c
const playSound = () => {
  alarmAudio.load();
  alarmAudio.play();
}

export const pauseSound = () => {
  alarmAudio.pause();
}

export const askForApproval = () => {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
}

// reference: https://www.studytonight.com/post/javascript-desktopbrowser-push-notification-example
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