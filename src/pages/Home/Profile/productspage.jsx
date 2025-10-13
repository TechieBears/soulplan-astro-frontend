import React from "react";
import ProductCard from "../../../components/Products/ProductCard";
import ProductCardSkeleton from "../../../components/Loader/ProductCardSkeleton";
import FilterSidebar from "../../../components/Products/FilterSidebar";
import Breadcrumbs from "../../../components/breadcrum";
import sun1 from "../../../assets/helperImages/sun1.png";
import moon from "../../../assets/helperImages/moon.png";
import { PulseLoader } from "react-spinners";
import { getActiveProducts, getPublicProductsFilter } from "../../../api";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "iconsax-reactjs";

const ProductsPage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = React.useState([]);
    const [filterData, setFilterData] = React.useState({
        categories: [],
        subcategories: [],
    });
    const [loading, setLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage] = React.useState(9);

    const [filtersLoading, setFiltersLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [search, setSearch] = React.useState("");
    const [selectedCategories, setSelectedCategories] = React.useState([]);
    const [selectedSubcategories, setSelectedSubcategories] = React.useState([]);
    const [price, setPrice] = React.useState([200, 6800]);
    const PRICE_MIN = 0;
    const PRICE_MAX = 10000;

    // Fetch filter data
    React.useEffect(() => {
        const fetchFilters = async () => {
            try {
                setFiltersLoading(true);
                const response = await getPublicProductsFilter();

                if (response.success) {
                    // Process categories and subcategories from the API response
                    const categories = response.data?.category || [];
                    const subcategories = [];

                    // Flatten subcategories from all categories
                    categories.forEach((category) => {
                        if (category.subcategories && category.subcategories.length > 0) {
                            subcategories.push(
                                ...category.subcategories.map((sub) => ({
                                    ...sub,
                                    categoryId: category._id,
                                    categoryName: category.name,
                                }))
                            );
                        }
                    });

                    setFilterData({
                        categories: categories.map((cat) => ({
                            _id: cat._id,
                            name: cat.name,
                            image: cat.image,
                            count: subcategories.filter((sub) => sub.categoryId === cat._id)
                                .length,
                        })),
                        subcategories: subcategories.map((sub) => ({
                            ...sub,
                            color: getCategoryColor(sub._id),
                        })),
                    });
                }
            } catch (err) {
                console.error("Error fetching filters:", err);
                setError("Failed to load filters. Please try again.");
            } finally {
                setFiltersLoading(false);
            }
        };

        fetchFilters();
    }, []);

    // Fetch products
    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await getActiveProducts();

                if (response.success) {
                    setProducts(response.data || []);

                    // Update price range based on actual product prices
                    if (response.data.length > 0) {
                        const prices = response.data
                            .map((p) => p.sellingPrice)
                            .filter(Boolean);
                        if (prices.length > 0) {
                            const minPrice = Math.min(...prices);
                            const maxPrice = Math.max(...prices);
                            setPrice([minPrice, maxPrice]);
                        }
                    }
                } else {
                    setError(response.message || "Failed to fetch products");
                }
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to fetch products. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Helper function to assign colors to categories
    const getCategoryColor = (categoryKey) => {
        const colors = [
            "bg-orange-500",
            "bg-teal-500",
            "bg-blue-500",
            "bg-amber-500",
            "bg-green-500",
            "bg-purple-500",
            "bg-pink-500",
            "bg-red-500",
            "bg-indigo-500",
            "bg-yellow-500",
        ];
        return colors[categoryKey.length % colors.length] || "bg-gray-500";
    };

    const toggleCategory = (categoryId) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );

        // If deselecting a category, also deselect its subcategories
        if (selectedCategories.includes(categoryId)) {
            const category = filterData.categories.find(
                (cat) => cat._id === categoryId
            );
            if (category) {
                const subIds = filterData.subcategories
                    .filter((sub) => sub.categoryId === categoryId)
                    .map((sub) => sub._id);

                setSelectedSubcategories((prev) =>
                    prev.filter((id) => !subIds.includes(id))
                );
            }
        }
    };

    const toggleSubcategory = (subcategoryId) => {
        setSelectedSubcategories((prev) =>
            prev.includes(subcategoryId)
                ? prev.filter((id) => id !== subcategoryId)
                : [...prev, subcategoryId]
        );
    };

    const resetFilters = () => {
        setSearch("");
        setSelectedCategories([]);
        setSelectedSubcategories([]);

        // Reset to dynamic price range if available, otherwise use default
        if (products.length > 0) {
            const prices = products.map((p) => p.sellingPrice).filter(Boolean);
            if (prices.length > 0) {
                const minPrice = Math.min(...prices);
                const maxPrice = Math.max(...prices);
                setPrice([minPrice, maxPrice]);
                return;
            }
        }
        setPrice([PRICE_MIN, PRICE_MAX]);
    };

    // Filter products based on search, selected categories, subcategories, and price range
    const filteredProducts = React.useMemo(() => {
        if (!Array.isArray(products)) return [];

        return products.filter((product) => {
            // Filter by search term
            const matchesSearch =
                !search ||
                (product.name &&
                    product.name.toLowerCase().includes(search.toLowerCase())) ||
                (product.description &&
                    product.description.toLowerCase().includes(search.toLowerCase()));

            // Filter by selected categories
            const matchesCategory =
                selectedCategories.length === 0 ||
                (product.category && selectedCategories.includes(product.category._id));

            // Filter by selected subcategories
            const matchesSubcategory =
                selectedSubcategories.length === 0 ||
                (product.subcategory &&
                    selectedSubcategories.includes(product.subcategory._id));

            // Filter by price range
            const productPrice = product.sellingPrice || 0;
            const matchesPrice = productPrice >= price[0] && productPrice <= price[1];

            return (
                matchesSearch && matchesCategory && matchesSubcategory && matchesPrice
            );
        });
    }, [products, search, selectedCategories, selectedSubcategories, price]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    // Reset to first page when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [search, selectedCategories, selectedSubcategories, price]);

    return (
        <div className="bg-[#FFF9EF]  pt-10 lg:pt-16 relative">
            <Breadcrumbs />
            <div className="absolute top-56 left-0 scale-75  ">
                <img src={moon} alt="" className="w-full h-full object-fill" />
            </div>
            <div className="absolute bottom-40 -right-10 rotate-180 scale-75">
                <img src={sun1} alt="" className="w-full h-full object-fill" />
            </div>
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
                    {/* Products Grid */}
                    <div className="lg:col-span-9 order-2 lg:order-1">
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                                {Array.from({ length: 9 }).map((_, index) => (
                                    <ProductCardSkeleton key={index} />
                                ))}
                            </div>
                        ) : error ? (
                            <div className="text-center py-10">
                                <p className="text-slate-600 text-lg mb-4">{error}</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-4 py-2 bg-linear-gradient text-white rounded-sm transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                                    {currentProducts.map((product) => (
                                        <div
                                            key={product._id || product.id}
                                            className="h-full cursor-pointer"
                                            onClick={(e) => {
                                                // Stop event propagation to prevent interference with add to cart button
                                                if (
                                                    e.target.closest("button") ||
                                                    e.target.tagName === "BUTTON"
                                                ) {
                                                    return;
                                                }
                                                navigate(`/product/${product._id}`);
                                            }}
                                        >
                                            <ProductCard product={product} />
                                        </div>
                                    ))}
                                </div>
                                {filteredProducts.length === 0 && !loading && (
                                    <div className="text-center py-10">
                                        <p className="text-gray-500 text-lg">
                                            No products found matching your filters.
                                        </p>
                                        <button
                                            onClick={resetFilters}
                                            className="mt-4 px-4 py-2 bg-slate-500 text-white rounded-sm transition-colors"
                                        >
                                            Reset Filters
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Filter Sidebar */}
                    <aside className="lg:col-span-3 order-1 lg:order-2">
                        <div className="sticky top-14">
                            <FilterSidebar
                                search={search}
                                setSearch={setSearch}
                                categories={filterData.categories}
                                subcategories={filterData.subcategories}
                                selectedCategories={selectedCategories}
                                selectedSubcategories={selectedSubcategories}
                                toggleCategory={toggleCategory}
                                toggleSubcategory={toggleSubcategory}
                                price={price}
                                setPrice={setPrice}
                                minPrice={PRICE_MIN}
                                maxPrice={PRICE_MAX}
                                resetFilters={resetFilters}
                                isLoading={filtersLoading}
                            />
                        </div>
                    </aside>
                </div>

                {/* Pagination */}
                {totalPages > 0 && (
                    <div className="flex justify-center lg:justify-start items-center space-x-2 my-8">
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
                                        className={`w-10 h-10 flex items-center justify-center text-sm font-medium ${currentPage === page
                                            ? "bg-gray-900 text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                );
                            } else if (page === currentPage - 2 || page === currentPage + 4) {
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
                            onClick={() =>
                                setCurrentPage(Math.min(totalPages, currentPage + 1))
                            }
                            disabled={currentPage === totalPages}
                            className="w-10 h-10 flex items-center justify-center text-sm font-medium
                 bg-gray-100 text-gray-600 hover:bg-gray-200
                 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;
