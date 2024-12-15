const express = require('express');
const port = 3000;
const app = express();

let numberOfRequestsForUser = {};

setInterval(() => {
    numberOfRequestsForUser = {};
}, 1000);

app.use((req, res, next) => {
    const userId = req.headers['user-id'];

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required in headers.' });
    }

    if (!numberOfRequestsForUser[userId]) {
        numberOfRequestsForUser[userId] = 0;
    }

    numberOfRequestsForUser[userId] += 1;

    if (numberOfRequestsForUser[userId] > 5) {
        return res.status(404).send('Rate limit exceeded');
    }

    next();
});

app.get('/user', function (req, res) {
    res.status(200).json({ name: 'john' });
});

app.post('/user', function (req, res) {
    res.status(200).json({ msg: 'created dummy user' });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
