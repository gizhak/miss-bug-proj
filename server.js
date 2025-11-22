import express from 'express'
import { makeId } from './services/util.service.js'
import { bugService } from './services/bug.service.js'
import { loggerService } from './services/logger.service.js'


const app = express()
app.use(express.static('public'))

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
    const { _id, title, description, severity } = req.query
    const bug = { _id: _id || makeId(), title, description, severity: +severity, createdAt: Date.now() }

    bugService.save(bug)
        .then(savedBug => res.send(savedBug))
        .catch(err => {
            loggerService.error(err)
            res.status(404).send(err)
        })
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
        .catch(err => {
            loggerService.error(err)
            res.status(404).send(err)
        })
})

// remove bug by id
app.get('/api/bug/:id/remove', (req, res) => {
    const bugId = req.params.id

    // const idx = bugs.findIndex(bug => bug._id === bugId)
    // bugs.splice(idx, 1)
    bugService.remove(bugId)
        .then(() => res.send('OK'))
        .catch(err => {
            loggerService.error(err)
            res.status(500).send(err)
        })
})


app.get('/user', (req, res) =>
    res.send('Hello there you user!'))

app.listen(3030, () => loggerService.info('Server ready at port 3030')) 