import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getPeople = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const postPerson = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response)
}
const deletePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}
const updatePhone = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}
export default { getPeople, postPerson, deletePerson, updatePhone }