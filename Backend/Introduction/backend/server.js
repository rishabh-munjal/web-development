import express from 'express';

const app = express();

// app.get('/' , (req , res) => {

//     res.send("Server is ready");

// });

app.get('/api/jokes' , (req , res) => {
    const jokes = [
        {
            id: 1,
            joke: "Why did the scarecrow win an award? Because he was outstanding in his field."
        },
        {
            id: 2,
            joke: "Why don't scientists trust atoms? Because they make up everything."
        },
        {
            id: 3,
            joke: "What do you call a fish wearing a crown? A king fish."
        },
        {
            id: 4,
            joke: "Why did the tomato turn red? Because it saw the salad dressing."
        },
        {
            id: 5,
            joke: "What do you call a pile of cats? A meowtain."
        }
    ];

    res.send(jokes);
});

const port  = process.env.PORT || 3000;

app.listen(port , () => {
    console.log(`Serve at http://localhost:${port}`);
});