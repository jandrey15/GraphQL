
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
      const deletedProfesor = await Profesor.query().findById(args.profesorId)
      const deletedRows = await Profesor.query().deleteById(args.profesorId)
      if (deletedRows > 0) {
        return deletedProfesor
      } else {
        throw new Error(`El profesor con id: ${args.profesorId} no se pudo eliminar :(`)
      }
    },
    cursoAdd: async (_, args) => {
      const cursoAdded = await Curso.query().insert(args.curso)
      return cursoAdded
    },
    cursoEdit: async (_, args) => {
      const cursoEdited = await Curso.query().patchAndFetchById(args.cursoId, args.curso)
      return cursoEdited
    },
    cursoDelete: async (_, args) => {
      const deletedCurso = await Curso.query().findById(args.cursoId)
      const deletedRows = await Curso.query().deleteById(args.cursoId)
      if (deletedRows > 0) {
        return deletedCurso
      } else {
        throw new Error(`El curso con id: ${args.cursoId} no se pudo eliminar :(`)
      }
    },
  }
}

module.exports = resolvers
