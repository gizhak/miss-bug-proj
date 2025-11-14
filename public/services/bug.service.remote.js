const BASE_URL = '/api/bug/'

export const bugService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter
}

function query(filterBy) {
    const queryParams = `?txt=${filterBy.txt}&minSeverity=${filterBy.minSeverity}`
    return axios.get(BASE_URL + queryParams)
        .then(res => res.data)
}

function getById(bugId) {
    return axios.get(BASE_URL + bugId)
        .then(res => res.data)
}

function remove(bugId) {
    return axios.get(BASE_URL + bugId + '/remove')
        .then(res => res.data)
}

function save(bug) {
    const queryParams = 'save?' +
        `_id=${bug._id || ''}&` +
        `title=${bug.title}&` +
        `severity=${bug.severity}&` +
        `description=${bug.description}` 

    return axios.get(BASE_URL + queryParams)
        .then(res => res.data)
}

function getDefaultFilter() {
    return { txt: '', minSeverity: 0 }
}