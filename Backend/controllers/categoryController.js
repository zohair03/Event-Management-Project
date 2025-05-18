import { Category } from "../models/categoryModel.js";

async function handleGetAllCategory(req, res) {
  try {
    const allCategory = await Category.find();
    if (!allCategory) {
      return res.status(400).json({ massege: "Error in getting all category" });
    }
    
    res.status(200).json({ allCategory });
  } catch (err) {
    console.log("error in all category api:", err);
    res.status(500).json({ massege: "server site error" });
  }
}

async function handleCreateCategory(req, res) {
  try {
    const categoryName = req.body;
    
    if (!categoryName) {
      return res.status(404).json({ massege: "Invalid Category" });
    }

    const isCreatedCategory = await Category.create(categoryName);
    if (!isCreatedCategory) {
      return res.status(400).json({ massege: "Error in creating category" });
    }
   
    res
      .status(200)
      .json({ massege: "category created successfully", isCreatedCategory });
  } catch (err) {
    console.log("error in creating category api:", err);
    res.status(500).json({ massege: "server site error" });
  }
}

export { handleGetAllCategory, handleCreateCategory };
