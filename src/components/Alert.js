// reference: https://www.studytonight.com/post/javascript-desktopbrowser-push-notification-example
export const askForApproval = () => {
  Notification.requestPermission();
}

export const timeEndAlert = () => {
  if (Notification.permission === "granted") {
    createNotification("Swarmodoro", "Time's Up!");
  }
  else {
    Notification.requestPermission(permission => {
      if (permission === "granted") {
        createNotification("Swarmodoro", "Time's Up!");
      }
    });
  }
}

const createNotification = (title, text) => {
  const noti = new Notification(title, { body: text });
}