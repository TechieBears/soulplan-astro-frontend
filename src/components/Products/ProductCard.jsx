import { useNavigate } from "react-router-dom";
import { ShoppingCartIcon } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setCartProductCount } from "../../redux/Slices/cartSlice";
import { addProductToCart } from "../../api";
import { useState } from "react";
import { MoonLoader } from "react-spinners";

const Star = ({ filled }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={`w-4 h-4 ${filled ? "text-amber-400" : "text-gray-300"}`}
        fill="currentColor"
    >
        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.4 8.164L12 18.896l-7.334 3.864 1.4-8.164L.132 9.21l8.2-1.192L12 .587z" />
    </svg>
);

const ProductCard = ({ product }) => {
    const { _id, name, sellingPrice, mrpPrice, discountPercentage, images } = product;
    const navigate = useNavigate();
    const login = useSelector((state) => state.user.isLogged);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleCardClick = () => {
        navigate(`/product/${_id}`);
    };

    const handleAddToCart = async (productId) => {
        if (!login) {
            navigate("/login");
            return;
        }
        try {
            setLoading(true);
            const res = await addProductToCart({ productId, quantity: 1 });
            console.log("==========res in handleAddToCart", res);
            if (res?.success) {
                dispatch(setCartProductCount(res?.data?.items?.length));
                toast.success(res?.message || "Product added to cart");
            } else {
                toast.error(res?.message || "Something went wrong");
            }
        } catch (err) {
            console.log("==========err in handleAddToCart", err);
            toast.error(err?.message || "Something went wrong");
        }
        finally {
            setLoading(false);
        }
    };
    return (
        <div
            className="h-full flex flex-col bg-white p-3 rounded-lg shadow-lg  hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
        >
            <div className="relative w-full max-w-sm mx-auto aspect-square rounded-lg overflow-hidden" style={{ background: `linear-gradient(90deg, rgba(0, 121, 208, 0.2) -12.5%, rgba(158, 82, 216, 0.2) 30.84%, rgba(218, 54, 92, 0.2) 70.03%, rgba(208, 73, 1, 0.2) 111%)` }} onClick={handleCardClick}>
                <img
                    src={images?.[0]}
                    alt={name}
                    className="w-full h-full object-contain p-4 "
                    loading="lazy"
                />
                {discountPercentage > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {discountPercentage}% OFF
                    </div>
                )}
            </div>

            <div className="pt-4 flex flex-col flex-grow" onClick={handleCardClick}>
                <div className="flex flex-grow justify-between items-start">
                    {/* Left side - Title & Rating */}

                    <div className="flex flex-col w-full">
                        <h3 className="text-base md:text-sm lg:text-base text-left font-normal font-tbLex tracking-tight text-slate-800 line-clamp-2 mb-1 sm:mb-2 text-ellipsis overflow-hidde text-nowrap w-[150px] xl:w-52">
                            {name}
                        </h3>

                        <div className="flex items-center gap-1 mb-2 sm:mb-3">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} filled={i <= 4} />
                            ))}
                        </div>
                    </div>

                    {/* Right side - Price */}
                    <div className="flex flex-col items-end space-y-0.5">
                        {mrpPrice > sellingPrice && (
                            <h4 className="text-base md:text-sm lg:text-base text-slate-500 font-tbPop  line-through">
                                ₹{mrpPrice?.toLocaleString()}
                            </h4>
                        )}

                        <div className="text-base md:text-sm lg:text-base font-semibold font-tbPop text-gray-800">
                            ₹{sellingPrice?.toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>
            <div className="gradientBtn w-full">
                <button
                    className={`w-full`}
                    onClick={() => handleAddToCart(_id)}
                    disabled={loading}
                >
                    <span className="text-base xl:text-lg font-tbPop text-p">{loading ? "Processing..." : "Add to Cart"}</span>
                </button>
            </div>
        </div>
    );
};

export default ProductCard
