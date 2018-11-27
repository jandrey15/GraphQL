module.exports = `
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

  input NewProfesor {
    nombre: String!
    genero: Genero
    nacionalidad: String!
  }
`
