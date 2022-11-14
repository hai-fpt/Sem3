const db = require("../models");
const Car = db.cars;
const Op = db.Sequelize.Op; //Operator AND OR

exports.create = (req, res) => {
    const car = {
        make: req.body.make,
        model: req.body.model,
        miles: req.body.miles
    };

    Car.create(car)
        .then(data => {
            res.send(data);
        });
}

exports.findAll = (req, res) => {

    try {
        Car.findAll()
            .then(data => {
                // res.send(data);
                res.render("index",{data:data})
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving tutorials."
                });
            });
    } catch(error) {
        console.log(error);
    }

}
exports.update = (req, res) => {
    const id = req.params.id;
    Car.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Car updated successfully"
                });
            } else {
                res.send({
                    message: "Failed"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error id=" + id
            });
        });
}
exports.delete = (req, res) => {
    const id = req.params.id;
    Car.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Deleted"
                });
            } else {
                res.send({
                    message: "Failed"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error 500"
            });
        });
}
;


