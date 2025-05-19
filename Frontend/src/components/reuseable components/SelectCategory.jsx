import { useState, useEffect, useRef } from "react";
import useApiPrivate from "../../Hooks/useApiPrivate.jsx";
import NewCategoryModal from "./NewCategory.jsx";
import api from "../../api/axios.js";
import "./SelectCategory.css"

const SelectCategory = ({eventCategory}) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await api.get("/api/category/all");
        setCategories(response.data.allCategory);
      } catch (err) {
        console.log("error in hitting category /all route", err);
      }
    };
    getCategories();
  }, [categories]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleCategoryClick = (category) => {
    if (category === "add") {
      setShowModal(true);
    } else {
      setSelectedCategory(category);
      eventCategory(category);
    }
    setShowDropdown(false);
  };

  const handleAddCategory = (newCat) => {
    setCategories([...categories, newCat]);
    setSelectedCategory(newCat);
    eventCategory(newCat);
  };

  return (
    <>
      <div className="dropdown-container" ref={dropdownRef}>
        <div
          className="dropdown-select"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          {selectedCategory || "Category"}
          <span className="dropdown-arrow">
            <img
              src="/assets/icons/down.svg"
              width={20}
              height={20}
              alt="down"
            />
          </span>
        </div>

        {showDropdown && (
          <ul className="dropdown-list">
            {categories.map((cat, index) => (
              <li
                key={index}
                onClick={() => handleCategoryClick(cat.categoryName)}
                className="dropdown-item"
              >
                {cat.categoryName}
              </li>
            ))}
            <li
              onClick={() => handleCategoryClick("add")}
              className="dropdown-item add-new"
            >
              Add new category
            </li>
          </ul>
        )}

        <NewCategoryModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onAddCategory={handleAddCategory}
        />
      </div>
    </>
  );
};

export default SelectCategory;
