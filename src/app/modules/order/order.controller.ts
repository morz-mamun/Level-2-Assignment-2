import { Request, Response } from 'express';
import { validationSchemas } from './order.validation';
import { OrderServices } from './order.service';

const { OrderValidationSchema } = validationSchemas;

const { createOrderIntoDB, getAllOrdersFromDB } = OrderServices;

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const validateOrderData = OrderValidationSchema.parse(orderData);
    const result = await createOrderIntoDB(validateOrderData);
    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
      error: error,
    });
  }
};

// GET ALL ORDERS and GET ALL ORDERS BY USER EMAIL
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const result = await getAllOrdersFromDB(email as string | undefined);
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
      error: error,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
