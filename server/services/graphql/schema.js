const typeDefinitions = `
  type: Event {
    id: Int,
    title: String
  }
  
  type: RootQuery {
    events: [Event]
  }
  
  schema {
    query: RootQuery
  }
`;

export default [typeDefinitions]