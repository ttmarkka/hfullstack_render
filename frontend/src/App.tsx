// @ts-nocheck
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import Search from "./Search"
import Phonebook from "./Phonebook"
import personService from "./personService"
import Entries from "./Entries"
import "./App.css"

const DB_URL = "http://localhost:3001/persons"

export type personType = { name: string; number: string; id: string }

const App = () => {
	const [persons, setPersons] = useState<personType[]>([])
	const [newSearch, setNewSearch] = useState<string>("")
	const [newName, setNewName] = useState<string>("")
	const [newNumber, setNewNumber] = useState<string>("")
	const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>("")
	const handleAddPerson = (e: React.FormEvent) => {
		e.preventDefault()
		if (newName.length !== 0 && newNumber.length !== 0) {
			const newPersons = persons
			if (persons.some((person) => person.name === newName)) {
				setPersons(
					newPersons.map((person) =>
						person.name === newName
							? { ...person, number: newNumber }
							: person
					)
				)
				personService.updatePerson({
					...newPersons.filter(
						(person) => person.name === newName
					)[0],
					number: newNumber,
				})
				return
			}
			const newPerson = { name: newName, number: newNumber, id: uuidv4() }
			newPersons.push(newPerson)
			setPersons(newPersons)
			personService.addPerson(newPerson)
		}
	}

	useEffect(() => {
		const effectPersons = async () => {
			const response = await personService.getPersons()
			setPersons(response.data)
		}
		effectPersons()
	}, [])

	return (
		<div>
			<Search
				newSearch={newSearch}
				persons={persons}
				setNewSearch={setNewSearch}
			/>
			{showSuccessMessage ? (
				<div className="add"> {`Added ${newName}`} </div>
			) : (
				<> </>
			)}
			{errorMessage ? (
				<div className="error"> {errorMessage} </div>
			) : (
				<> </>
			)}
			<Phonebook
				newName={newName}
				newNumber={newNumber}
				setNewName={setNewName}
				setNewNumber={setNewNumber}
				setSuccessMessage={setShowSuccessMessage}
				handleAddPerson={handleAddPerson}
			/>
			<Entries
				persons={persons}
				setPersons={setPersons}
				setErrorMessage={setErrorMessage}
			/>
		</div>
	)
}

export default App
