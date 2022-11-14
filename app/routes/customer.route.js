const customers = require("../controllers/customer.controller");
module.exports = app => {
    const customers = require('../controllers/customer.controller');

    app.get("/customers", customers.findAll);
    app.get("/customers/:customerId", customers.findOne);
    app.post("/customers", customers.create);

    app.put("/customers/:customerId", customers.updateCustomer);

}

