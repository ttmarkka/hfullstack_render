import axios from "axios"
import { personType } from "./App"

const BACKEND_URL = "http://localhost:3001/api/persons"

const addPerson = (person: personType) => {
	return axios.post(BACKEND_URL, person)
}
const deletePerson = (person: personType) => {
	return axios.delete(`${BACKEND_URL}/${person.id}`)
}
const updatePerson = (person: personType) => {
	return axios.put(`${BACKEND_URL}/${person.id}`, person)
}

const getPersons = () => {
	return axios.get(BACKEND_URL)
}

export default { addPerson, deletePerson, updatePerson, getPersons }
