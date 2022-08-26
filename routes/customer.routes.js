module.exports = app => {
  const customers = require("../controller/customer.controller.js");

  // Create a new Customer
  app.post("/customers", customers.create);

  // Retrieve a single Customer with customerId
  app.get("/customers/getCustomer", customers.findOne);

  // Update a Customer with customerId
  app.put("/customers/updateBalance", customers.update);

};
