module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.addColumn(
      'Users', 'enabled',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        after: 'password',
      },
    )
  ),
  down: (queryInterface) => {
    queryInterface.removeColumn('Users', 'enabled');
  },
};
