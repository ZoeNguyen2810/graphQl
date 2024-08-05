const { UsersList , MovieList } = require('./FakeData')

const _ = require("lodash")

const resolvers = {
    Query: {
      users: () => {
        return UsersList;
      },
      user: (parent, args) => {
        const id = args.id;
        const user = _.find(UsersList, { id: Number(id) });
        return user;
      },
      movies: () => {
        return MovieList;
      },
      movie: (parent, args) => {
        const name = args.name;
        const movie = _.find(MovieList, { name });
        return movie;
      }
    },
    User: {
      favoriteMovies: (parent) => { 
        return _.filter(MovieList, (movie) => movie.yearOfPublication > 2000 && movie.yearOfPublication < 2010);
      }
    },
    Mutation: {
        createUsers: (parent, args) => {
          const user = args.input;
          const newUser = { id: UsersList.length, ...user };
          UsersList.push(newUser);
          return newUser;
        },
        updateUserName: (parent, args) => {
          const { id, userNameNew } = args.input;
          let updatedUser = null;
          UsersList.forEach(user => {
            if (user.id === Number(id)) {
              user.username = userNameNew; // Correct the field name
              updatedUser = user;
            }
          });
          return updatedUser;
        },
        deleteUser: (parent, args) => {
          const id = args.id;
          _.remove(UsersList, user => user.id === Number(id));
          return null;
        }
      }
       
  };
  

module.exports = {
    resolvers
}