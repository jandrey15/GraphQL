const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const PORT = 5678

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`)
})