import express from 'express'
import { makeId } from './services/util.service.js'
import { bugService } from './services/bug.service.js'


const app = express()

// var bugs = [
//     {
//         _id: "abc123",
//         title: "Cannot save a new car",
//         description: "problem when clicking Save",
//         severity: 3,
//         createdAt: 1542107359454,
//     },
//     {
//         _id: '123',
//         title: "Cannot click a new car",
//         description: "problem when clicking car",
//         severity: 1,
//         createdAt: 15407359454,
//     }
// ]

// save new bug
app.get('/api/bug/save', (req, res) => {
    const { id: _id, title, description, severity } = req.query
    const bug = { _id, title, description, severity: +severity, createdAt: Date.now() }
    // console.log(req.query)

    bugService.save(bug)
        .then(bug => res.send(bug))
})


// add API for all bugs
app.get('/api/bug', (req, res) => {
    bugService.query()
        .then(bugs => res.send(bugs))
})

// find bug by id
app.get('/api/bug/:id', (req, res) => {
    const bugId = req.params.id
    bugService.getById(bugId)
        .then(bug => res.send(bug))
    // const bug = bugs.find(bug => bug._id === bugId)
    //
})

// remove bug by id
app.get('/api/bug/:id/remove', (req, res) => {
    const bugId = req.params.id

    // const idx = bugs.findIndex(bug => bug._id === bugId)
    // bugs.splice(idx, 1)
    bugService.remove(bugId)
        .then(() => res.send('OK'))
})


app.get('/user', (req, res) =>
    res.send('Hello there you user!'))

app.listen(3030, () => console.log('Server ready at port 3030')) 