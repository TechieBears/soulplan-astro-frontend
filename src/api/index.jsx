import axios from "axios";
import { environment } from "../env";
import toast from "react-hot-toast";

axios.defaults.withCredentials = environment?.production;

const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem("persist:root");
    localStorage.removeItem('rememberedCredentials');
    toast.error('Your session has expired. Please login again.');
    window.location.href = '/login';
};
 
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            const errorMessage = error.response?.data?.message || error.response?.data?.error || '';

            if (errorMessage.toLowerCase().includes('token') &&
                (errorMessage.toLowerCase().includes('expired') ||
                    errorMessage.toLowerCase().includes('invalid') ||
                    errorMessage.toLowerCase().includes('unauthorized'))) {

                const token = localStorage.getItem('token');
                if (token) {
                    handleLogout();
                }
            }
        }

        return Promise.reject(error);
    }
);


// ==================== Regiter Api===================

export const registerUser = async (data) => {
    const url = `${environment.baseUrl}customer-users/register`;
    try {
        console.log('Register Data:', data);
        const response = await axios.post(url, data)
        return response.data

    }
    catch (err) {
        console.log("==========error in Register User api file", err);
        return err?.response?.data
    }
};

// ==================== get filtered actors api ====================
export const adminGetFilteredActors = async (data) => {
    try {
        const url = `${environment.baseUrl}admin/filtered-actors?role=${data?.role || ""}&email=${data?.email || ""}&page=${data?.p || 1}&limit=${data?.records || 10}`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in adminGetFilteredActors api file", err);
        return err?.response?.data
    }
}


export const loginUser = async (data) => {
    const url = `${environment.baseUrl}auth/login`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in login User api file", err);
        return err?.response?.data
    }
};
export const logoutUser = async (data) => {
    const url = `${environment.baseUrl}auth/logout`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in logout User api file", err);
        return err?.response?.data
    }
};
export const forgetUser = async (data) => {
    const url = `${environment.baseUrl}customer-users/forgot-password`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in forget User api file", err.response.data);
        return err?.response?.data
    }
};
export const resetPassword = async (data) => {
    const url = `${environment.baseUrl}customer-users/reset-password`;
    console.log('Reset password data:', data);
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in reset password api file", err);
        console.log('Reset password error response:', err?.response?.data);
        return err?.response?.data
    }
};

export const deleteUser = async () => {
    const url = `${environment.baseUrl}customer-users/delete`;
    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (err) {
        console.log("==========error in deleteUser api file", err);
        return {
            success: false,
            message: err.response?.data?.message || err.response?.data?.error || "Account deletion failed. Please try again."
        };
    }
};

// ==================== Upload to Cloudinary Api===================


export const uploadToCloudinary = async (file) => {
    const cloudName = 'soulplan';
    const apiKey = import.meta.env.VITE_CLOUDINARY_KEY;
    const uploadPreset = 'ml_default';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('api_key', apiKey);

    if (environment?.production) {
        formData.append('folder', 'prod_uploads');
    } else {
        formData.append('folder', 'dev_uploads');
    }

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Upload failed');
        }

        const data = await response.json();

        if (!data.secure_url) {
            console.warn('Upload succeeded but no secure_url:', data);
            throw new Error('Upload succeeded but no URL returned');
        }

        return data.secure_url;
    } catch (err) {
        console.error('Upload failed:', err);
        throw err; // Re-throw to let calling code handle it
    }
};

export const adminTransactionPagination = async (data) => {
    const url = `${environment.baseUrl}admin/transaction-pagination?status=${data?.status}&email=${data?.email}&orderId=${data?.orderId}&page=${data?.p || 1}&limit=${data?.records || 10}`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in adminTransactionPagination api file", err);
        return err?.response?.data
    }
}
// ====================== Product Categories Api ======================
export const getProductCategories = async (data) => {
    try {
        const url = `${environment.baseUrl}product-categories/get-all?name=${data?.name || ""}&page=${data?.p}&limit=${data?.records}`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
        return err?.response?.data
    }
}
export const getProductCategoriesDropdown = async () => {
    try {
        const url = `${environment.baseUrl}product-categories/dropdown`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
        return err?.response?.data
    }
}

export const addProductCategory = async (data) => {
    const url = `${environment.baseUrl}product-categories/create`;
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }
    try {
        const response = await axios.post(url, formData)
        return response.data
    }
    catch (err) {
        console.log("==========error in addProductCategory api file", err);
        return err?.response?.data
    }
};

export const editProductCategory = async (id, data) => {
    const url = `${environment.baseUrl}product-categories/update?id=${id}`;
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }
    try {
        const response = await axios.put(url, formData)
        return response.data
    }
    catch (err) {
        console.log("==========error in editProductCategory api file", err);
        return err?.response?.data
    }
};



