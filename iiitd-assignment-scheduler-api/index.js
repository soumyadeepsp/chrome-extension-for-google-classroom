const express = require('express');
let port = process.env.PORT || 3000;
const importData = require('./data.json');
const app = express();

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.get('/data', (req, res) => {
    res.send(importData);
})

app.listen(port, function(err) {
    if (err) {
        console.log('Error in running the server: '+err);
        return;
    }
    console.log('Server is running perfectly fine on port: '+port);
})