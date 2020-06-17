const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: (root, args, context, info) => {
            return context.prisma.links()
        },
        // link: (parent, args) => links.find(link => link.id === args.id)
    },
    Mutation: {
        post: (root, args, context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description,
            })
        },
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
    },
}

// 3
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: { prisma },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
