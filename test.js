const createUsername = require('./src/utils/createUsername');

console.log(createUsername({ username: 'grentank' }));
console.log(createUsername({ username: 'grentank', first_name: 'Tatiana' }));
console.log(
  createUsername({ username: 'grentank', first_name: 'Tatiana', last_name: 'batyukova' }),
);
console.log(createUsername({ first_name: 'Tatiana', last_name: 'batyukova' }));
// const grentank = {
//   id: 3069620,gi
//   is_bot: false,
//   first_name: 'Alexander',
// //   last_name: 'Knyazev',
//   username: 'grentank',
//   language_code: 'ru',
//   is_premium: true,
// };
// console.log(
//   grentank.username || grentank.last_name
//     ? `${grentank.first_name} ${grentank.last_name}`
//     : grentank.first_name,
// );
