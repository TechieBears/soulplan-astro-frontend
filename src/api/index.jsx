import axios from "axios";
import { environment } from "../env";

// axios.defaults.withCredentials = true;

// ==================== Regiter Api===================

export const registerUser = async (data) => {
    const url = `${environment.baseUrl}/api/customer-users/register`;
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
    const url = `${environment.baseUrl}/api/auth/login`;
    console.log('Login URL:', url);
    console.log('Login Data:', data);
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in login User api file", err);
        console.log('Error response:', err?.response?.data);
        return err?.response?.data
    }
};
export const forgetUser = async (data) => {
    const url = `${environment.baseUrl}/api/customer-users/forgot-password`;
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
    const url = `${environment.baseUrl}/api/customer-users/reset-password`;
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
    const cloudName = 'hamax';
    const apiKey = '567326273964993';
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
        const url = `${environment.baseUrl}product-categories?page=${data?.p}&limit=${data?.records}`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
        return err?.response?.data
    }
}

export const addProductCategory = async (data) => {
    const url = `${environment.baseUrl}product-categories`;
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
    const url = `${environment.baseUrl}product-categories/${id}`;
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
        const url = `${environment.baseUrl}product-subcategories?page=${data?.p}&limit=${data?.records}`;
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
        return err?.response?.data
    }
}

export const addProductSubCategory = async (data) => {
    const url = `${environment.baseUrl}product-subcategories`;
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
    const url = `${environment.baseUrl}product-subcategories/${id}`;
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
    const url = `${environment.baseUrl}product-subcategories/${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in deleteProductSubCategory api file", err);
        return err?.response?.data
    }
}

// ==================== Employee Api ====================

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
    const url = `${environment.baseUrl}employee-users/${id}`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log("==========error in editEmployee api file", err);
        return err?.response?.data
    }
}

export const deleteEmployee = async (id) => {
    const url = `${environment.baseUrl}employee-users/${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    }
    catch (err) {
        console.log("==========error in deleteEmployee api file", err);
        return err?.response?.data
    }
}
