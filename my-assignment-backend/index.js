require('dotenv').config(); // Load .env variables
const express = require('express');
const cron = require('node-cron');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from .env or default to 3000

// Access APP_ID and API_KEY from .env
const APP_ID = process.env.APP_ID;
const API_KEY = process.env.API_KEY;

// Function to send push notification to all users
const sendNotification = async (title, message) => {
  try {
    const response = await axios.post('https://app.nativenotify.com/api/notification', {
      appId: "25289",
      title: title,
      body: message,
      dateSent: new Date(),
      pushData: "",
      bigPictureURL: ""
    });
    console.log(`Notification sent: ${title}`);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

// Schedule Notifications
// 8:00 AM Notification
cron.schedule('0 8 * * *', () => {
  sendNotification('Morning Update', 'Good Morning! Have a productive day!');
});

// 12:00 Noon Notification
cron.schedule('0 12 * * *', () => {
  sendNotification('Midday Reminder', 'Take a break and recharge your energy!');
});

// 5:00 PM Notification
cron.schedule('0 17 * * *', () => {
  sendNotification('Evening Update', 'Good evening! Time to wind down.');
});

// Express Server
app.get('/', (req, res) => {
  res.send('Notification cron job server is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Scheduled notifications for 8 AM, 12 Noon, and 5 PM to all users.');
  sendNotification('Morning Update', 'Good Morning! Have a productive day!');
});
