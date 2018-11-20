const express = require('express')
const { ApolloServer } = require('apollo-server-express')
// const bodyParser = require('body-parser')

const app = express()

// construye un schema, usando GraphQL
const typeDefs = require('./schema')

// provee resolvers para nuestro esquema
const resolvers = {
  Query: {
    // cursos: () => []
    cursos: () => {
      return [{
        id: 1,
        titulo: 'Curso de react.js',
        descripcion: 'Aprendiendo React.js'
      }, {
        id: 2,
        titulo: 'Curso de GraphQL.js',
        descripcion: 'Aprendiendo GraphQL.js'
      }]
    }
  },
  Curso: {
    profesor: () => {
      return {
        nombre: 'John Serrano'
      }
    }
  }
}

// inicializar apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers
})


// aplicar middleware de apollo en express
server.applyMiddleware({
  app
})

const PORT = 5678

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
})