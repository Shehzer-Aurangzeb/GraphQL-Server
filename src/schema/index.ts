//always start schema with #graphql so that we get syntax highlight from the plugin
export const typeDefs = `#graphql
  #adding exclamation mark(!) meaning field is required and cannot be null

  type Game {
    id: ID!
    title:String!
    platform: [String!]!
    #if a game have a review it cant be null but a game can have no reviews. So exclamation mark inside and not inside.
    reviews:[Review!]
  }
  type Review{
    id:ID!
    rating:Int!
    content:String!
    game:Game!
    author:Author!
  }
  type Author{
    id:ID!
    name:String!
    verified:Boolean!
    #there can be authors that do not have written any review thats y no ! outside
    reviews:[Review!]
  }

  #1. The "Query" type is special: it lists all of the available queries that
  #2. clients can execute, along with the return type for each. 
  #3. In this  case, the "reviews" query returns an array of zero or more Reviews (defined above).
  type Query {
    reviews: [Review]
    review(id:ID!): Review
    games:[Game]
    game(id:ID!):Game
    authors:[Author]
    author(id:ID!):Author

  }
  type Mutation{
    addGame(game:AddGameInput):Game
    deleteGame(id:ID!):[Game]
    updateGame(id:ID!,edits:EditGameInput!):Game
  }
  #it tells graphql that it is not a type of data but a collection of fields for a mutation func.
  input AddGameInput{
    title:String!
    platform:[String!]!
  }
  input EditGameInput{
    title:String
    platform:[String!]
  }
`;
