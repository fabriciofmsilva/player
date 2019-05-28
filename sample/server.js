const webpush = require('web-push');
const vapidKeys = webpush.generateVAPIDKeys();

const options = {
  TTL: 24*60*60, //TTL is the time to live, the time that the notification will be queued in the push service
  vapidDetails: {
      subject: 'email@example.com',
      publicKey: '',
      privateKey: ''
  }
};

const data = {
  title: 'Update',
  body: 'Notification sent by the server'
};

webpush.sendNotification(subscription, data, options);
