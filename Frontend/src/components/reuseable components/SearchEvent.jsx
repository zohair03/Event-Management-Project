import React, { useState, useEffect, useRef } from "react";
import api from "../../api/axios";

const SearchEvent = ({ categorySelected }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
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
  }, []);

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
    setSelectedCategory(category);
    categorySelected(category);
    setShowDropdown(false);
  };

  return (
    <>
      <div className="searchEvent">
        <div>
          <input type="text" placeholder="Search Events" />

          <div className="dropdown-container" ref={dropdownRef}>
            <div
              className="dropdown-select searchEventDrop"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              {selectedCategory || "All"}
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
                <li
                  onClick={() => handleCategoryClick("All")}
                  className="dropdown-item"
                >
                  All
                </li>
                {categories.map((cat, index) => (
                  <li
                    key={index}
                    onClick={() => handleCategoryClick(cat.categoryName)}
                    className="dropdown-item"
                  >
                    {cat.categoryName}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchEvent;
