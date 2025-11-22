// import { utilService } from './util.service.js'
// import { storageService } from './async-storage.service.js'

// const STORAGE_KEY = 'bugs'
const BASE_URL = '/api/bug/'

// _createBugs()

export const bugService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter
}

function query(filterBy) {
    return axios.get(BASE_URL)
        .then(res => {
            let bugs = res.data
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                bugs = bugs.filter(bug => regExp.test(bug.title))
            }

            if (filterBy.minSeverity) {
                bugs = bugs.filter(bug => bug.severity >= filterBy.minSeverity)
            }

            return bugs
        })
}

function getById(bugId) {
    return storageService.get(bugId)
}

function remove(bugId) {
    return storageService.remove(bugId)
}

function save(bug) {
    const queryParams = 'save?' +
        `id=${bug._id || ''}&` +
        `title=${bug.title}&` +
        `description=${bug.description || ''}&` +
        `severity=${bug.severity}`

    console.log('Saving bug with params:', queryParams)

    return axios.get(BASE_URL + queryParams)
        .then(res => res.data)
        .catch(err => { Promise.reject(err) })
}

// function _createBugs() {
//     let bugs = utilService.loadFromStorage(STORAGE_KEY)
//     if (bugs && bugs.length > 0) return

//     bugs = [
//         {
//             title: "Infinite Loop Detected",
//             severity: 4,
//             _id: "1NF1N1T3"
//         },
//         {
//             title: "Keyboard Not Found",
//             severity: 3,
//             _id: "K3YB0RD"
//         },
//         {
//             title: "404 Coffee Not Found",
//             severity: 2,
//             _id: "C0FF33"
//         },
//         {
//             title: "Unexpected Response",
//             severity: 1,
//             _id: "G0053"
//         }
//     ]
//     utilService.saveToStorage(STORAGE_KEY, bugs)
// }

function getDefaultFilter() {
    return { txt: '', minSeverity: 0 }
}