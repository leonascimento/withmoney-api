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
    name: 'Banco do Brasil',
    type: 'checking_account',
    initalValue: 61.52,
    ...props,
  };
  return defaultProps;
  // return Object.assign({}, defaultProps, props);
};

/**
 * Generates a user instance from the properties provided.
 *
 * @param  {Object} props Properties to use for the user.
 *
 * @return {Object}       A user instance
 */
export default async (props = {}) => models.Accounts.create(await data(props));
