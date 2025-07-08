import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { ProductRoutes } from "./app/modules/product/product.route";
import { OrderRoutes } from "./app/modules/order/order.route";

const app: Application = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// This is for product module route
app.use("/api/products", ProductRoutes);
// This is for order module route
app.use("/api/orders", OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Route not found handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
  next();
});
// Global error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: error.message || "Internal Server Error",
    error: error,
  });
  next();
});



export default app;
