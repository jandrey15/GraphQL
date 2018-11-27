const { gql } = require('apollo-server-express')
const Curso = require('./Curso')
const Profesor = require('./Profesor')

// creamos los esquemas
const schema = gql`
  ${Curso}
  
  ${Profesor}

  type Query {
    cursos: [Curso]
    profesores: [Profesor]
    curso(id: Int): Curso
    profesor(id: Int): Profesor
  }

  type Mutation {
    profesorAdd(profesor: NewProfesor): Profesor
  }
`

module.exports = schema
