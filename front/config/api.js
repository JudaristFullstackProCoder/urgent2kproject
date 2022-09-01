const home = 'http://localhost:3000';
export default {
  home: home,
  userSignUp: `${home}/users`,
  userLogin: `${home}/auth/user/login`,
  openStore: `${home}/stores/open`,
  getSession: `${home}/session`,
  getCountries: `${home}/countries`,
  getContinents: `${home}/continents`,
  getLanguages: `${home}/languages`,
  getCitiesOfaCountry: (countryName) => {
    return `${home}/cities?c=${countryName}`
  },
};
