import Product from "../models/Product";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, category, imgURL } = req.body;
    const newProduct = new Product({ name, price, category, imgURL });
    const productSave = await newProduct.save();

    res.status(201).json({ message: "Producto creado con exito", productoCreado: productSave });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
    try{
        const {productId} = req.params
        const product = await Product.findById(productId);
        
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

export const updateProductById = async (req, res) => {
    try{
        const {productId} = req.params
        const { name, price, category, imgURL } = req.body;
        const productUpdate = await Product.updateOne({ _id: productId},{$set: { name, price, category, imgURL }});
        
        res.status(200).json({ message: "Producto actualizado con exito", infoActualizacion: productUpdate });
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

export const deletProductById = async (req, res) => {
    try{
        const {productId} = req.params
        const product = await Product.deleteOne({ _id: productId});
        
        res.status(200).json({ message: "Producto eliminado" });
    }catch(error){
        res.status(500).json({message: error.message});
    }
};
