const Customer = require("../model/customer.model.js");

exports.create = (req, res) => {

  console.log(req.body);

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(Customer.Customer);

  // Create a Customer
  // Create a Customer
  const customer = new Customer.Customer({
    balance: 0,
    name: req.body.name,
    active: req.body.active
  });

  // Save Customer in the database
  Customer.Customer.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};


exports.findOne = (req, res) => {
  Customer.Customer.findById(req.body.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.body.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.body.customerId
        });
      }
    } else res.send(data);
  });
};

// exports.update = (req, res) => {
//   // Validate Request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }
//
//   Customer.Customer.updateById(
//     req.body.customerId,
//     req.body.balance,
//     (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             message: `Not found Customer with id ${req.body.customerId}.
//           });
//         } else {
//           res.status(500).send({
//             message: "Error updating Customer with id " + req.body.customerId
//           });
//         }
//       } else res.send(data);
//     }
//   );
// };

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Customer.Customer.updateById(
    req.body.customerId,
    req.body.balance,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.body.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.body.customerId
          });
        }
      } else res.send(data);
    }
  );
};
