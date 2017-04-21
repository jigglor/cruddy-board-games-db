'use strict';
module.exports = function(sequelize, DataTypes) {
    var game = sequelize.define('game', {
        name: {
            type: DataTypes.STRING,
            validate: {
                notNull: true
            }
        },
        description: {
            type: DataTypes.STRING,
            validate: {
                notNull: true
            }
        },
        numberOfPlayers: {
            type: DataTypes.INTEGER,
            validate: {
                notNull: true,
                min: 1
            }
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return game;
};
