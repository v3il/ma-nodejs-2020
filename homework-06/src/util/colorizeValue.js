const { availableColors } = require('../config');

module.exports = (value, color) => `${color}${value}${availableColors.WHITE}`;
