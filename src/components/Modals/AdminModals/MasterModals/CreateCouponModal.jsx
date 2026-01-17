import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Edit } from 'iconsax-reactjs';
import JoditEditor from 'jodit-react';
import {
    addCoupon,
    editCoupon,
    getPublicServicesDropdown,
    getServiceCategoriesDropdown,
    getProductsDropdown,
    getProductCategoriesDropdown
} from '../../../../api';
import { formBtn1, tableBtn } from '../../../../utils/CustomClass';
import { configTextEditor, TableTitle } from '../../../../helper/Helper';
import LoadBox from '../../../Loader/LoadBox';
import TextInput from '../../../TextInput/TextInput';
import SelectTextInput from '../../../TextInput/SelectTextInput';
import MultiSelectTextInput from '../../../TextInput/MultiSelectTextInput';

const APPLICABLE_TO = {
    ALL_PRODUCTS: 'all_products',
    SINGLE_PRODUCT: 'single_product',
    PRODUCT_CATEGORY: 'product_category',
    ALL_SERVICES: 'all_services',
    SINGLE_SERVICE: 'single_service',
    SERVICE_CATEGORY: 'service_category'
};

const getApplicableOptions = (type) => {
    return type === 'products' ? [
        { value: APPLICABLE_TO.ALL_PRODUCTS, label: 'All Products' },
        { value: APPLICABLE_TO.SINGLE_PRODUCT, label: 'Select Product' },
        { value: APPLICABLE_TO.PRODUCT_CATEGORY, label: 'Select Category' }
    ] : [
        { value: APPLICABLE_TO.ALL_SERVICES, label: 'All Services' },
        { value: APPLICABLE_TO.SINGLE_SERVICE, label: 'Service' },
        { value: APPLICABLE_TO.SERVICE_CATEGORY, label: 'Service Category' }
    ];
};

