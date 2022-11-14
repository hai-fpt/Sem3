const cars = require("../controllers/cars.controller");
module.exports = app => {
    const cars = require("../controllers/cars.controller");

    var router = require("express").Router();


    // Create a new Tutorial
    //router.post("/", tutorials.create);

    // Retrieve all Tutorials
    router.get("/", cars.findAll);

    router.post("/", cars.create);

    router.put("/:id", cars.update);

    router.delete("/:id", cars.delete);


    app.use('/api/cars', router);

}
