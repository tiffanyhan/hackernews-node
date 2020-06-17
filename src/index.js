const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')


const resolvers = {
    Query,
    Mutation,
    User,
    Link,
        // updateLink: (parent, args) => {
        //     link = links.find(link => link.id === args.id)
        //     if (!link) throw Error('Could not find link with this id')
        //     link.url = args.url || link.url
        //     link.description = args.description || link.description
        //     return link
        // },
        // deleteLink: (parent, args) => {
        //     index = links.findIndex(link => link.id === args.id)
        //     if (index === -1) throw Error('Could not find link with this id')
        //     link = links[index]
        //     links.splice(index, 1)
        //     return link
        // },
}

// 3
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            prisma,
        }
    }
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
