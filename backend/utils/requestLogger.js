const morgan = require("morgan")

morgan.token("body", function (request, response) {
	return JSON.stringify(request.body)
})

const requestLogger = morgan(function (tokens, request, response) {
	return [
		tokens.method(request, response),
		tokens.url(request, response),
		tokens.status(request, response),
		tokens.res(request, response, "content-length"),
		"-",
		tokens["response-time"](request, response),
		"ms",
		tokens.body(request, response),
	].join(" ")
})
module.exports = requestLogger
