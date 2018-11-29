module.exports = `
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

  """Definimos la entidad Comentario"""
  type Comentario {
    id: ID!
    nombre: String!
    cuerpo: String!
  }

  input NewCurso {
    titulo: String!
    descripcion: String!
  }

  input EditCurso {
    titulo: String
    descripcion: String
  }
`
