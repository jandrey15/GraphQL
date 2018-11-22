const express = require('express')
const { ApolloServer } = require('apollo-server-express')
// Con casual podemos generar datos falsos
const casual = require('casual')
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
        nombre: 'John Serrano',
        nacionalidad: 'Colombia'
      }
    },
    comentarios: () => {
      return [{
        id:1,
        nombre: 'luisj135',
        cuerpo: 'testing GraphQl'
      },
      {
        id:2,
        nombre: 'Platzi',
        cuerpo: 'testing Platzi GraphQl'
      }]
    }
  }
}

const mocks = {
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
};

// inicializar apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks
})


// aplicar middleware de apollo en express
server.applyMiddleware({
  app
})

const PORT = 5678

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
})