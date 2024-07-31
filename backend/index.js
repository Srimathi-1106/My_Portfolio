const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const mongoUri = 'mongodb+srv://srimathi_1106:sri123@srimathip.zfeb5xf.mongodb.net/My_Portfolio?retryWrites=true&w=majority&appName=SrimathiP';
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
},{
    collection:'Messages',
    versionKey: false,
});

const Message = mongoose.model('Message', messageSchema);

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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
