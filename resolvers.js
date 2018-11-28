
const Curso = require('./models/Curso')
const Profesor = require('./models/Profesor')

// provee resolvers para nuestro esquema
const resolvers = {
  Query: {
    // cursos: () => []
    cursos: () => Curso.query().eager('[profesor, comentarios]'),
    profesores: () => Profesor.query().eager('cursos'),
    curso: (rootValue, args) => Curso.query().eager('[profesor, comentarios]').findById(args.id),
    profesor: (rootValue, args) => Profesor.query().eager('cursos').findById(args.id)
  }, // La convencion es que si no vamos a usar rootValue colocamos un _ guion piso bajo
  Mutation: {
    profesorAdd: async (_, args) => {
      //console.log(args)
      const profesorAdded = await Profesor.query().insert(args.profesor)
      return profesorAdded
    },
    profesorEdit: async (_, args) => {
      const profesorEdited = await Profesor.query().patchAndFetchById(args.profesorId, args.profesor)
      return profesorEdited
    },
    profesorDelete: async (_, args) => {
      const deletedProfessor = await Profesor.query().findById(args.profesorId)
      const deletedRows = await Profesor.query().deleteById(args.profesorId)
      if (deletedRows > 0) {
        return deletedProfessor
      } else {
        throw new Error(`El profesor con id: ${args.profesorId} no se pudo eliminar :(`)
      }
    },
  }
}

module.exports = resolvers
