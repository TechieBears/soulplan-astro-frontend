import React from "react";
import SearchBar from "./SearchBar";
import PriceRangeSlider from "./PriceRangeSlider";
import CategoryFilter from "./CategoryFilter";

const FilterSidebar = ({
  search,
  onSearchChange,
  priceRange,
  onPriceChange,
  categories,
  selectedCategories,
  onToggleCategory,
  onResetFilters,
  minPrice = 0,
  maxPrice = 10000,
}) => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = React.useState(false);
  return (
    <div className="bg-white rounded-xl shadow-md ring-1 ring-slate-200 overflow-hidden">
      {/* Mobile filter header */}
      <button
        type="button"
        className="lg:hidden w-full px-4 py-3 bg-gray-50 text-left font-medium text-gray-700 flex items-center justify-between"
        onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
      >
        <span>Filters</span>
        <svg
          className={`h-5 w-5 text-gray-500 transform transition-transform ${
            isMobileFiltersOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Filter content */}
      <div
        className={`${
          isMobileFiltersOpen ? "block" : "hidden"
        } lg:block p-4 sm:p-6`}
      >
        {/* Search */}
        <div className="mb-6">
          <h4 className="text-grey-400 mb-2 text-sm sm:text-base">Search</h4>
          <SearchBar value={search} onChange={onSearchChange} />
        </div>

        {/* Price */}
        <div className="mb-6">
          <h4 className="flex flex-wrap items-center gap-2 text-gray-500 text-sm sm:text-base my-2">
            Price
            <span className="text-gray-600 font-medium">
              {priceRange[0].toLocaleString()}₹ -{" "}
              {priceRange[1].toLocaleString()}₹
            </span>
          </h4>
          <PriceRangeSlider
            min={minPrice}
            max={maxPrice}
            value={priceRange}
            onChange={onPriceChange}
          />
        </div>

        {/* Categories */}
        <div className="m-6">
          <h4 className="text-gray-800 mb-2 text-sm sm:text-base">
            Categories
          </h4>
          <CategoryFilter
            categories={categories}
            selected={selectedCategories}
            onToggle={onToggleCategory}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={onResetFilters}
            className="flex-1 rounded-lg border border-slate-300 text-slate-600 py-2 px-4 text-sm sm:text-base font-medium bg-white hover:bg-slate-50 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={() => setIsMobileFiltersOpen(false)}
            className="lg:hidden flex-1 rounded-lg bg-orange-500 text-white py-2 px-4 text-sm sm:text-base font-medium hover:bg-orange-600 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FilterSidebar);