function CreateCouponModal({ edit, userData, setRefreshTrigger }) {
    const [open, setOpen] = useState(false);
    const toggle = () => {
        setOpen(!open);
        if (!edit) {
            reset({
                couponName: '',
                couponSubtitle: '',
                couponCode: '',
                couponType: '',
                applicableType: '',
                discountIn: '',
                discount: '',
                activationDate: '',
                expiryDate: '',
                redemptionPerUser: '',
                totalRedemptions: '',
                description: '',
                services: [],
                serviceCategories: [],
                products: [],
                productCategories: []
            });
        }
    };
    const [loader, setLoader] = useState(false);
    const { register, handleSubmit, control, watch, reset, formState: { errors }, setValue } = useForm();
    const editorRef = useRef(null);

    const [services, setServices] = useState([]);
    const [serviceCategories, setServiceCategories] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [productCategories, setProductCategories] = useState([]);

    const couponType = watch('couponType');
    const applicableType = watch('applicableType');
    const selectedProductCategories = watch('productCategories');

    const formSubmit = async (data) => {
        try {
            setLoader(true);

            const formattedData = {
                couponName: data.couponName,
                couponSubtitle: data.couponSubtitle,
                couponCode: data.couponCode,
                couponType: data.couponType,
                applicableTo: data.applicableType,
                discountIn: data.discountIn,
                discount: Number(data.discount),
                activationDate: data.activationDate,
                expiryDate: data.expiryDate,
                redemptionPerUser: Number(data.redemptionPerUser),
                totalRedemptions: Number(data.totalRedemptions),
                description: data.description || '',
                applyAllServices: data.applicableType === APPLICABLE_TO.ALL_SERVICES,
                applicableServices: data.applicableType === APPLICABLE_TO.SINGLE_SERVICE ? (data.services || []) : [],
                applicableServiceCategories: data.applicableType === APPLICABLE_TO.SERVICE_CATEGORY ? (data.serviceCategories || []) : [],
                applyAllProducts: data.applicableType === APPLICABLE_TO.ALL_PRODUCTS,
                applicableProducts: data.applicableType === APPLICABLE_TO.SINGLE_PRODUCT ? (data.products || []) : [],
                applicableProductCategories: data.applicableType === APPLICABLE_TO.PRODUCT_CATEGORY ? (data.productCategories || []) : []
            };

            const apiCall = edit
                ? editCoupon(userData?._id, formattedData)
                : addCoupon(formattedData);

            const res = await apiCall;
            console.log("⚡️🤯 ~ CreateCouponModal.jsx:86 ~ formSubmit ~ res:", res)

            if (res?.success) {
                toast.success(edit ? "Coupon Updated" : "Coupon Created");
                setRefreshTrigger(prev => prev + 1);
                toggle();
            } else {
                toast.error(res?.message || "Something went wrong");
            }
        } catch (error) {
            console.log('Error submitting form:', error);
            toast.error("Something went wrong");
        } finally {
            setLoader(false);
        }
    };

    // Fetch dropdown data when modal opens
    useEffect(() => {
        if (open) {
            fetchDropdownData();
        }
    }, [open]);

    const fetchDropdownData = async () => {
        try {
            const [servicesRes, serviceCategoriesRes, productsRes, productCategoriesRes] = await Promise.all([
                getPublicServicesDropdown(),
                getServiceCategoriesDropdown(),
                getProductsDropdown(),
                getProductCategoriesDropdown()
            ]);

            if (servicesRes?.success && servicesRes?.data) {
                setServices(servicesRes.data.map(item => ({ value: item._id, label: item.name })));
            }
            if (serviceCategoriesRes?.success && serviceCategoriesRes?.data) {
                setServiceCategories(serviceCategoriesRes.data.map(item => ({ value: item._id, label: item.name })));
            }
            if (productsRes?.success && productsRes?.data) {
                const formattedProducts = productsRes.data.map(item => ({
                    value: item._id,
                    label: item.name
                }));
                setAllProducts(formattedProducts);
                setProducts(formattedProducts);
            }
            if (productCategoriesRes?.success && productCategoriesRes?.data) {
                setProductCategories(productCategoriesRes.data.map(item => ({ value: item._id, label: item.name })));
            }
        } catch (error) {
            console.error('Error fetching dropdown data:', error);
        }
    };


    useEffect(() => {
        if (edit && userData && open) {
            reset({
                couponName: userData?.couponName || '',
                couponSubtitle: userData?.couponSubtitle || '',
                couponCode: userData?.couponCode || '',
                couponType: userData?.couponType || '',
                applicableType: userData?.applicableTo || '',
                discountIn: userData?.discountIn || '',
                discount: userData?.discount || '',
                activationDate: userData?.activationDate?.split('T')[0] || '',
                expiryDate: userData?.expiryDate?.split('T')[0] || '',
                redemptionPerUser: userData?.redemptionPerUser || '',
                totalRedemptions: userData?.totalRedemptions || '',
                description: userData?.description || '',
                services: userData?.applicableServices?.map(s => s._id || s) || [],
                serviceCategories: userData?.applicableServiceCategories?.map(sc => sc._id || sc) || [],
                products: userData?.applicableProducts?.map(p => p._id || p) || [],
                productCategories: userData?.applicableProductCategories?.map(pc => pc._id || pc) || []
            });
        }
    }, [edit, userData, open, reset]);

    // Reset applicable fields when couponType changes (only in create mode)
    useEffect(() => {
        if (couponType && !edit) {
            setValue('applicableType', '');
            setValue('services', []);
            setValue('serviceCategories', []);
            setValue('products', []);
            setValue('productCategories', []);
        }
    }, [couponType, setValue, edit]);

    // Reset selection fields when applicableType changes (only in create mode)
    useEffect(() => {
        if (applicableType && !edit) {
            setValue('services', []);
            setValue('serviceCategories', []);
            setValue('products', []);
            setValue('productCategories', []);
        }
    }, [applicableType, setValue, edit]);


    return (
        <>
            {
                edit ? <button onClick={toggle}>
                    <Edit className='text-yellow-500' size={20} />
                </button> : <button onClick={toggle} className={tableBtn}>
                    Create New Coupon
                </button>
            }

            <Transition appear show={open} as={Fragment}>
                <Dialog as="div" className="relative z-[1000]" onClose={(value) => {
                    const joditElements = document.querySelectorAll('.jodit-container, .jodit-toolbar, .jodit-workplace, .jodit-popup, .jodit-dialog');
                    const clickedOnJodit = Array.from(joditElements).some(el => el.contains(document.activeElement) || el.contains(event?.target));

                    if (!clickedOnJodit) {
                        toggle();
                    }
                }}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 backdrop-blur-[2.3px] bg-black/20" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
                                    <TableTitle
                                        title={edit ? "Edit Coupon" : "Create New Coupon"}
                                        toggle={toggle}
                                    />
                                    <div className="bg-white">
                                        <form onSubmit={handleSubmit(formSubmit)}>
                                            <div className="md:py-5 md:pb-7 mx-4 md:mx-8 space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-5">

                                                    <div>
                                                        <h4 className="text-sm font-tbLex font-normal text-slate-400 pb-2.5">Coupon title <span className="text-red-500 text-xs font-tbLex">*</span></h4>
                                                        <TextInput
                                                            label="Enter Coupon Name"
                                                            placeholder="ex.Get Flat Rs. 100 off!"
                                                            registerName="couponName"
                                                            props={{
                                                                ...register('couponName', {
                                                                    required: "Coupon name is required",
                                                                    minLength: { value: 3, message: "Coupon name must be at least 3 characters" },
                                                                    maxLength: { value: 100, message: "Coupon name must not exceed 100 characters" }
                                                                })
                                                            }}
                                                            errors={errors.couponName}
                                                        />
                                                    </div>

                                                    <div>
                                                        <h4 className="text-sm font-tbLex font-normal text-slate-400 pb-2.5">Coupon Subtitle <span className="text-red-500 text-xs font-tbLex">*</span></h4>
                                                        <TextInput
                                                            label="Enter Coupon Subtitle"
                                                            placeholder="ex.Use code FLAT100 & get flat ₹100 off orders above ₹500"
                                                            registerName="couponSubtitle"
                                                            props={{
                                                                ...register('couponSubtitle', {
                                                                    required: "Coupon subtitle is required",
                                                                    minLength: { value: 3, message: "Coupon subtitle must be at least 3 characters" },
                                                                    maxLength: { value: 100, message: "Coupon subtitle must not exceed 100 characters" }
                                                                })
                                                            }}
                                                            errors={errors.couponSubtitle}
                                                        />
                                                    </div>

                                                    <div>
                                                        <h4 className="text-sm font-tbLex font-normal text-slate-400 pb-2.5">Coupon Code <span className="text-red-500 text-xs font-tbLex">*</span></h4>
                                                        <TextInput
                                                            label="Enter Coupon Code"
                                                            placeholder="Enter Coupon Code"
                                                            registerName="couponCode"
                                                            props={{
                                                                ...register('couponCode', {
                                                                    required: "Coupon code is required",
                                                                    minLength: { value: 3, message: "Coupon code must be at least 3 characters" },
                                                                    maxLength: { value: 30, message: "Coupon code must not exceed 30 characters" },
                                                                    pattern: { value: /^[A-Z0-9]+$/, message: "Only uppercase letters and numbers allowed" },
                                                                    onChange: (e) => {
                                                                        e.target.value = e?.target?.value?.toUpperCase();
                                                                    }
                                                                }),
                                                                style: { textTransform: 'uppercase' }
                                                            }}
                                                            errors={errors.couponCode}
                                                        />
                                                    </div>

                                                    <div>
                                                        <h4 className="text-sm font-tbLex font-normal text-slate-400 pb-2.5">Coupon Type <span className="text-red-500 text-xs font-tbLex">*</span></h4>
                                                        <SelectTextInput
                                                            label="Select Coupon Type"
                                                            registerName="couponType"
                                                            options={[
                                                                { value: 'products', label: 'Products' },
                                                                { value: 'services', label: 'Services' },
                                                            ]}
                                                            placeholder="Select Coupon Type"
                                                            props={{ ...register('couponType', { required: "Coupon type is required" }) }}
                                                            errors={errors.couponType}
                                                            defaultValue={userData?.couponType}
                                                        />
                                                    </div>

                                                    {(couponType === 'products' || couponType === 'services') && (
                                                        <div>
                                                            <h4 className="text-sm font-tbLex font-normal text-slate-400 pb-2.5">Applicable To <span className="text-red-500 text-xs font-tbLex">*</span></h4>
                                                            <SelectTextInput
                                                                label="Select Applicable Type"
                                                                registerName="applicableType"
                                                                options={getApplicableOptions(couponType)}
                                                                placeholder="Select Applicable Type"
                                                                props={{ ...register('applicableType', { required: "Applicable type is required" }) }}
                                                                errors={errors.applicableType}
                                                                defaultValue={userData?.applicableType}
                                                            />
                                                        </div>
                                                    )}
                                                    {couponType === 'services' && applicableType === APPLICABLE_TO.SINGLE_SERVICE && (
                                                        <div>
                                                            <h4 className="text-sm font-tbLex font-normal text-slate-400 pb-2.5">Applicable Services</h4>
                                                            <Controller
                                                                name="services"
                                                                control={control}
                                                                defaultValue={[]}
                                                                render={({ field: { onChange, value } }) => (
                                                                    <MultiSelectTextInput
                                                                        label="Select Services"
                                                                        options={services}
                                                                        value={Array.isArray(value) ? value : []}
                                                                        onChange={onChange}
                                                                        errors={errors.services}
                                                                    />
                                                                )}
                                                            />
                                                        </div>
                                                    )}

                                                    {couponType === 'services' && applicableType === APPLICABLE_TO.SERVICE_CATEGORY && (
                                                        <div>
                                                            <h4 className="text-sm font-tbLex font-normal text-slate-400 pb-2.5">Applicable Service Categories</h4>
                                                            <Controller
                                                                name="serviceCategories"
                                                                control={control}
                                                                defaultValue={[]}
                                                                render={({ field: { onChange, value } }) => (
                                                                    <MultiSelectTextInput
                                                                        label="Select Service Categories"
                                                                        options={serviceCategories}
                                                                        value={Array.isArray(value) ? value : []}
                                                                        onChange={onChange}
                                                                        errors={errors.serviceCategories}
                                                                    />
                                                                )}
                                                            />
                                                        </div>
                                                    )}

                                                    {couponType === 'products' && applicableType === APPLICABLE_TO.PRODUCT_CATEGORY && (
                                                        <div>
                                                            <h4 className="text-sm font-tbLex font-normal text-slate-400 pb-2.5">Applicable Product Categories</h4>
                                                            <Controller
                                                                name="productCategories"
                                                                control={control}
                                                                defaultValue={[]}
                                                                render={({ field: { onChange, value } }) => (
                                                                    <MultiSelectTextInput
                                                                        label="Select Product Categories"
                                                                        options={productCategories}
                                                                        value={Array.isArray(value) ? value : []}
                                                                        onChange={onChange}
                                                                        errors={errors.productCategories}
                                                                    />
                                                                )}
                                                            />
                                                        </div>
                                                    )}

                                                    {couponType === 'products' && applicableType === APPLICABLE_TO.SINGLE_PRODUCT && (
                                                        <div>
                                                            <h4 className="text-sm font-tbLex font-normal text-slate-400 pb-2.5">Applicable Products</h4>
                                                            <Controller
                                                                name="products"
                                                                control={control}
                                                                defaultValue={[]}
                                                                render={({ field: { onChange, value } }) => (
                                                                    <MultiSelectTextInput
                                                                        label="Select Products"
                                                                        options={products}
                                                                        value={Array.isArray(value) ? value : []}
                                                                        onChange={onChange}
                                                                        errors={errors.products}
                                                                    />
                                                                )}
                                                            />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <h4 className="text-sm font-tbLex font-normal text-slate-400 pb-2.5">Discount In <span className="text-red-500 text-xs font-tbLex">*</span></h4>
                                                        <SelectTextInput
                                                            label="Select Discount Type"
                                                            registerName="discountIn"
                                                            options={[
                                                                { value: 'percent', label: 'Percent' },
                                                                { value: 'amount', label: 'Amount' },
                                                            ]}
                                                            placeholder="Select Discount Type"
                                                            props={{ ...register('discountIn', { required: "Discount type is required" }) }}
                                                            errors={errors.discountIn}
                                                            defaultValue={userData?.discountIn}
                                                        />
                                                    </div>

                                                    <div>
                                                        <h4 className="text-sm font-tbLex font-normal text-slate-400 pb-2.5">Discount in {watch('discountIn') === 'percent' ? '%' : '₹'} <span className="text-red-500 text-xs font-tbLex">*</span> <span className="text-red-500 text-xs font-tbLex">{edit ? '(Cannot be edited)' : ''}</span></h4>
                                                        <TextInput
                                                            disabled={edit}
                                                            label={`Enter Discount ${watch('discountIn') === 'percent' ? '%' : '₹'}`}
                                                            placeholder={`Enter Discount ${watch('discountIn') === 'percent' ? '%' : '₹'}`}
                                                            type="number"
                                                            registerName="discount"
                                                            props={{
                                                                ...register('discount', {
                                                                    required: "Discount value is required",
                                                                    min: { value: 0.01, message: "Discount must be greater than 0" },
                                                                    validate: (value) => {
                                                                        const discountIn = watch('discountIn');
                                                                        if (discountIn === 'percent') {
                                                                            if (value > 100) return "Discount cannot exceed 100%";
                                                                            if (value <= 0) return "Discount must be greater than 0%";
                                                                        } else if (discountIn === 'amount') {
                                                                            if (value <= 0) return "Discount amount must be greater than 0";
                                                                            if (value > 1000000) return "Discount amount is too high";
                                                                        }
                                                                        return true;
                                                                    }
                                                                })
                                                            }}
                                                            errors={errors.discount}
                                                        />
                                                    </div>

                                                    <div>
                                                        <h4 className="text-sm font-tbLex font-normal text-slate-400 pb-2.5">Activation Date <span className="text-red-500 text-xs font-tbLex">*</span></h4>
                                                        <TextInput
                                                            label="Activation Date"
                                                            type="date"
                                                            registerName="activationDate"
                                                            props={{
                                                                ...register('activationDate', {
                                                                    required: "Activation date is required",
                                                                    validate: (value) => {
                                                                        if (!value) return "Activation date is required";
                                                                        const today = new Date();
                                                                        today.setHours(0, 0, 0, 0);
                                                                        const selectedDate = new Date(value);
                                                                        selectedDate.setHours(0, 0, 0, 0);
                                                                        return selectedDate >= today || "Activation date cannot be in the past";
                                                                    }
                                                                })
                                                            }}
                                                            errors={errors.activationDate}
                                                        />
                                                    </div>

                                                    <div>
                                                        <h4 className="text-sm font-tbLex font-normal text-slate-400 pb-2.5">Expiry Date <span className="text-red-500 text-xs font-tbLex">*</span></h4>
                                                        <TextInput
                                                            label="Expiry Date"
                                                            type="date"
                                                            registerName="expiryDate"
                                                            props={{
                                                                ...register('expiryDate', {
                                                                    required: "Expiry date is required",
                                                                    validate: (value) => {
                                                                        if (!value) return "Expiry date is required";

                                                                        const today = new Date();
                                                                        today.setHours(0, 0, 0, 0);
                                                                        const selectedDate = new Date(value);
                                                                        selectedDate.setHours(0, 0, 0, 0);

                                                                        if (selectedDate < today) {
                                                                            return "Expiry date cannot be in the past";
                                                                        }

                                                                        const activationDate = watch('activationDate');
                                                                        if (activationDate) {
                                                                            const activation = new Date(activationDate);
                                                                            activation.setHours(0, 0, 0, 0);
                                                                            if (selectedDate <= activation) {
                                                                                return "Expiry date must be after activation date";
                                                                            }
                                                                        }

                                                                        return true;
                                                                    }
                                                                })
                                                            }}
                                                            errors={errors.expiryDate}
                                                        />
                                                    </div>

                                                    <div>
                                                        <h4 className="text-sm font-tbLex font-normal text-slate-400 pb-2.5">Redemption Per User <span className="text-red-500 text-xs font-tbLex">*</span></h4>
                                                        <TextInput
                                                            label="Enter Redemption Per User"
                                                            placeholder="Enter Redemption Per User"
                                                            type="number"
                                                            registerName="redemptionPerUser"
                                                            props={{
                                                                ...register('redemptionPerUser', {
                                                                    required: "Redemption per user is required",
                                                                    min: { value: 1, message: "Must be at least 1" },
                                                                    max: { value: 1000, message: "Cannot exceed 1000" },
                                                                    validate: (value) => {
                                                                        if (!Number.isInteger(Number(value))) return "Must be a whole number";
                                                                        return true;
                                                                    }
                                                                })
                                                            }}
                                                            errors={errors.redemptionPerUser}
                                                        />
                                                    </div>

                                                    <div>
                                                        <h4 className="text-sm font-tbLex font-normal text-slate-400 pb-2.5">Total Redemptions <span className="text-red-500 text-xs font-tbLex">*</span></h4>
                                                        <TextInput
                                                            label="Enter Total Redemptions"
                                                            placeholder="Enter Total Redemptions"
                                                            type="number"
                                                            registerName="totalRedemptions"
                                                            props={{
                                                                ...register('totalRedemptions', {
                                                                    required: "Total redemptions is required",
                                                                    min: { value: 1, message: "Must be at least 1" },
                                                                    max: { value: 100000, message: "Cannot exceed 100,000" },
                                                                    validate: (value) => {
                                                                        if (!Number.isInteger(Number(value))) return "Must be a whole number";
                                                                        const redemptionPerUser = watch('redemptionPerUser');
                                                                        if (redemptionPerUser && Number(value) < Number(redemptionPerUser)) {
                                                                            return "Total redemptions must be greater than or equal to redemption per user";
                                                                        }
                                                                        return true;
                                                                    }
                                                                })
                                                            }}
                                                            errors={errors.totalRedemptions}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-tbLex font-normal text-slate-400 pb-2.5">Terms and Conditions</h4>
                                                    <Controller
                                                        name="description"
                                                        control={control}
                                                        render={({ field: { onChange, value }, fieldState: { error } }) => {
                                                            const editorConfig = useMemo(() => ({
                                                                ...configTextEditor,
                                                                placeholder: `Offer is valid only on select services/products
Coupon code can be applied only once in 2 hrs on this services/products
Other T&Cs may apply
Offer valid till Nov 30, 2026 11:59 PM`
                                                            }), []);

                                                            return (
                                                                <>
                                                                    <JoditEditor
                                                                        ref={editorRef}
                                                                        value={value || ''}
                                                                        config={editorConfig}
                                                                        tabIndex={1}
                                                                        onBlur={(newContent) => onChange(newContent)}
                                                                    />
                                                                    {error && (
                                                                        <p className="text-red-500 text-sm mt-1">{error.message}</p>
                                                                    )}
                                                                </>
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <footer className="py-3 flex bg-slate1 justify-end px-4 space-x-3">
                                                {loader
                                                    ? <LoadBox className={formBtn1} />
                                                    : <button type='submit' className={formBtn1}>Submit</button>}
                                            </footer>
                                        </form>

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition >
        </>
    );
}

export default CreateCouponModal;
