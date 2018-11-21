const { gql } = require('apollo-server-express')

// creamos los esquemas
const schema = gql`
  """Definimos la entidad Curso"""
  type Curso {
    id: ID!
    titulo: String!
    """Esta es la descripción del curso"""
    descripcion: String!
    profesor: Profesor
    rating: Float @deprecated(reason: "No creemos más en los puntajes")
    comentarios: [Comentario]
  }

  """Definimos la entidad Profesor"""
  type Profesor {
    id: ID!
    nombre: String!
    nacionalidad: String!
    genero: Genero
    cursos: [Curso]
  }

  enum Genero {
    MASCULINO
    FEMENINO
  }

  """Definimos la entidad Comentario"""
  type Comentario {
    id: ID!
    nombre: String!
    cuerpo: String!
  }

  type Query {
    cursos: [Curso]
    profesores: [Profesor]
    curso(id: Int): Curso
    profesor(id: Int): Profesor
  }
`

module.exports = schema
