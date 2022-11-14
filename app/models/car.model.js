module.exports = (sequelize, Sequelize) => {
    const Car = sequelize.define("cars", {
        make: {
            type: Sequelize.STRING
        },
        model: {
            type: Sequelize.STRING
        },
        // miles: {
        //     type: Sequelize.INT24
        // }
    });

    return Car;
};
