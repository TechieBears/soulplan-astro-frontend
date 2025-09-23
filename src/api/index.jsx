import axios from "axios";
import { environment } from "../env";

axios.defaults.withCredentials = environment?.production;


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

export const registerUserEdit = async (id, data) => {
    try {
        const url = `${environment.baseUrl}user/add-user/${id}`
        const response = await axios.put(url, data)
        return response.data
    } catch (err) {
        console.log('error black listing user api file', err)
        return err?.response?.data
    }
}


export const login = async (data) => {
    const url = `${environment.baseUrl}admin-login`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
        return err?.response?.data
    }
};

// ====================Get All User Api===================
export const getAllUser = async (data) => {
    try {
        const url = `${environment.baseUrl}admin/get-all-user`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
        return err?.response?.data
    }
}

// ====================== BlackList User =====================
export const blacklistUser = async (id, status) => {
    try {
        const url = `${environment.baseUrl}admin/blacklist-user?id=${id}`
        const response = await axios.put(url, status)
        return response.data
    } catch (err) {
        console.log('error black listing user api file', err)
        return err?.response?.data

    }
}

export const premiumUser = async (id, status) => {
    try {
        const url = `${environment.baseUrl}admin/premium-user?id=${id}`
        const response = await axios.put(url, status)
        return response.data
    } catch (err) {
        console.log('error premium user api file', err)
        return err?.response?.data
    }
}

// ====================== Block User =====================
export const blockUser = async (id, status) => {
    try {
        const url = `${environment.baseUrl}admin/block-user?id=${id}`
        const response = await axios.put(url, status)
        return response.data
    } catch (err) {
        console.log('error blocking user api file', err)
        return err?.response?.data
    }
}

// ====================== Verify User =====================
export const verifyUser = async (id, status) => {
    try {
        const url = `${environment.baseUrl}admin/verify-user?id=${id}`
        const response = await axios.put(url, status)
        return response.data
    } catch (err) {
        console.log('error blocking user api file', err)
        return err?.response?.data
    }
}

// ====================Get All User Api===================
export const getAllBlockedUser = async (data) => {
    try {
        const url = `${environment.baseUrl}admin/get-all-blacklist-user?name=${data?.name}&role=${data?.role == 'castingDirector' || data?.role == 'castingAgency' ? 'castingTeam' : data?.role}&subRole=${data?.role == 'castingDirector' || data?.role == 'castingAgency' ? data?.role : ''}&email=${data?.email}&page=${data?.p}&limit=${data?.records}&skip=${data?.skip}`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
        return err?.response?.data
    }
}

// ================== Reject User api ==========
export const rejectUser = async (id, data) => {
    try {
        const url = `${environment.baseUrl}admin/reject-user?id=${id}`
        const response = await axios.put(url, data)
        return response
    } catch (err) {
        console.log('error====', err)
        return err?.response?.data
    }
}

export const getDashboardInsight = async () => {
    try {
        const url = `${environment.baseUrl}admin/get-insight`
        const response = await axios.get(url)
        return response
    } catch (err) {
        console.log('error in getDashboardInsight api file', err)
        return err?.response?.data
    }
}

// ====================Get All User Api===================
export const getAllEqnuires = async (data) => {
    try {
        const url = `${environment.baseUrl}admin/contact-us?status=${data?.status}&email=${data?.email}&phoneNumber=${data?.phoneNumber}&name=${data?.name}&page=${data?.p}&limit=${data?.records}`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
        return err?.response?.data
    }
}

export const deleteStorage = async (id) => {
    const url = `${environment.baseUrl}edit-storage/${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    }
    catch (err) {
        console.log(err);
        return err?.response?.data
    }
};

/* =============== User API ================= */

export const createUser = async (data) => {
    const url = `${environment.baseUrl}registration/`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
        return err?.response?.data
    }
};

export const getUser = async () => {
    const url = `${environment.baseUrl}registration/`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
        return err?.response?.data
    }
};

export const editUser = async (id, data) => {
    const url = `${environment.baseUrl}edit-user/${id}`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
        return err?.response?.data
    }
};

export const delUser = async (id) => {
    const url = `${environment.baseUrl}edit-user/${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    }
    catch (err) {
        console.log(err);
        return err?.response?.data
    }
};


// ====================User Contact Us Api===================

export const userContactUs = async (data) => {
    const url = `${environment.baseUrl}user/contact-us`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in userContactUs api file", err);
        return err?.response?.data
    }
};

// ==================== Upload to Cloudinary Api===================


