import { IProduct } from './product.interface';
import ProductModel from './product.model';

const createProductIntoDB = async (productData: IProduct) => {
  const result = await ProductModel.create(productData);
  if (!result) {
    throw new Error('Failed to create product');
  }
  return result;
};

// get all products from db and SEARCH PRODUCT BY QUERY
const getAllProductsFromDB = async (searchTerm: string | undefined) => {
  if (searchTerm) {
    const query = searchTerm
      ? {
          $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } },
            { category: { $regex: searchTerm, $options: 'i' } },
            { tags: { $regex: searchTerm, $options: 'i' } },
          ],
        }
      : {};
    const result = await ProductModel.find(query);
    return result;
  }else{
    const result = await ProductModel.find();
    return result;
  }
};

// get Single product from db by id
const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findById(id); // findById is a mongoose method to find a document by mongodb _id
  if (!result) {
    throw new Error('Failed to get product by id');
  }
  return result;
};

// UPDATE PRODUCT BY ID
const updateProductIntoDB = async (
  id: string,
  updateProductData: Partial<IProduct>
) => {
  // const result = await ProductModel.updateOne({id}, updateProductData);
  const result = await ProductModel.findByIdAndUpdate(id, updateProductData, {
    new: true, // return the updated document
  });
  if (!result) {
    throw new Error('Failed to update product');
  }
  return result;
};

// DELETE PRODUCT BY ID
const deleteProductFromDB = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  if (!result) {
    throw new Error('Failed to delete product');
  }
  return result;
};


export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