// ======================= Product Sub Categories Api ======================
export const getProductSubCategories = async (data) => {
    try {
        const url = `${environment.baseUrl}product-subcategories/get-all?name=${data?.name || ""}&page=${data?.p}&limit=${data?.records}`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
        return err?.response?.data
    }
}
export const getProductSubCategoriesByCategory = async (id) => {
    try {
        const url = `${environment.baseUrl}product-subcategories/get-by-category?id=${id || ''}`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in getProductSubCategoriesSingle api file", err);
        return err?.response?.data
    }
}

export const getProductSubCategoriesDropdown = async () => {
    try {
        const url = `${environment.baseUrl}product-subcategories/get-dropdown`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in getProductSubCategoriesDropdown api file", err);
        return err?.response?.data
    }
}

export const addProductSubCategory = async (data) => {
    const url = `${environment.baseUrl}product-subcategories/create`;
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }
    try {
        const response = await axios.post(url, formData)
        return response.data
    }
    catch (err) {
        console.log("==========error in addProductSubCategory api file", err);
        return err?.response?.data
    }
}

export const editProductSubCategory = async (id, data) => {
    const url = `${environment.baseUrl}product-subcategories/update?id=${id}`;
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }
    try {
        const response = await axios.put(url, formData)
        return response.data
    }
    catch (err) {
        console.log("==========error in editProductSubCategory api file", err);
        return err?.response?.data
    }
}

