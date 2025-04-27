import "./index.css"

type PhonebookProps = {
	newName: string
	newNumber: string
	setNewName: React.Dispatch<React.SetStateAction<string>>
	setNewNumber: React.Dispatch<React.SetStateAction<string>>
	setSuccessMessage: React.Dispatch<React.SetStateAction<boolean>>
	handleAddPerson: (e: React.FormEvent) => void
}

function Phonebook({
	newName,
	newNumber,
	setNewName,
	setNewNumber,
	setSuccessMessage,
	handleAddPerson,
}: PhonebookProps) {
	const submitHandle = (e: React.FormEvent) => {
		if (
			!Array.from(newNumber).some((digit) =>
				new Set("1234567890").has(digit)
			)
		) {
			alert(`Only digits allowed in number`)
			return
		}
		handleAddPerson(e)
		setSuccessMessage(true)
		setNewNumber("")
		setTimeout(() => {
			setSuccessMessage(false)
			setNewName("")
		}, 2000)
	}
	return (
		<>
			<h2>Phonebook</h2>
			<form onSubmit={submitHandle}>
				<div>
					name:{" "}
					<input
						value={newName}
						onChange={(e) => setNewName(e.target.value)}
					/>
				</div>
				<div>
					number:{" "}
					<input
						value={newNumber}
						onChange={(e) => setNewNumber(e.target.value)}
					/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
		</>
	)
}

export default Phonebook