export const uploadToCloudinary = async (file) => {
    const cloudName = 'astroguid';
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


// ============================== casting page apis =========================


export const getLetestCasting = async () => {
    try {
        const url = `${environment.baseUrl}user/lastest-casting`
        const response = await axios.get(url)
        return response.data.data
    } catch (err) {
        console.log('error in get latest casting api file', err)
        return err?.response?.data
    }
}

export const getFilterCasting = async (role) => {
    try {
        const url = `${environment.baseUrl}user/filtered-casting?role=${role || ""}`
        const response = await axios.get(url)
        return response.data.data
    } catch (err) {
        console.log('error in get Filtered casting api file', err)
        return err?.response?.data
    }
}

/* =============== Payment API ================= */

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

// ====================Get All User Api===================
export const getAllRejectedUser = async (data) => {
    try {
        const url = `${environment.baseUrl}admin/rejected-pagination?&role=${data?.role == 'castingDirector' || data?.role == 'castingAgency' ? 'castingTeam' : data?.role}&subRole=${data?.role == 'castingDirector' || data?.role == 'castingAgency' ? data?.role : ''}&email=${data?.email}&page=${data?.p}&limit=${data?.records}`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
        return err?.response?.data
    }
}

export const createRefund = async (id, data) => {
    const url = `${environment.baseUrl}admin/create-refund?id=${id}`;
    try {
        const response = await axios.post(url, data)
        return response
    }
    catch (err) {
        console.log("==========error in createRefund api file", err);
        return err?.response?.data
    }
}

export const addAdminUser = async (data) => {
    const url = `${environment.baseUrl}admin/admin-add-actor`;
    try {
        const response = await axios.post(url, data)
        return response
    }
    catch (err) {
        console.log("==========error in addAdminUser api file", err);
        return err?.response?.data
    }
}

export const deleteUser = async (id) => {
    try {
        const url = `${environment.baseUrl}admin/delete-user?id=${id}`
        const response = await axios.delete(url)
        return response
    } catch (error) {
        console.log('error in delete user api file ', error)
    }
}

export const permanentDeleteUser = async (id, data) => {
    try {
        const url = `${environment.baseUrl}admin/permanent-delete-user?id=${id}`
        const response = await axios.post(url, data)
        return response
    } catch (error) {
        console.log('error in permanent delete user api file ', error)
    }
}

export const editProfile = async (id, data) => {
    try {
        const url = `${environment.baseUrl}admin/admin-edit-actor/${id}`
        const response = await axios.put(url, data)
        return response
    } catch (error) {
        console.log('error in edit profile api file', error)
    }
}


// =============================== Api Binding Start ==============================

// ====================== Product Categories Api ======================
export const getProductCategories = async (data) => {
    try {
        const url = `${environment.baseUrl}product-categories/get-all?page=${data?.p}&limit=${data?.records}`;
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
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in addProductCategory api file", err);
        return err?.response?.data
    }
};

export const editProductCategory = async (id, data) => {
    const url = `${environment.baseUrl}product-categories/update?id=${id}`;
    try {
        const response = await axios.put(url, data)
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
        const url = `${environment.baseUrl}product-subcategories/get-all?page=${data?.p}&limit=${data?.records}`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
        return err?.response?.data
    }
}

export const addProductSubCategory = async (data) => {
    const url = `${environment.baseUrl}product-subcategories/create`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in addProductSubCategory api file", err);
        return err?.response?.data
    }
}

export const editProductSubCategory = async (id, data) => {
    const url = `${environment.baseUrl}product-subcategories/update?id=${id}`;
    try {
        const response = await axios.put(url, data)
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
        const url = `${environment.baseUrl}service-categories/get-all?page=${data?.p}&limit=${data?.records}`;
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
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in addServiceCategory api file", err);
        return err?.response?.data
    }
};

export const editServiceCategory = async (id, data) => {
    const url = `${environment.baseUrl}service-categories/update?id=${id}`;
    try {
        const response = await axios.put(url, data)
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
        const url = `${environment.baseUrl}service/get-all?page=${data?.p}&limit=${data?.records}`;
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
        const url = `${environment.baseUrl}service/public/get-all?page=${data?.p || 1}&limit=${data?.records || 10}&search=${data?.search || ''}&category=${data?.category || ''}&minPrice=${data?.minPrice || ''}&maxPrice=${data?.maxPrice || ''}&durationInMinutes=${data?.durationInMinutes || ''}&serviceType=${data?.serviceType || ''}&isActive=${data?.isActive || ''}`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in getServices api file", err);
        return err?.response?.data
    }
}

export const addService = async (data) => {
    const url = `${environment.baseUrl}service/create`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in addService api file", err);
        return err?.response?.data
    }
}

export const editService = async (id, data) => {
    const url = `${environment.baseUrl}service/update?id=${id}`;
    try {
        const response = await axios.put(url, data)
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
    console.log('data', data)
    try {
        const url = `${environment.baseUrl}product/get-all?name=${data?.name}&categoryName=${data?.categoryName}&page=${data?.p}&limit=${data?.records}`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in getProducts api file", err);
        return err?.response?.data
    }
}

export const addProduct = async (data) => {
    const url = `${environment.baseUrl}product/create`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in addProduct api file", err);
        return err?.response?.data
    }
}

export const editProduct = async (id, data) => {
    const url = `${environment.baseUrl}product/update?id=${id}`;
    try {
        const response = await axios.put(url, data)
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
        const url = `${environment.baseUrl}employee-users/get-all?name=${data?.name}&page=${data?.p}&limit=${data?.records}`;
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
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in addEmployee api file", err);
        return err?.response?.data
    }
}

export const editEmployee = async (id, data) => {
    const url = `${environment.baseUrl}employee-users/update?id=${id}`;
    try {
        const response = await axios.put(url, data)
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
        const url = `${environment.baseUrl}customer-users/get-all?name=${data?.name}&page=${data?.p}&limit=${data?.records}`;
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
    try {
        const response = await axios.put(url, data)
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
        const url = `${environment.baseUrl}banners/get-all?page=${data?.p}&limit=${data?.records}`;
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
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in addBanner api file", err);
        return err?.response?.data
    }
}

export const editBanner = async (id, data) => {
    const url = `${environment.baseUrl}banners/update?id=${id}`;
    try {
        const response = await axios.put(url, data)
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



// ================== Customer Feedback Api ==================

export const getAllFeedback = async (data) => {
    try {
        const url = `${environment.baseUrl}feedback/get-all?page=${data?.p}&limit=${data?.records}`;
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

export const respondFeedback = async (id, data) => {
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

export const updateProductOrder = async (orderId, data) => {
    try {
        const url = `${environment.baseUrl}product-order/update-status/${orderId}`;
        const response = await axios.put(url, data);
        return response.data;
    }
    catch (err) {
        console.log("==========error in updateProductOrderStatus api file", err);
        return err?.response?.data;
    }
}