export const deleteProductSubCategory = async (id) => {
    const url = `${environment.baseUrl}product-subcategories/delete?id=${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in deleteProductSubCategory api file", err);
        return err?.response?.data
    }
}

// ====================== Service Categories Api ======================
export const getServiceCategories = async (data) => {
    try {
        const url = `${environment.baseUrl}service-categories/get-all?name=${data?.name || ""}&page=${data?.p}&limit=${data?.records}`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
        return err?.response?.data
    }
}
export const getServiceCategoriesDropdown = async () => {
    try {
        const url = `${environment.baseUrl}service-categories/dropdown`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
        return err?.response?.data
    }
}
export const getActiveServiceCategories = async () => {
    try {
        const url = `${environment.baseUrl}service-categories/public/active`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
        return err?.response?.data
    }
}

export const addServiceCategory = async (data) => {
    const url = `${environment.baseUrl}service-categories/create`;
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }
    try {
        const response = await axios.post(url, formData)
        return response.data
    }
    catch (err) {
        console.log("==========error in addServiceCategory api file", err);
        return err?.response?.data
    }
};

export const editServiceCategory = async (id, data) => {
    const url = `${environment.baseUrl}service-categories/update?id=${id}`;
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }
    try {
        const response = await axios.put(url, formData)
        return response.data
    }
    catch (err) {
        console.log("==========error in editServiceCategory api file", err);
        return err?.response?.data
    }
};

// ======================= Service Api ======================
export const getServices = async (data) => {
    try {
        const url = `${environment.baseUrl}service/get-all?name=${data?.name || ''}&categoryId=${data?.categoryId || ''}&page=${data?.p}&limit=${data?.records}`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in getServices api file", err);
        return err?.response?.data
    }
}
export const getPublicServices = async (data) => {
    try {
        const url = `${environment.baseUrl}service/public/get-all?page=${data?.p || 1}&limit=${data?.records || 10}&search=${data?.search || ''}&category=${data?.category || ''}`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in getServices api file", err);
        return err?.response?.data
    }
}
export const getPublicServicesCards = async (data) => {
    try {
        const url = `${environment.baseUrl}service/soulplane/public/get-all?page=${data?.p || 1}&limit=${data?.records || 10}`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in getPublicServicesCards api file", err);
        return err?.response?.data
    }
}

export const getAllAstrologer = async (data = { employeeType: "astrologer" }) => {
    const url = `${environment.baseUrl}employee-users/astroguid/public/get-all`;
    try {
        // Send data in the request payload using POST
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.error('Error fetching get all astrologer:', error);
        throw error;
    }
};

export const getPublicServicesDropdown = async () => {
    try {
        const url = `${environment.baseUrl}service/public/dropdown`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in get Public Services Dropdown api file", err);
        return err?.response?.data
    }
}
export const getPublicServicesSingle = async (data) => {
    try {
        const url = `${environment.baseUrl}service/public/get-single?id=${data?.id || ''}`;
        console.log("⚡️🤯 ~ index.jsx:659 ~ getPublicServicesSingle ~ url:", url)
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in getPublicServicesSingle api file", err);
        return err?.response?.data
    }
}

export const addService = async (data) => {
    const url = `${environment.baseUrl}service/create`;
    const formData = new FormData();
    for (const key in data) {
        if (key === 'videoUrl' && Array.isArray(data[key])) {
            formData.append(key, JSON.stringify(data[key]));
        } else {
            formData.append(key, data[key]);
        }
    }
    try {
        const response = await axios.post(url, formData)
        return response.data
    }
    catch (err) {
        console.log("==========error in addService api file", err);
        return err?.response?.data
    }
}

export const editService = async (id, data) => {
    const url = `${environment.baseUrl}service/update?id=${id}`;
    const formData = new FormData();
    for (const key in data) {
        if (key === 'videoUrl' && Array.isArray(data[key])) {
            formData.append(key, JSON.stringify(data[key]));
        } else {
            formData.append(key, data[key]);
        }
    }
    try {
        const response = await axios.put(url, formData)
        return response.data
    }
    catch (err) {
        console.log("==========error in editService api file", err);
        return err?.response?.data
    }
}


// ======================= Products Api ======================

export const getPublicProducts = async (data) => {
    try {
        const url = `${environment.baseUrl}service/public/get-all?page=${data?.p || 1}&limit=${data?.records || 10}&search=${data?.search || ''}&category=${data?.category || ''}&subcategory=${data?.subcategory || ''}&minPrice=${data?.minPrice || ''}&maxPrice=${data?.maxPrice || ''}&inStock=${data?.inStock || ''}`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in getPublicProducts api file", err);
        return err?.response?.data
    }
}
export const getActiveProducts = async () => {
    const url = `${environment.baseUrl}product/public/active`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching active products:', error);
        throw error;
    }
};

export const getPublicProductsSingle = async (id) => {
    try {
        const url = `${environment.baseUrl}product/public/active-single?id=${id}`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in getPublicProductsSingle api file", err);
        return err?.response?.data
    }
}

export const getPublicProductsFilter = async () => {
    try {
        const url = `${environment.baseUrl}product/public/filter`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in getPublicProductsFilter api file", err);
        return err?.response?.data
    }
}

export const getProducts = async (data) => {
    try {
        const url = `${environment.baseUrl}product/get-all?name=${data?.name || ''}&categoryId=${data?.categoryId || ''}&page=${data?.p}&limit=${data?.records}`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in getProducts api file", err);
        return err?.response?.data
    }
}

export const getProductsDropdown = async () => {
    try {
        const url = `${environment.baseUrl}product/get-dropdown`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in getProductsDropdown api file", err);
        return err?.response?.data
    }
}

export const addProduct = async (data) => {
    const url = `${environment.baseUrl}product/create`;
    const formData = new FormData();
    for (const key in data) {
        if (key === 'images' && Array.isArray(data[key])) {
            data[key].forEach((file) => formData.append('images', file));
        } else if (key === 'specification' && Array.isArray(data[key])) {
            formData.append(key, JSON.stringify(data[key]));
        } else {
            formData.append(key, data[key]);
        }
    }

    try {
        const response = await axios.post(url, formData)
        return response.data
    }
    catch (err) {
        console.log("==========error in addProduct api file", err);
        return err?.response?.data
    }
}

export const editProduct = async (id, data) => {
    const url = `${environment.baseUrl}product/update?id=${id}`;
    const formData = new FormData();
    for (const key in data) {
        if (key === 'images' && Array.isArray(data[key])) {
            data[key].forEach((file) => formData.append('images', file));
        } else if (key === 'specification' && Array.isArray(data[key])) {
            formData.append(key, JSON.stringify(data[key]));
        } else if (key === 'deletedImages' && Array.isArray(data[key])) {
            data[key].forEach((img) => formData.append('deletedImages', img));
        } else {
            formData.append(key, data[key]);
        }
    }
    try {
        const response = await axios.put(url, formData)
        return response.data
    }
    catch (err) {
        console.log("==========error in editProduct api file", err);
        return err?.response?.data
    }
}

export const deleteProduct = async (id) => {
    const url = `${environment.baseUrl}product/delete?id=${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in deleteProduct api file", err);
        return err?.response?.data
    }
}

// ==================== Employee Api ====================

export const getAllEmployees = async (data) => {
    try {
        const url = `${environment.baseUrl}employee-users/get-all?name=${data?.name || ''}&page=${data?.p}&limit=${data?.records}`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in getAllEmployees api file", err);
        return err?.response?.data
    }
}

