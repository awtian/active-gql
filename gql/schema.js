const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const studentModel = require('../models/Student')

const studentSchema = new GraphQLObjectType({
  name: 'Student',
  fields: {
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    gender: {type: GraphQLString},
  }
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'StudentQuery',
    fields: {
      message: {
        type: GraphQLString,
        resolve: () => 'Hello, active fox <3'
      },
      getAllStudents: {
        type: GraphQLList(studentSchema),
        resolve: async () =>  await studentModel.find()
      },
      getStudentById: {
        type: studentSchema,
        args: {
          id: {type: new GraphQLNonNull(GraphQLID)}
        },
        resolve: async (_parents, args) =>  await studentModel.findById(args.id)
      },

    },
  }),
  mutation: new GraphQLObjectType({
    name: "RootMutation",
    fields: {
      createStudent: {
        type: studentSchema,
        args: {
          name: {type: new GraphQLNonNull(GraphQLString)},
          gender: {type: new GraphQLNonNull(GraphQLString)},
          age: {type: new GraphQLNonNull(GraphQLInt)}
        },
        resolve: async (_parents, args) => await studentModel.create({name: args.name, gender: args.gender, age: args.age}),
      }
    },
  })
})

module.exports = schema