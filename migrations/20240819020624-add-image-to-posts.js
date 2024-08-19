module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Posts', 'image', {
      type: Sequelize.STRING,
      allowNull: true, // Set to false if the column should be required
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Posts', 'image');
  }
};