export const addEmployee = async (data) => {
    const url = `${environment.baseUrl}employee-users/register`;
    const formData = new FormData();
    for (const key in data) {
        if (Array.isArray(data[key])) {
            // Handle arrays - stringify arrays of objects, append arrays of primitives individually
            if (data[key].length > 0 && typeof data[key][0] === 'object') {
                formData.append(key, JSON.stringify(data[key]));
            } else {
                data[key].forEach((item) => {
                    formData.append(key, item);
                });
            }
        } else {
            formData.append(key, data[key]);
        }
    }
    try {
        const response = await axios.post(url, formData)
        return response.data
    }
    catch (err) {
        console.log("==========error in addEmployee api file", err);
        return err?.response?.data
    }
}

export const editEmployee = async (id, data) => {
    const url = `${environment.baseUrl}employee-users/update?id=${id}`;
    const formData = new FormData();
    for (const key in data) {
        if (Array.isArray(data[key])) {
            // Handle arrays - stringify arrays of objects, append arrays of primitives individually
            if (data[key].length > 0 && typeof data[key][0] === 'object') {
                formData.append(key, JSON.stringify(data[key]));
            } else {
                data[key].forEach((item) => {
                    formData.append(key, item);
                });
            }
        } else {
            formData.append(key, data[key]);
        }
    }
    try {
        const response = await axios.put(url, formData)
        return response.data
    }
    catch (err) {
        console.log("==========error in editEmployee api file", err);
        return err?.response?.data
    }
}

// ==================== Customer Api ====================

export const getAllCustomers = async (data) => {
    try {
        const url = `${environment.baseUrl}customer-users/get-all?name=${data?.name || ""}&page=${data?.p}&limit=${data?.records}`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in getAllCustomers api file", err);
        return err?.response?.data
    }
}

export const editUserCustomer = async (data) => {
    const url = `${environment.baseUrl}customer-users/update`;
    const formData = new FormData();
    for (const key in data) {
        if (Array.isArray(data[key])) {
            // Handle arrays - stringify arrays of objects, append arrays of primitives individually
            if (data[key].length > 0 && typeof data[key][0] === 'object') {
                formData.append(key, JSON.stringify(data[key]));
            } else {
                data[key].forEach((item) => {
                    formData.append(key, item);
                });
            }
        } else {
            formData.append(key, data[key]);
        }
    }
    try {
        const response = await axios.put(url, formData)
        return response.data
    }
    catch (err) {
        console.log("==========error in edit Customer api file", err);
        return err?.response?.data
    }
}

export const editCustomer = async (id, data) => {
    const url = `${environment.baseUrl}customer-users/admin-update?id=${id}`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in edit Customer api file", err);
        return err?.response?.data
    }
}


// ================== Banner Api ==================

export const getAllBanners = async (data) => {
    try {
        const url = `${environment.baseUrl}banners/get-all?name=${data?.name || ""}&page=${data?.p}&limit=${data?.records}`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in getAllBanners api file", err);
        return err?.response?.data
    }
}


export const addBanner = async (data) => {
    const url = `${environment.baseUrl}banners/create`;
    const formData = new FormData();
    for (const key in data) {
        if (Array.isArray(data[key])) {
            // Handle arrays - stringify arrays of objects, append arrays of primitives individually
            if (data[key].length > 0 && typeof data[key][0] === 'object') {
                formData.append(key, JSON.stringify(data[key]));
            } else {
                data[key].forEach((item) => {
                    formData.append(key, item);
                });
            }
        } else {
            formData.append(key, data[key]);
        }
    }
    try {
        const response = await axios.post(url, formData)
        return response.data
    }
    catch (err) {
        console.log("==========error in addBanner api file", err);
        return err?.response?.data
    }
}

export const editBanner = async (id, data) => {
    const url = `${environment.baseUrl}banners/update?id=${id}`;
    const formData = new FormData();
    for (const key in data) {
        if (Array.isArray(data[key])) {
            // Handle arrays - stringify arrays of objects, append arrays of primitives individually
            if (data[key].length > 0 && typeof data[key][0] === 'object') {
                formData.append(key, JSON.stringify(data[key]));
            } else {
                data[key].forEach((item) => {
                    formData.append(key, item);
                });
            }
        } else {
            formData.append(key, data[key]);
        }
    }
    try {
        const response = await axios.put(url, formData)
        return response.data
    }
    catch (err) {
        console.log("==========error in editBanner api file", err);
        return err?.response?.data
    }
}

