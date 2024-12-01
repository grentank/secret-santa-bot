/* eslint-disable camelcase */
function createUsername({ username, last_name, first_name }) {
  if (last_name && !username && first_name) return `${first_name} ${last_name}`;
  if (username && !last_name && first_name) return `${first_name} (${username})`;
  if (username && last_name && first_name)
    return `${first_name} ${last_name} (${username})`;
  if (username && !last_name && !first_name) return `${username}`;
  return first_name;
}

module.exports = createUsername;
