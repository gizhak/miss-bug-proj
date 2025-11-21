// import { loggerService } from './services/logger.service.js'

'use strict'
// import { loggerService } from './services/logger.service.js'

function getBugs() {

    console.log('Getting Bugs...')
    fetch('/api/bug')
        .then(res => res.json())
        .then(bugs => {
            console.log('Bugs:', bugs)
            const elBugList = document.querySelector('pre')
            elBugList.innerHTML = JSON.stringify(bugs, null, 4)
        })
        .catch(err => {
            console.error(err)
            // loggerService.error(err)
        })
}