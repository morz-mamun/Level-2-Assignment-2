import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import { validationSchemas } from './product.validation';
const {
  ProductValidationSchema,
  UpdateProductValidationSchema,
  productSearchQuerySchema,
} = validationSchemas;
const {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
} = ProductServices;
// CREATE A PRODUCT
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const validateData = ProductValidationSchema.parse(productData);
    const result = await createProductIntoDB(validateData);
    res.status(200).json({
      success: true,
      message: 'Product created successfully',
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

// GET ALL PRODUCTS
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const validateSearchQuery = productSearchQuerySchema.parse(req.query); // Validate the search query parameters only containing searchTerm
    const { searchTerm } = validateSearchQuery;
    const result = await getAllProductsFromDB(searchTerm);
    res.status(200).json({
      success: true,
      message: 'All products fetched successfully!',
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

// GET SINGLE PRODUCT BY ID
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId: id } = req.params;
    const result = await getSingleProductFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
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

// Update Product by ID
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId: id } = req.params;
    const updatedProductData = req.body;
    const validateUpdatedProductData =
      UpdateProductValidationSchema.parse(updatedProductData);
    const result = await updateProductIntoDB(id, validateUpdatedProductData);
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
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

// DELETE PRODUCT BY ID
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId: id } = req.params;
    await deleteProductFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
      error: error,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
