const express = require("express")
const datefns = require("date-fns")
const cors = require("cors")
const Person = require("./models/person")
const requestLogger = require("./utils/requestLogger")
require("dotenv").config()

const app = express()
const PORT = 3001

app.use(express.static("dist"))
app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.get("/", (request, response) => {
	response.send("<h1>Hello World!</h1>")
})

app.get("/info", (request, response, next) => {
	Person.countDocuments({})
		.then((count) => {
			const currentDateTime = datefns.format(
				new Date(),
				"yyyy-MM-dd HH:mm:ss"
			)
			const responseText = `<div> <h2>Phonebook has ${count} people</h2>
	   <h2>The Current Date and Time is ${currentDateTime}</h2>
	   </div>`
			response.send(responseText)
		})
		.catch((error) => next(error))
})

app.get("/api/persons", (request, response, next) => {
	Person.find({})
		.then((persons) => {
			response.json(persons)
		})
		.catch((error) => next(error))
})

app.get("/api/persons/:id", (request, response, next) => {
	Person.findById(request.params.id)
		.then((person) => {
			if (person) {
				response.json(person)
			} else {
				response.status(404).end()
			}
		})
		.catch((error) => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
	Person.findByIdAndDelete(request.params.id)
		.then((result) => {
			response.status(204).end()
		})
		.catch((error) => next(error))
})

app.post("/api/persons", (request, response, next) => {
	const body = request.body

	if (!body.name || !body.number) {
		return response.status(400).json({
			error: "name or number missing",
		})
	}

	const person = new Person({
		name: body.name,
		number: body.number,
	})

	person
		.save()
		.then((savedPerson) => {
			response.json(savedPerson)
		})
		.catch((error) => next(error))
})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" })
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}

app.use(errorHandler)
