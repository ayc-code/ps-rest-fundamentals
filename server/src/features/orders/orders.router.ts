import express from "express";
import { getOrders } from "./orders.service";

export const ordersRouter = express.Router();

ordersRouter.get("/", async (req, res) => {
  const query = req.query;
  const take = query.take;
  const skip = query.skip;

  if (take && typeof take === "string" && parseInt(take) > 0 &&
    skip && typeof skip === "string" && parseInt(skip) > -1
  ) {
    const orders = await getOrders(parseInt(take), parseInt(skip));
    res.json(orders);
  } else {
    res.status(400).json({
      message: "Take and skip query parameters must be provided. Take must be a positive number and skip must be a non-negative number."
    })
  }
});