export const deleteBanner = async (id) => {
    const url = `${environment.baseUrl}banners/delete?id=${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in deleteBanner api file", err);
        return err?.response?.data
    }
}


// ==================== Website APi Binding ====================


// ==================== Authendication Api===================
// export const registerUser = async (data) => {
//     const url = `${environment.baseUrl}customer-users/register`;
//     try {
//         console.log('Register Data:', data);
//         const response = await axios.post(url, data)
//         return response.data

//     }
//     catch (err) {
//         console.log("==========error in Register User api file", err);
//         return err?.response?.data
//     }
// };

// export const loginUser = async (data) => {
//     const url = `${environment.baseUrl}auth/login`;
//     console.log('Login URL:', url);
//     console.log('Login Data:', data);
//     try {
//         const response = await axios.post(url, data)
//         return response.data
//     }
//     catch (err) {
//         console.log("==========error in login User api file", err);
//         console.log('Error response:', err?.response?.data);
//         return err?.response?.data
//     }
// };

// export const forgetUser = async (data) => {
//     const url = `${environment.baseUrl}customer-users/forgot-password`;
//     try {
//         const response = await axios.post(url, data)
//         return response.data
//     }
//     catch (err) {
//         console.log("==========error in forget User api file", err.response.data);
//         return err?.response?.data
//     }
// };
// export const resetPassword = async (data) => {
//     const url = `${environment.baseUrl}customer-users/reset-password`;
//     console.log('Reset password data:', data);
//     try {
//         const response = await axios.post(url, data)
//         return response.data
//     }
//     catch (err) {
//         console.log("==========error in reset password api file", err);
//         console.log('Reset password error response:', err?.response?.data);
//         return err?.response?.data
//     }
// };


// ==================== Website APi Binding ====================


// ==================== Authendication Api===================
// export const registerUser = async (data) => {
//     const url = `${environment.baseUrl}/api/customer-users/register`;
//     try {
//         console.log('Register Data:', data);
//         const response = await axios.post(url, data)
//         return response.data

//     }
//     catch (err) {
//         console.log("==========error in Register User api file", err);
//         return err?.response?.data
//     }
// };

// export const loginUser = async (data) => {
//     const url = `${environment.baseUrl}/api/auth/login`;
//     console.log('Login URL:', url);
//     console.log('Login Data:', data);
//     try {
//         const response = await axios.post(url, data)
//         return response.data
//     }
//     catch (err) {
//         console.log("==========error in login User api file", err);
//         console.log('Error response:', err?.response?.data);
//         return err?.response?.data
//     }
// };

// export const forgetUser = async (data) => {
//     const url = `${environment.baseUrl}/api/customer-users/forgot-password`;
//     try {
//         const response = await axios.post(url, data)
//         return response.data
//     }
//     catch (err) {
//         console.log("==========error in forget User api file", err.response.data);
//         return err?.response?.data
//     }
// };
// export const resetPassword = async (data) => {
//     const url = `${environment.baseUrl}/api/customer-users/reset-password`;
//     console.log('Reset password data:', data);
//     try {
//         const response = await axios.post(url, data)
//         return response.data
//     }
//     catch (err) {
//         console.log("==========error in reset password api file", err);
//         console.log('Reset password error response:', err?.response?.data);
//         return err?.response?.data
//     }
// };

// ====================CUstomer(User) Banner  Api===================
export const getActiveBanners = async (type = "website") => {
    try {
        const res = await axios.get(`${environment.baseUrl}banners/active?type=${type}`);
        return res.data?.data || [];
    } catch (err) {
        console.error("Error fetching banners:", err);
        return [];
    }
};

// =========================== Product Cart Api ====================

export const addProductToCart = async (data) => {
    const url = `${environment.baseUrl}product-cart/public/add`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in addProductToCart api file", err);
        return err?.response?.data
    }
}

export const getProductFromCart = async (data) => {
    const url = `${environment.baseUrl}product-cart/public/get`;
    try {
        const response = await axios.get(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in getProductFromCart api file", err);
        return err?.response?.data
    }
}

export const removeProductFromCart = async (data) => {
    const url = `${environment.baseUrl}product-cart/public/remove-item`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in removeProductFromCart api file", err);
        return err?.response?.data
    }
}

export const updateProductInCart = async (data) => {
    const url = `${environment.baseUrl}product-cart/public/update`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in updateProductInCart api file", err);
        return err?.response?.data
    }
}

export const clearCart = async () => {
    const url = `${environment.baseUrl}product-cart/public/clear`;
    try {
        const response = await axios.delete(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in clearCart api file", err);
        return err?.response?.data
    }
}

// ========================= Service Cart Api ========================

export const addServiceToCart = async (data) => {
    const url = `${environment.baseUrl}service-cart/public/add`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in addServiceToCart api file", err);
        return err?.response?.data
    }
}

export const getServiceFromCart = async () => {
    const url = `${environment.baseUrl}service-cart/public/get`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in getServiceFromCart api file", err);
        return err?.response?.data
    }
}

export const removeServiceFromCart = async (data) => {
    const url = `${environment.baseUrl}service-cart/public/remove-item`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in removeServiceFromCart api file", err);
        return err?.response?.data
    }
}


// ================== Customer Feedback Api ==================

export const getAllFeedback = async (data) => {
    try {
        const url = `${environment.baseUrl}feedback/get-all?search=${data?.name || ''}&page=${data?.p}&limit=${data?.records}`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in getAllFeedback api file", err);
        return err?.response?.data
    }
}


export const addFeedback = async (data) => {
    const url = `${environment.baseUrl}feedback/create`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in addFeedback api file", err);
        return err?.response?.data
    }
}

export const respondFeedback = async (data) => {
    const url = `${environment.baseUrl}feedback/respond`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in respondFeedback api file", err);
        return err?.response?.data
    }
}

export const deleteFeedback = async (id) => {
    const url = `${environment.baseUrl}/feedback/delete?id=${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in deleteFeedback api file", err);
        return err?.response?.data
    }
}
// ========================= Address Api ========================

