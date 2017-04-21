'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        queryInterface.addColumn('games', 'numberOfPlayers', Sequelize.STRING)
    },

    down: function(queryInterface, Sequelize) {
        queryInterface.removeColumn('games', 'numberOfPlayers')
    }
};
