// Create order

import mongoose from 'mongoose';
import ProductModel from '../product/product.model';
import { IOrder } from './order.interface';
import OrderModel from './order.model';

// create order into db
const createOrderIntoDB = async (orderData: IOrder) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const product = await ProductModel.findById(orderData.productId).session(
      session
    );
    if (!product) {
      throw new Error('Order not found');
    }
    if (product.inventory.quantity < orderData.quantity) {
     throw new Error('Insufficient quantity available in inventory');
    }

    // update product
    product.inventory.quantity -= orderData.quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    await product.save({ session });
    // create order
    const order = await OrderModel.create([orderData], { session });
    await session.commitTransaction();
    session.endSession();

    return order[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

// Retrieve all orders
const getAllOrdersFromDB = async (email: string | undefined) => {
  if (email) {
    const result = await OrderModel.find({ email });
    if (!result) {
      throw new Error('Failed to get all orders by user email');
    }
    return result;
  } else {
    const result = await OrderModel.find();
    if (!result) {
      throw new Error('Failed to get all orders');
    }
    return result;
  }
};

// Retrieve all orders by user email
// const getAllOrdersByUserEmailFromDB = async (email: string) => {
//   const result = await OrderModel.find({ email });
//   if (!result) {
//     throw new Error('Failed to get all orders by user email');
//   }
//   return result;
// };

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  // getAllOrdersByUserEmailFromDB,
};