export const getAllAddress = async () => {
    const url = `${environment.baseUrl}customer-address/get-all`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in getAllAddress api file", err);
        return err?.response?.data
    }
}

export const addAddress = async (data) => {
    const url = `${environment.baseUrl}customer-address/create`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in addAddress api file", err);
        return err?.response?.data
    }
}

export const editAddress = async (id, data) => {
    const url = `${environment.baseUrl}customer-address/update?id=${id}`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in editAddress api file", err);
        return err?.response?.data
    }
}

export const deleteAddress = async (id) => {
    const url = `${environment.baseUrl}customer-address/delete?id=${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in deleteAddress api file", err);
        return err?.response?.data
    }
}


// =========================== admin product order api ====================

export const getAllProductOrders = async (data) => {
    console.log('data', data)
    try {
        const url = `${environment.baseUrl}product-order/get-all?orderId=${data?.orderId || ""}&date=${data?.date || ""}&status=${data?.status || ""}&page=${data?.p}&limit=${data?.records}`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in getAllProductOrders api file", err);
        return err?.response?.data
    }
}

export const updateProductOrder = async (data) => {
    try {
        const url = `${environment.baseUrl}product-order/update-order-status`;
        console.log("⚡️🤯 ~ index.jsx:1230 ~ getPublicServicesSingle ~ url:", url)
        const response = await axios.post(url, data);
        return response.data;
    }
    catch (err) {
        console.log("==========error in updateProductOrderStatus api file", err);
        return err?.response?.data;
    }
}
// ======================= calendar api =======================

export const checkAvailability = async (data) => {
    try {
        const url = `${environment.baseUrl}calender/check-availability`;
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in checkAvailability api file", err);
        return err?.response?.data
    }
}


// ===================== Service Order Api =====================

export const createServiceOrder = async (orderData) => {
    const url = `${environment.baseUrl}service-order/public/create`;
    try {
        const response = await axios.post(url, orderData);
        return response.data;
    } catch (err) {
        return err?.response?.data || { success: false, message: 'Failed to create service order' };
    }
};

export const getServiceBookingsConfirmed = async (data) => {
    const url = `${environment.baseUrl}service-order/public/get-all`;
    try {
        const response = await axios.get(url, data)
        return response.data;
    }
    catch (err) {
        console.log("==========error in getServiceBookingsConfirmed api file", err);
        return err?.response?.data;
    }
}


// ===================== Product Booking Api =====================

export const PlaceProductOrder = async (data) => {
    const url = `${environment.baseUrl}product-order/public/create`;
    try {
        const response = await axios.post(url, data)
        return response.data;
    }
    catch (err) {
        console.log("==========error in bookProduct api file", err);
        return err?.response?.data;
    }
}

export const getProductBookingsConfirmed = async (data) => {
    const url = `${environment.baseUrl}product-order/public/get-all`;
    try {
        const response = await axios.get(url, data)
        console.log("⚡️🤯 ~ index.jsx:1373 ~ getProductBookingsConfirmed ~ response:", response)
        return response.data;
    }
    catch (err) {
        console.log("==========error in getProductBookingsConfirmed api file", err);
        return err?.response?.data;
    }
}


// =========================== admin service order api ====================

export const getAllServiceOrdersAdmin = async (data) => {
    try {
        const url = `${environment.baseUrl}service-order/get-all?orderId=${data?.orderId || ""}&date=${data?.date || ""}&status=${data?.status || ""}&page=${data?.p}&limit=${data?.records}&astrologerId=${data?.astrologerId || ""}`;
        const response = await axios.get(url)
        console.log("⚡️🤯 ~ index.jsx:1407 ~ getAllServiceOrdersAdmin ~ response:", response)
        return response.data
    }
    catch (err) {
        console.log("==========error in getAllServiceOrdersAdmin api file", err);
        return err?.response?.data
    }
}

// ==================== Get All Service Orders Api ====================
export const getAllServiceOrders = async () => {
    const url = `${environment.baseUrl}service-order/public/get-all`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        console.error('Error fetching service orders:', err);
        return err?.response?.data || { success: false, message: 'Failed to fetch service orders' };
    }
};

export const checkAvailabilityById = async (id) => {
    try {
        const url = `${environment.baseUrl}service-order/item/get-single?id=${id || ""}`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in checkAvailability api file", err);
        return err?.response?.data
    }
}


export const updateServiceOrderStatus = async (data) => {
    const url = `${environment.baseUrl}service-order/astrologer/update-order-status`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in updateAvailability api file", err);
        return err?.response?.data
    }
}

export const adminSlots = async (date) => {
    const url = `${environment.baseUrl}calender/admin-slots?date=${date}`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in logout User api file", err);
        return err?.response?.data
    }
};

// =========================== admin product order api ====================

export const getAdminAllTestimonials = async (data) => {
    try {
        const url = `${environment.baseUrl}testimonials/get-all?name=${data?.name || ""}&page=${data?.p}&limit=${data?.records}`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in getAdminAllTestimonials api file", err);
        return err?.response?.data
    }
}
export const editTestimonials = async (id, data) => {
    const url = `${environment.baseUrl}testimonials/update?id=${id}`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in editTestimonials api file", err);
        return err?.response?.data
    }
}

export const adminBlockSlots = async (data) => {
    const url = `${environment.baseUrl}calender/admin-block-slots`;
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (err) {
        console.log("==========error in adminBlockSlots api file", err);
        return err?.response?.data;
    }
};

export const astrologerSlots = async (sdate, edate, astrologerId) => {
    const url = `${environment.baseUrl}calender/astrologer-slots?sdate=${sdate}&edate=${edate}&astrologerId=${astrologerId}`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in logout User api file", err);
        return err?.response?.data
    }
};

export const getSingleServiceOrder = async (orderId) => {
    const url = `${environment.baseUrl}service-order/public/item/get-single?id=${orderId}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        console.error('Error fetching single service order:', err);
        return err?.response?.data || { success: false, message: 'Failed to fetch service order details' };
    }
};

