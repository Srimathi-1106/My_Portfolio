const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB Atlas
const mongoUri = 'mongodb+srv://srimathi_1106:sri123@srimathip.zfeb5xf.mongodb.net/My_Portfolio?retryWrites=true&w=majority&appName=SrimathiP';
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));

// Define a schema and model for messages
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
},{
    collection:'Messages',
});

const Message = mongoose.model('Message', messageSchema);

// // Endpoint to handle form submission
app.post('/submit-message', (req, res) => {
  const { name, email, message, date } = req.body;

  const newMessage = new Message({
    name: name,
    email: email,
    message: message,
    date: date
  });

  newMessage.save()
    .then(() => res.status(200).send('Message saved successfully!'))
    .catch(err => {
      console.error('Error saving message:', err);
      res.status(500).send('Error saving message.');
    });
});

// Example of a simple GET request endpoint
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
