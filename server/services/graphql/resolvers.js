const events = [
  {
    id: 1,
    title: "My Birthday Party"
  },
  {
    id: 2,
    title: "Jess Wedding Party"
  }
]

const resolvers = {
  RootQuery: {
    events(root, args, context) {
      return events;
    }
  }
}

module.exports = resolvers