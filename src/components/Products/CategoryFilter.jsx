import React from "react";

const CategoryFilter = ({ categories, selected, onToggle }) => {
  return (
    <ul className="space-y-3">
      {categories.map((category) => {
        const isChecked = selected.includes(category.key);
        return (
          <li key={category.key} className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => onToggle(category.key)}
              className="flex items-center gap-3 w-full"
              aria-label={`Filter by ${category.label}`}
            >
              {/* Gradient checkbox */}
              <span
                className={`chk-box flex items-center justify-center w-5 h-5 border transition-colors ${
                  isChecked
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 border-transparent"
                    : "bg-white border-gray-600"
                }`}
              >
                {isChecked && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>

              {/* Label */}
              <span className="text-black text-base flex items-center gap-2">
                {category.label}
                <span className="text-black">({category.count})</span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default React.memo(CategoryFilter);
