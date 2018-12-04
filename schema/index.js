const { gql } = require('apollo-server-express')
const Curso = require('./Curso')
const Profesor = require('./Profesor')

// creamos los esquemas
const schema = gql`

  ${Curso}

  ${Profesor}
  
  union ResultadoBusqueda = Profesor | Curso

  type Query {
    cursos: [Curso]
    profesores: [Profesor]
    curso(id: Int): Curso
    profesor(id: Int): Profesor
    buscar(query: String!): [ResultadoBusqueda] 
  }

  type Mutation {
    profesorAdd(profesor: NewProfesor): Profesor
    profesorEdit(profesorId: Int!, profesor: EditProfesor): Profesor
    profesorDelete(profesorId: Int!): Profesor
    cursoAdd(curso: NewCurso): Curso
    cursoEdit(cursoId: Int!, curso: EditCurso): Curso
    cursoDelete(cursoId: Int!): Curso
  }
`

module.exports = schema
