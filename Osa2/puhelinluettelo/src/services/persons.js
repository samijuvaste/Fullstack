import axios from "axios"
const baseurl = '/api/persons'

const getAll = () => (
    axios
        .get(baseurl)
        .then(response => response.data)
)

const create = newObject => (
    axios
        .post(baseurl, newObject)
        .then(response => response.data)
)

const deleteObject = id => (
    axios
        .delete(`${baseurl}/${id}`)
)

const update = (id, newObject) => (
    axios
        .put(`${baseurl}/${id}`, newObject)
        .then(response => response.data)
)

export default {getAll, create, deleteObject, update}