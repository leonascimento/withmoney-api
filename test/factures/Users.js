// test/factories/user.js
// import faker from "faker";
import models from '../../src/models';

/**
 * Generate an object which container attributes needed
 * to successfully create a user instance.
 *
 * @param  {Object} props Properties to use for the user.
 *
 * @return {Object}       An object to build the user from.
 */
const data = async (props = {}) => {
  const defaultProps = {
    name: 'name',
    email: 'email@domain.com',
    password: 'P@ssw0rd',
    enabled: true,
  };
  return Object.assign({}, defaultProps, props);
};

/**
 * Generates a user instance from the properties provided.
 *
 * @param  {Object} props Properties to use for the user.
 *
 * @return {Object}       A user instance
 */
export default async (props = {}) => models.Users.create(await data(props));
