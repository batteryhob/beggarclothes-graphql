import {
    selectUser,
    addUser   
} from  "./db"


const resolvers = {
    Query: {
        selectUser: (_, { id }) => {
            return selectUser(id)
        }
    },
    Mutation: {
        addUser: (_, { id, pw, name }) => {
            return addUser(id, pw, name )
        }
    }
}

export default resolvers