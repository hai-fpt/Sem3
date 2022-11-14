const sql = require('./db');

const Customer = function(customer) {
    this.email = customer.email;
    this.name = customer.name;
    this.active = customer.active;
    this.imageURL = customer.imageURL;
};

Customer.create = (newCustomer, result) => {
    sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created customer: ", { id: res.insertId, ...newCustomer });
        result(null, { id: res.insertId, ...newCustomer });
    });
}

Customer.findById = (customerId, result) => {
    sql.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("customers: ", res);
        result(null, res[0]);
    });
}

Customer.updateCustomer = (customerId, customer , result) => {
    sql.query("UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?"
        , [customer.email, customer.name, customer.active, customerId]
        ,(err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("customers: ", res);
            result(null, { customerId, ...customer });
        });
}

Customer.getAll = result => {
    sql.query("SELECT * FROM customers", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("customers: ", res);
        result(null, res);
    });
}

module.exports = Customer;
