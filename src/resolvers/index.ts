import db from "../_db";

//*resolver functions to handle queries and req based on our query and types.

export const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    game(_: any, args: any) {
      return db.games.find(({ id }) => id === args.id);
    },
    reviews() {
      return db.reviews;
    },
    review(_: any, args: any) {
      return db.reviews.find(({ id }) => id === args.id);
    },
    authors() {
      return db.authors;
    },
    author(_: any, args: any) {
      return db.authors.find(({ id }) => id === args.id);
    },
  },
  Game: {
    //parent gives us the result of parent query which is in this case games
    reviews(parent: any) {
      return db.reviews.filter(({ game_id }) => game_id === parent.id);
    },
  },
  Author: {
    //parent gives us the result of parent query which is in this case games
    reviews(parent: any) {
      return db.reviews.filter(({ author_id }) => author_id === parent.id);
    },
  },
  Review: {
    //parent gives us the result of parent query which is in this case games
    author(parent: any) {
      return db.authors.find(({ id }) => id === parent.author_id);
    },
    game(parent: any) {
      return db.games.find(({ id }) => id === parent.game_id);
    },
  },
  Mutation: {
    deleteGame(_: any, args: any) {
      db.games = db.games.filter(({ id }) => id !== args.id);
      return db.games;
    },
    addGame(_: any, args: any) {
      let game = {
        id: Math.floor(Math.random() * 10000).toString(),
        ...args.game,
      };
      db.games.push(game);
      return game;
    },
    updateGame(_: any, args: any) {
      db.games = db.games.map((game) => {
        if (game.id !== args.id) return game;
        return {
          ...game,
          ...args.edits,
        };
      });

      return db.games.find(({ id }) => id === args.id);
    },
  },
};
