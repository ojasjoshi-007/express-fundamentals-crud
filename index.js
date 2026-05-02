const express = require('express');
const { v4: uuid } = require('uuid');
const app = express();
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

const comments = [
    {
        "id": uuid(),
        "username": "CodeMaster99",
        "comment": "This tutorial was super helpful, thanks for sharing!"
    },
    {
        "id": uuid(),
        "username": "DesignDaily",
        "comment": "I love the color palette used in this project."
    },
    {
        "id": uuid(),
        "username": "BugHunter_X",
        "comment": "Found a small typo in the documentation on line 42."
    },
    {
        "id": uuid(),
        "username": "CoffeeAndCloud",
        "comment": "Does this implementation support dark mode out of the box?"
    },
    {
        "id": uuid(),
        "username": "PixelPerfect",
        "comment": "The animations are smooth, but the mobile responsiveness needs work."
    }
]

app.get('/', (req, res) => {
    res.send('<h1> RESTful CRUD Demo </h1>')
})
app.get('/comments', (req, res) => {
    res.render('home.ejs', { comments });
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    res.redirect('/comments');
})

app.get('/comments/new', (req, res) => {
    res.render('new.ejs');
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('show.ejs', { comment });

})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('edit.ejs', { comment });

})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const foundComment = comments.find(c => c.id === id);
    const newComment = req.body.comment;
    foundComment.comment = newComment;
    res.redirect('/comments');
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    const foundComment = comments.find(c => c.id === id);
    const index = comments.indexOf(foundComment);
    comments.splice(index, 1);
    res.redirect('/comments');
})



app.listen(3000, () => {
    console.log("On port 3000");
})