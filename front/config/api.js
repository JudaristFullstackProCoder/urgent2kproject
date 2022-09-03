const home = "http://localhost:3000";
export default {
  home: home,
  userSignUp: `${home}/users`,
  getAllUsers: `${home}/users`,
  userLogin: `${home}/auth/user/login`,
  openStore: `${home}/stores/open`,
  getSession: `${home}/session`,
  getCountries: `${home}/countries`,
  getContinents: `${home}/continents`,
  getLanguages: `${home}/languages`,
  getCitiesOfaCountry: (countryName) => {
    return `${home}/cities?c=${countryName}`;
  },
  getAllUsers: `${home}/users`,
  getUserById: (userId) => `${home}/users/${userId}`,
  updateUser: (userId) => `${home}/users/${userId}`,
  createTransaction: `${home}/transactions`,
  getAllTransactionsOfTheGivenUser: (userId) =>
    `${home}/transactions?user=${userId}`,
};
