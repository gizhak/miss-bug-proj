import express from 'express'
const app = express()

var bug = {
    _id: "abc123",
    title: "Cannot save a new car",
    description: "problem when clicking Save",
    severity: 3,
    createdAt: 1542107359454,
}

app.get('/api/bug', (req, res) =>
    res.send(bug))

app.get('/user', (req, res) =>
    res.send('Hello there you user!'))

app.listen(3030, () => console.log('Server ready at port 3030')) 