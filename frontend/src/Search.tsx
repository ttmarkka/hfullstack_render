import React from "react"

type SearchProps = {
	newSearch: string
	persons: { name: string; number: string; id: string }[]
	setNewSearch: React.Dispatch<React.SetStateAction<string>>
}

function Search({ newSearch, setNewSearch, persons }: SearchProps) {
	return (
		<>
			<h2>Search</h2>
			<input
				value={newSearch}
				onChange={(e) => setNewSearch(e.target.value)}
			/>

			<h3>Results:</h3>
			{persons.map((person) =>
				newSearch &&
				(person.name.indexOf(newSearch) !== -1 ||
					person.number.indexOf(newSearch) !== -1) ? (
					<p key={person.id}>
						{person.name} {":"}
						{person.number}
					</p>
				) : (
					<div key={person.id}></div>
				)
			)}
		</>
	)
}

export default Search
