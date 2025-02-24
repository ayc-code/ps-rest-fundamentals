import express from "express";
import { getCustomerDetail, getCustomers, searchCustomers } from "./customers.service";
import { getOrdersForCustomer } from "../orders/orders.service";

export const customersRouter = express.Router();

customersRouter.get("/", async (req, res) => {
  const customers = await getCustomers();
  res.json(customers);
});

customersRouter.get("/:id", async (req, res) => {
  const customerId = req.params.id;
  const customer = await getCustomerDetail(customerId);

  if (customer === null) {
    res.status(404).json({ message: "Customer not found" });
  } else {
    res.json(customer);
  }
});

customersRouter.get("/:id/orders", async (req, res) => {
  const customerId = req.params.id;
  const orders = await getOrdersForCustomer(customerId);

  res.json(orders);
});

customersRouter.get("/search/:query", async (req, res) => {
  const query = req.params.query;
  const customers = await searchCustomers(query);
  res.json(customers);
});