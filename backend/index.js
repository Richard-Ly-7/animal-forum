const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const userPostsRouter = require('./routes/userposts');
app.use('/userposts', userPostsRouter);

const registeredUsersRouter = require('./routes/registeredusers');
app.use('/registeredusers', registeredUsersRouter);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Routes placeholder
//app.get('/', (req, res) => res.send('Server is running!'));

//Start the server

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});