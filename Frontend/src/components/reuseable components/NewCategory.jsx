import React, { useState } from "react";
import useApiPrivate from "../../Hooks/useApiPrivate";

const NewCategoryModal = ({ isOpen, onClose, onAddCategory }) => {
  const [categoryName, setCategoryName] = useState("");
  const apiPrivate = useApiPrivate();

  const handleAdd = async (e) => {
    const cat = categoryName.trim();
    if (cat !== "") {
      try {
        const response = await apiPrivate.post("/api/category/create", {
          categoryName: cat,
        });
        onAddCategory(cat);
        setCategoryName("");
        onClose();
      } catch (err) {
        console.log("error in create category api: ", err);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>New Category</h3>
        <input
          type="text"
          placeholder="Category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <div className="modal-actions">
          <button type="button" className="add-btn" onClick={handleAdd}>
            Add
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewCategoryModal;
