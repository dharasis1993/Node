const sql = require("../model/db.js");

// constructor
exports.Customer = function(customer){

  this.Balance = customer.balance;
  this.name = customer.name;
  this.active = customer.active;
};
// console.log(exports.Customer);
exports.Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { customer_No: res.insertId, newCustomer });
    result(null, { customer_No: res.insertId, newCustomer });
  });
};

exports.Customer.findById = (customerId, result) => {
  sql.query(`SELECT * FROM customers WHERE customer_id = ${customerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

exports.Customer.updateById = (id, balance, result) => {
  sql.query(
    "UPDATE customers SET Balance = ? WHERE customer_id = ?",
    [balance , id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      // console.log("updated customer: ", { id: customer_id,customer });
      result(null, { customerId: id, balance: balance});
    }
  );
};
