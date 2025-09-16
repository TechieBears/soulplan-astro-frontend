import React from "react";
import BackgroundTitle from "../../../components/Titles/BackgroundTitle";
import bannerImage from "../../../assets/space.jpg";
import ProductCard from "../../../components/Products/ProductCard";
import FilterSidebar from "../../../components/Products/FilterSidebar";

// Import product images
import img1 from "../../../assets/shop/product5.png";
import img2 from "../../../assets/shop/product2.png";
import img3 from "../../../assets/shop/product3.png";
import img4 from "../../../assets/shop/product4.png";
import img5 from "../../../assets/shop/product5.png";
import img6 from "../../../assets/shop/product6.png";
import Breadcrumbs from "../../../components/breadcrum";

import { ArrowLeft,ArrowRight } from "lucide-react";


const ProductsPage = () => {
  // Hardcoded filter categories (label with optional count)
  const categories = [
    { key: "amulets", label: "Amulets", count: 3, color: "bg-orange-500" },
    { key: "candles", label: "Candles", count: 3, color: "bg-teal-500" },
    { key: "divination", label: "Divination", count: 2, color: "bg-blue-500" },
    { key: "gemstone", label: "Gemstone", count: 6, color: "bg-amber-500" },
    {
      key: "uncategorized",
      label: "Uncategorized",
      count: 0,
      color: "bg-gray-300",
    },
  ];

  // Hardcoded products array
  const products = [
    {
      id: "P4000",
      title: "Rudraksha",
      category: "amulets",
      price: 3520,
      oldPrice: 4090,
      rating: 4,
      image: img1,
    },
    {
      id: "P4001",
      title: "James stone",
      category: "gemstone",
      price: 3520,
      oldPrice: 4090,
      rating: 4,
      image: img2,
    },
    {
      id: "P4002",
      title: "Exclusive James Stone",
      category: "gemstone",
      price: 3520,
      oldPrice: 4090,
      rating: 5,
      image: img3,
    },
    {
      id: "P4003",
      title: "Bracelets",
      category: "amulets",
      price: 3520,
      oldPrice: 4090,
      rating: 3,
      image: img4,
    },
    {
      id: "P4004",
      title: "Pendants",
      category: "amulets",
      price: 3520,
      oldPrice: 4090,
      rating: 4,
      image: img5,
    },
    {
      id: "P4005",
      title: "Yantras",
      category: "divination",
      price: 3520,
      oldPrice: 4090,
      rating: 4,
      image: img6,
    },
    {
      id: "P4006",
      title: "Murti",
      category: "divination",
      price: 2800,
      oldPrice: 3200,
      rating: 4,
      image: img1,
    },
    {
      id: "P4007",
      title: "Siddha Product",
      category: "candles",
      price: 1500,
      oldPrice: 1800,
      rating: 4,
      image: img2,
    },
    {
      id: "P4008",
      title: "Frames",
      category: "uncategorized",
      price: 2200,
      oldPrice: 2500,
      rating: 4,
      image: img3,
    },
    {
      id: "P4009",
      title: "Crystal Trees",
      category: "gemstone",
      price: 4200,
      oldPrice: 4800,
      rating: 4,
      image: img4,
    },
    {
      id: "P4010",
      title: "Kawach",
      category: "amulets",
      price: 1800,
      oldPrice: 2100,
      rating: 3,
      image: img5,
    },
  ];

  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [price, setPrice] = React.useState([200, 6800]);
  const [sortBy, setSortBy] = React.useState("featured");
  const [viewMode, setViewMode] = React.useState("grid");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage] = React.useState(9);
  const PRICE_MIN = 0;
  const PRICE_MAX = 10000;

  const toggleCategory = (key) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const resetFilters = () => {
    setSearch("");
    setSelected([]);
    setPrice([200, 6800]);
    setSortBy("featured");
    setCurrentPage(1);
  };

  const sortProducts = (products) => {
    switch (sortBy) {
      case "price-low":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...products].sort((a, b) => b.price - a.price);
      case "rating":
        return [...products].sort((a, b) => b.rating - a.rating);
      case "newest":
        return [...products].sort((a, b) => b.id.localeCompare(a.id));
      default:
        return products;
    }
  };

  const filtered = React.useMemo(() => {
    let result = products.filter((p) => {
      const inCat = selected.length ? selected.includes(p.category) : true;
      const inSearch = search
        ? p.title.toLowerCase().includes(search.toLowerCase())
        : true;
      const inPrice = p.price >= price[0] && p.price <= price[1];
      return inCat && inSearch && inPrice;
    });
    return sortProducts(result);
  }, [products, selected, search, price, sortBy]);

  const paginatedProducts = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filtered.slice(startIndex, startIndex + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="bg-[#FFF9EF]">
      <Breadcrumbs />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Products Grid */}
          <div className="lg:col-span-9 order-2 lg:order-1">

            {/* Toolbar */}
            {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-600">
                                    Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} products
                                </span>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="newest">Newest</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Highest Rated</option>
                                </select>
                            </div>
                        </div> */}

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
              {paginatedProducts.map((product) => (
                <div key={product.id} className="h-full">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

{/* Pagination */}
{totalPages > 1 && (
  <div className="flex justify-start items-center space-x-2 mt-8">
    {/* Previous Button */}
    <button
      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
      disabled={currentPage === 1}
      className="w-10 h-10 flex items-center justify-center text-sm font-medium 
                 bg-gray-100 text-gray-600 hover:bg-gray-200 
                 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <ArrowLeft className="w-4 h-4" />
    </button>

    {/* Page Numbers */}
    {[...Array(totalPages)].map((_, index) => {
      const page = index + 1;

      // Show first, last, current, and 3 pages after current
      if (
        page === 1 ||
        page === totalPages ||
        (page >= currentPage - 1 && page <= currentPage + 3)
      ) {
        return (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-10 h-10 flex items-center justify-center text-sm font-medium ${
              currentPage === page
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        );
      } else if (
        page === currentPage - 2 ||
        page === currentPage + 4
      ) {
        return (
          <span
            key={page}
            className="w-10 h-10 flex items-center justify-center text-gray-400"
          >
            ...
          </span>
        );
      }
      return null;
    })}

    {/* Next Button */}
    <button
      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
      disabled={currentPage === totalPages}
      className="w-10 h-10 flex items-center justify-center text-sm font-medium 
                 bg-gray-100 text-gray-600 hover:bg-gray-200 
                 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <ArrowRight className="w-4 h-4" />
    </button>
  </div>
)}


            {filtered.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v1M7 8h10l-1 8H8l-1-8z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors font-medium"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

          {/* Filter Sidebar */}
          <aside className="lg:col-span-3 order-1 lg:order-2">
            <div className="lg:sticky lg:top-6">
              <FilterSidebar
                search={search}
                onSearchChange={setSearch}
                priceRange={price}
                onPriceChange={setPrice}
                categories={categories}
                selectedCategories={selected}
                onToggleCategory={toggleCategory}
                onResetFilters={resetFilters}
                minPrice={PRICE_MIN}
                maxPrice={PRICE_MAX}
                totalProducts={filtered.length}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
