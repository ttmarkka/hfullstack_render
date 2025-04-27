// @ts-nocheck
import React, { SetStateAction, useState } from "react"
import personService from "./personService"
import { personType } from "./App"

function Entries({
	persons,
	setPersons,
	setErrorMessage,
}: {
	persons: personType[]
	setPersons: React.Dispatch<SetStateAction<personType[]>>
	setErrorMessage: React.Dispatch<SetStateAction<string>>
}) {
	const handleDeletePerson = (person: personType) => {
		personService
			.deletePerson(person)
			.then(() => {
				const newPersons = persons.filter((p) => p.id !== person.id)
				setPersons(newPersons)
			})
			.catch(() => {
				setErrorMessage(`${person.name} Already deleted!`)
				setTimeout(() => {
					setErrorMessage("")
				}, 2000)
			})
	}
	return (
		<>
			<h2>Entries</h2>
			{persons.map((person) => (
				<div key={person.id}>
					<p>
						{person.name}: {person.number}
					</p>
					<button onClick={() => handleDeletePerson(person)}>
						delete
					</button>
				</div>
			))}
		</>
	)
}

export default Entries
