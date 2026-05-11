require('dotenv').config();

const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('TRACE AUTO SERVER RUNNING');
});

app.listen(3000, () => {
    console.log('SERVER START');
});