export const getAllTestimonials = async (page, limit, name) => {
    const url = `${environment.baseUrl}testimonials/public/get-all?page=${page || 1}&limit=${limit || 10}&name=${name || ''}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        console.error('Error fetching testimonials:', err);
        return err?.response?.data || { success: false, message: 'Failed to fetch testimonials' };
    }
};

export const createTestimonial = async (testimonialData) => {
    const url = `${environment.baseUrl}testimonials/create`;
    try {
        const response = await axios.post(url, testimonialData);
        return response.data;
    } catch (err) {
        console.error('Error creating testimonial:', err);
        return err?.response?.data || { success: false, message: 'Failed to create testimonial' };
    }
};

export const getSingleProductOrder = async (orderId) => {
    const url = `${environment.baseUrl}product-order/public/get-single?id=${orderId}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        console.error('Error fetching single product order:', err);
        return err?.response?.data || { success: false, message: 'Failed to fetch product order details' };
    }
};



// ================== Coupon API ==================

export const getAllPublicCoupons = async (type, couponCode) => {
    try {
        const url = `${environment.baseUrl}coupon/public/get-all?couponType=${type || ""}&search=${couponCode || ""}`;
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        console.log("==========error in getAllPublicCoupons api file", err);
        return err?.response?.data;
    }
};

export const getAllCoupons = async (data) => {
    try {
        const url = `${environment.baseUrl}coupon/get-all?name=${data?.name || ""}&page=${data?.p}&limit=${data?.records}`;
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        console.log("==========error in getAllCoupons api file", err);
        return err?.response?.data;
    }
};

export const addCoupon = async (data) => {
    const url = `${environment.baseUrl}coupon/create`;
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (err) {
        console.log("==========error in addCoupon api file", err);
        return err?.response?.data;
    }
};

export const editCoupon = async (id, data) => {
    const url = `${environment.baseUrl}coupon/update?id=${id}`;
    try {
        const response = await axios.put(url, data);
        return response.data;
    } catch (err) {
        console.log("==========error in editCoupon api file", err);
        return err?.response?.data;
    }
};

export const deleteCoupon = async (id) => {
    const url = `${environment.baseUrl}coupon/delete?id=${id}`;
    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (err) {
        console.log("==========error in deleteCoupon api file", err);
        return err?.response?.data;
    }
};

