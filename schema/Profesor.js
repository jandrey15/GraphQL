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
    nacionalidad: String!
    genero: Genero
    cursos: [cursosInput]
  }

  input cursosInput {
    id: ID!
    titulo: String
  }

  input EditProfesor {
    nombre: String
    genero: Genero
    nacionalidad: String
  }
`
