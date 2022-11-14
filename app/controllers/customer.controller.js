const Customer = require('../models/customer.model');

exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId, (err, data) => {
        if(err) {
            console.log(err);
        }
        res.send(data);
    })
}

exports.updateCustomer = (req, res) => {

    const customer = new Customer({
        email: req.body.email,
        name: req.body.name,
        active: req.body.active,
        imageURL: req.body.imageURL
    })

    Customer.updateCustomer(req.params.customerId, customer, (err, data) => {
        if(err)
            console.log(err);
        
        res.send(data);
    })
}

exports.findAll = (req, res) => {
    Customer.getAll((err, data) => {
        if (err) {
            console.log(err);
        }
        else
            res.send(data);
    });
}

exports.create = (req, res) => {

    const customer = new Customer({
        email: req.body.email,
        name: req.body.name,
        active: req.body.active,
        imageURL: req.body.imageURL
    })

    Customer.create(customer, (err, data) => {
        if (err) {
            console.log(err);
        }
        else
            res.send(data);
    });
}