// ======================= Testimonials Api ========================

export const getAllPublicTestimonials = async (data) => {
    const url = `${environment.baseUrl}testimonials/public/get-all?page=${data?.p || 1}&limit=${data?.records || 10}&name=${data?.name || ''}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        console.log("==========error in getAllPublicTestimonials api file", err);
        return err?.response?.data;
    }
};


export const createPublicTestimonial = async (data) => {
    const url = `${environment.baseUrl}testimonials/public/create`;
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (err) {
        console.log("==========error in createPublicTestimonial api file", err);
        return err?.response?.data;
    }
};


// =======================Admin User Profile Api ========================

export const updateAdminUserProfile = async (id, data) => {
    const url = `${environment.baseUrl}admin-users/update?id=${id}`;
    try {
        const response = await axios.put(url, data);
        return response.data;
    } catch (err) {
        console.log("==========error in updateAdminUserProfile api file", err);
        return err?.response?.data;
    }
};


// ======================== Rating Api ========================

export const getAdminAllReviews = async (data) => {
    try {
        const url = `${environment.baseUrl}reviews/get-all?name=${data?.name || ""}&page=${data?.p}&limit=${data?.records}`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in getAdminAllReviews api file", err);
        return err?.response?.data
    }
}
export const editReviews = async (id, data) => {
    const url = `${environment.baseUrl}reviews/update?id=${id}`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in editReviews api file", err);
        return err?.response?.data
    }
}

export const deleteReview = async (id) => {
    const url = `${environment.baseUrl}reviews/delete?id=${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in deleteReview api file", err);
        return err?.response?.data
    }
}

export const getRatings = async (data) => {
    const url = `${environment.baseUrl}reviews/filter?user=${data?.user || ""}&product=${data?.product || ""}&service=${data?.service || ""}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        console.log("==========error in getRatings api file", err);
        return err?.response?.data;
    }
};

export const addRating = async (data) => {
    const url = `${environment.baseUrl}reviews/create`;
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (err) {
        console.log("==========error in addRating api file", err);
        return err?.response?.data;
    }
};

export const editRating = async (id, data) => {
    const url = `${environment.baseUrl}reviews/update?id=${id}`;
    try {
        const response = await axios.put(url, data);
        return response.data;
    } catch (err) {
        console.log("==========error in editRating api file", err);
        return err?.response?.data;
    }
};


// =================== Refer & Earn Api ==================

export const getWalletBalance = async () => {
    const url = `${environment.baseUrl}customer-users/get-wallet-balance`;
    try {
        const response = await axios.get(url);
        return response.data
    }
    catch (err) {
        console.log("==========error in getWalletBalance api file", err);
        return err?.response?.data
    }
}


// ===================== Customer Notification Api =====================

export const getAllNotifications = async (data) => {
    try {
        const url = `${environment.baseUrl}notification/get-all?page=${data?.p || 1}&limit=${data?.records || 10}&status=${data?.status || 'active'}&userType=${data?.userType || 'all-customers'}&from=${data?.from || 'admin'}`;
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        console.log("==========error in getAllNotifications api file", err);
        return err?.response?.data;
    }
}
export const getNotificationsDropdown = async () => {
    try {
        const url = `${environment.baseUrl}notification/dropdown-dashboard`;
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        console.log("==========error in getNotificationsDropdown api file", err);
        return err?.response?.data;
    }
}
export const getNotificationsDropdownCustomer = async () => {
    try {
        const url = `${environment.baseUrl}notifications/dropdown-customer`;
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        console.log("==========error in getNotificationsDropdownCustomer api file", err);
        return err?.response?.data;
    }
}

export const clearAllNotifications = async () => {
    try {
        const url = `${environment.baseUrl}notification/remove-all`;
        const response = await axios.delete(url);
        return response.data;
    } catch (err) {
        console.log("==========error in clearAllNotifications api file", err);
        return err?.response?.data;
    }
}

export const addNotification = async (data) => {
    const url = `${environment.baseUrl}notification/create`;
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (err) {
        console.log("==========error in addNotification api file", err);
        return err?.response?.data;
    }
};


export const getCustomerUsersDropdown = async () => {
    try {
        const url = `${environment.baseUrl}customer-users/dropdown`;
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        console.log("==========error in getCustomerUsersDropdown api file", err);
        return err?.response?.data;
    }
}

// ========================== dashboard insights api ========================

export const getDashboardInsights = async () => {
    try {
        const url = `${environment.baseUrl}dashboard/get-dashboard-data`;
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        console.log("==========error in getDashboardData api file", err);
        return err?.response?.data;
    }
}
