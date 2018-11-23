const express = require('express')
const { ApolloServer } = require('apollo-server-express')
// Con casual podemos generar datos falsos
const casual = require('casual')
// const bodyParser = require('body-parser')

require('./db/setup.js')
const Curso = require('./models/Curso')
const Profesor = require('./models/Profesor')

const app = express()

// construye un schema, usando GraphQL
const typeDefs = require('./schema')

// provee resolvers para nuestro esquema
const resolvers = {
  Query: {
    // cursos: () => []
    cursos: () => Curso.query().eager('[profesor, comentarios]'),
    profesores: () => Profesor.query().eager('cursos'),
    curso: (rootValue, args) => Curso.query().eager('[profesor, comentarios]').findById(args.id),
    profesor: (rootValue, args) => Profesor.query().eager('cursos').findById(args.id)
  }
}

/* const mocks = {
  Curso: () => {
    return {
      id: casual.uuid,
      titulo: casual.sentence,
      descripcion: casual.sentences(2)
    }
  },
  Profesor: () => {
    return {
      nombre: casual.name,
      nacionalidad: casual.country
    }
  }
}; */

// inicializar apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // mocks,
  // mockEntireSchema: false // Desactivamos los mocks
})


// aplicar middleware de apollo en express
server.applyMiddleware({
  app
})

const PORT = 5678

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
})