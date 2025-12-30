import { Dialog, Transition } from '@headlessui/react';
import { Fragment, memo, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { formBtn3 } from '../../utils/CustomClass';
import TextInput from '../TextInput/TextInput';
import { validateAlphabets, validatePhoneNumber } from '../../utils/validateFunction';
import toast from 'react-hot-toast';
import { TableTitle } from '../../helper/Helper';
import SelectTextInput from '../TextInput/SelectTextInput';
import CustomTextArea from '../TextInput/CustomTextArea';
import { getAllAddress, editAddress, addAddress, deleteAddress } from '../../api';
import { useDispatch } from 'react-redux';
import { setAddresses } from '../../redux/Slices/cartSlice';
import Switch from 'react-js-switch';
import { Edit } from 'iconsax-reactjs';
import Preloaders from '../Loader/Preloaders';



const AddButton = memo(({ onClick }) => {
    return (
        <button
            type="button"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClick();
            }}
            className="mt-4 w-full bg-orange-100 text-orange-500 hover:bg-orange-100 font-medium mb-4 py-2 sm:py-3 rounded-lg flex items-center justify-center gap-2 transition-all border border-orange-500 border-dashed"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Address
        </button>
    )
});


function AddressChangeModal({ edit }) {
    const { register, handleSubmit, control, watch, reset, setValue, formState: { errors } } = useForm();
    const [open, setOpen] = useState(false);
    const [loader, setLoading] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [addresses, setAddress] = useState([]);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const dispatch = useDispatch();

    const toggle = () => {
        setOpen(!open);
        setShowEditForm(false);
        setEditingAddress(null);
        reset();
    };

    const formSubmit = async (data) => {
        try {
            setLoading(true);
            const addressData = {
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.mobileNo,
                addressType: data.type?.toLowerCase() || 'home',
                address: data.address,
                city: data.city,
                postalCode: data.postalCode,
                state: data.state,
                country: data.country,
                isDefault: data.isDefault
            };

            let response;
            if (editingAddress) {
                response = await editAddress(editingAddress._id, addressData);
            } else {
                response = await addAddress(addressData);
            }

            if (response?.success) {
                toast.success(response?.message || `Address ${editingAddress ? 'updated' : 'added'} successfully`);
                setShowEditForm(false);
                setEditingAddress(null);
                reset();
                toggle();
                fetchAddresses();
            } else {
                toast.error(response?.message || "Something went wrong");
            }
        } catch (error) {
            console.error('Error submitting address form:', error);
            toast.error("Failed to save address");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (editingAddress) {
            setValue('firstName', editingAddress.firstName || '');
            setValue('lastName', editingAddress.lastName || '');
            setValue('mobileNo', editingAddress.phoneNumber || '');
            setValue('type', editingAddress.addressType ? editingAddress.addressType.charAt(0).toUpperCase() + editingAddress.addressType.slice(1) : 'Home');
            setValue('address', editingAddress.address || '');
            setValue('city', editingAddress.city || '');
            setValue('postalCode', editingAddress.postalCode || '');
            setValue('state', editingAddress.state || '');
            setValue('country', editingAddress.country || '');
            setValue('isDefault', editingAddress.isDefault || false);
        } else {
            reset();
        }
    }, [editingAddress, setValue, reset]);

    const fetchAddresses = async () => {
        try {
            setFetchLoading(true);
            const res = await getAllAddress();
            if (res?.success) {
                setAddress(res?.data || []);
                const defaultAddress = res?.data?.filter(item => item?.isDefault);
                dispatch(setAddresses(defaultAddress[0]));
            } else {
                setAddress([]);
                dispatch(setAddresses([]));
                toast.error(res?.message || 'Failed to fetch addresses');
            }
        } catch (err) {
            setAddress([]);
            toast.error(err.message || 'Failed to fetch addresses');
            console.error('Error fetching addresses', err);
        } finally {
            setFetchLoading(false);
        }
    };

    useEffect(() => {
        if (open) {
            fetchAddresses();
        }
    }, [open]);

    const handleSelectAddress = async (address) => {
        try {
            const addressData = {
                firstName: address.firstName,
                lastName: address.lastName,
                phoneNumber: address.phoneNumber,
                addressType: address.addressType,
                address: address.address,
                city: address.city,
                postalCode: address.postalCode,
                state: address.state,
                country: address.country,
                isDefault: true
            };

            const response = await editAddress(address._id, addressData);
            if (response?.success) {
                toast.success('Address changed successfully');
                dispatch(setAddresses(address));
                toggle();
            } else {
                toast.error(response?.message || "Failed to change address");
            }
        } catch (error) {
            console.error('Error changing address:', error);
            toast.error("Failed to change address");
        }
    };

    const handleEditAddress = (address) => {
        setEditingAddress(address);
        setShowEditForm(true);
    };

    const handleDeleteAddress = async (addressId) => {
        if (!window.confirm('Are you sure you want to delete this address?')) return;
        
        try {
            const response = await deleteAddress(addressId);
            if (response?.success) {
                toast.success('Address deleted successfully');
                fetchAddresses();
            } else {
                toast.error(response?.message || 'Failed to delete address');
            }
        } catch (error) {
            console.error('Error deleting address:', error);
            toast.error('Failed to delete address');
        }
    };

    return <>
        {
            edit ? (
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggle();
                    }}
                    className="flex items-center gap-1 border border-gray-900 rounded px-4 py-2 text-sm font-tbLex text-slate-600 hover:bg-gray-50 transition-colors mt-2 sm:mt-0"
                >
                    <Edit className="w-4 h-4" />
                    Change
                </button>
            ) : (
                <AddButton onClick={(e) => {
                    e?.preventDefault?.();
                    e?.stopPropagation?.();
                    toggle();
                }} />
            )
        }

        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-[1000]" onClose={() => toggle()}>
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
                <div className="fixed inset-0 overflow-y-auto scrollbars">
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
                            <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                                <TableTitle
                                    title={showEditForm ? "Select Address" : edit ? "Edit Address" : "Add Address"}
                                    toggle={toggle}
                                />
                                <div className="bg-white  max-h-[80vh] overflow-y-auto">
                                    {!showEditForm && edit ? (
                                        <div className="space-y-4">
                                            {fetchLoading ? (
                                                <div className="">
                                                    <Preloaders className={"bg-slate1 !h-auto p-10"} />
                                                </div>
                                            ) : addresses?.length > 0 ? (
                                                <div className="grid p-6 grid-cols-1 md:grid-cols-2 gap-4">
                                                    {addresses.map((address) => (
                                                        <div
                                                            key={address?._id}
                                                            className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:border-primary transition-colors"
                                                        >
                                                            <div className="flex flex-col space-y-2">
                                                                <div className="flex justify-between items-start">
                                                                    <div className="flex-1">
                                                                        <h3 className="font-medium font-tbLex text-slate-800">
                                                                            {address?.firstName || ''} {address?.lastName || ''}
                                                                        </h3>
                                                                        <p className="text-slate-500 font-tbPop text-sm">
                                                                            {address?.phoneNumber}
                                                                        </p>
                                                                        <p className="text-slate-500 font-tbPop text-sm capitalize">
                                                                            {address?.addressType}
                                                                        </p>
                                                                    </div>
                                                                    {address?.isDefault && (
                                                                        <span className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded font-tbLex">
                                                                            Default
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <p className="text-slate-600 font-tbPop text-sm">
                                                                    {address?.address}, {address?.city}, {address?.state} {address?.postalCode}, {address?.country}
                                                                </p>
                                                                <div className="flex gap-2 mt-2 pt-2 border-t border-slate-200">
                                                                    <button
                                                                        onClick={() => handleSelectAddress(address)}
                                                                        disabled={address?.isDefault}
                                                                        className={`flex-1 px-4 py-2 text-sm font-tbLex rounded ${address?.isDefault
                                                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                                            : 'bg-primary text-white hover:opacity-90'
                                                                            }`}
                                                                    >
                                                                        {address?.isDefault ? 'Current Address' : 'Select This Address'}
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleEditAddress(address)}
                                                                        className="px-4 py-2 text-sm font-tbLex border border-gray-900 rounded hover:bg-gray-50"
                                                                        title="Edit Address"
                                                                    >
                                                                        <Edit className="w-4 h-4" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteAddress(address._id)}
                                                                        className="px-4 py-2 text-sm font-tbLex border border-red-500 text-red-500 rounded hover:bg-red-50"
                                                                        title="Delete Address"
                                                                    >
                                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center py-8">
                                                    <p className="text-slate-500 font-tbPop text-sm">
                                                        No addresses found. Please add an address from your profile.
                                                    </p>
                                                </div>
                                            )}
                                            <div className="px-6 pb-6">
                                                <AddButton onClick={() => setShowEditForm(true)} />
                                            </div>
                                        </div>
                                    ) : (
                                        // Edit Address Form
                                        <form onSubmit={handleSubmit(formSubmit)} className="space-y-6 p-6">
                                            {/* First Name + Last Name */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="">
                                                    <h4
                                                        className="text-sm font-tbLex font-normal text-slate-400 pb-2.5"
                                                    >
                                                        First Name
                                                    </h4>
                                                    <TextInput
                                                        label="Enter First Name*"
                                                        placeholder="Enter First Name"
                                                        type="text"
                                                        registerName="firstName"
                                                        props={{ ...register('firstName', { required: "First name is required", validate: validateAlphabets }), minLength: 3 }}
                                                        errors={errors.firstName}
                                                    />
                                                </div>
                                                <div className="">
                                                    <h4
                                                        className="text-sm font-tbLex font-normal text-slate-400 pb-2.5"
                                                    >
                                                        Last Name
                                                    </h4>
                                                    <TextInput
                                                        label="Enter Last Name*"
                                                        placeholder="Enter Last Name"
                                                        type="text"
                                                        registerName="lastName"
                                                        props={{ ...register('lastName', { required: "Last name is required", validate: validateAlphabets }), minLength: 3 }}
                                                        errors={errors.lastName}
                                                    />
                                                </div>
                                            </div>

                                            {/* Phone + Address Type */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <h4
                                                        className="text-sm font-tbLex font-normal text-slate-400 pb-2.5"
                                                    >
                                                        Phone Number
                                                    </h4>
                                                    <TextInput
                                                        label="Enter Your Phone Number"
                                                        placeholder="Enter Your Phone Number"
                                                        type="tel"
                                                        registerName="mobileNo"
                                                        props={{ ...register('mobileNo', { validate: validatePhoneNumber, required: true }), maxLength: 10, minLength: 10 }}
                                                        errors={errors.mobileNo}
                                                    />
                                                </div>
                                                <div>
                                                    <h4
                                                        className="text-sm font-tbLex font-normal text-slate-400 pb-2.5"
                                                    >
                                                        Address Type
                                                    </h4>
                                                    <div className="sm:flex sm:gap-2 space-x-2 space-y-2 sm:space-y-0">
                                                        {["Home", "Office", "Friend", "Other"].map((type) => (
                                                            <Controller
                                                                key={type}
                                                                name="type"
                                                                control={control}
                                                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => onChange(type)}
                                                                        className={`px-5 font-tbLex py-3.5 rounded-md text-sm font-medium ${value === type
                                                                            ? "bg-linear-gradient text-white"
                                                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                                            }`}
                                                                    >
                                                                        {type}
                                                                    </button>
                                                                )}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="">
                                                <h4
                                                    className="text-sm font-tbLex font-normal text-slate-800 pb-2.5"
                                                >
                                                    Address
                                                </h4>
                                                <CustomTextArea
                                                    label="Enter Address"
                                                    placeholder="Enter Address"
                                                    registerName="address"
                                                    props={{
                                                        ...register('address', {
                                                            required: "Address is required",
                                                            minLength: {
                                                                value: 10,
                                                                message: "Address must be at least 10 characters"
                                                            }
                                                        })
                                                    }}
                                                    errors={errors.address}
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                                <div>
                                                    <h4
                                                        className="text-sm font-tbLex font-normal text-slate-400 pb-2.5"
                                                    >
                                                        City
                                                    </h4>
                                                    <TextInput
                                                        label="Enter City"
                                                        placeholder="Enter City"
                                                        type="text"
                                                        registerName="city"
                                                        props={{
                                                            ...register('city', {
                                                                pattern: {
                                                                    value: /^[a-zA-Z\s]*$/,
                                                                    message: "City name can only contain letters"
                                                                }
                                                            })
                                                        }}
                                                        errors={errors.city}
                                                    />
                                                </div>
                                                <div>
                                                    <h4
                                                        className="text-sm font-tbLex font-normal text-slate-400 pb-2.5"
                                                    >
                                                        Zip Code / Postal Code
                                                    </h4>
                                                    <TextInput
                                                        label="Enter Postal Code"
                                                        placeholder="Enter Postal Code"
                                                        type="text"
                                                        registerName="postalCode"
                                                        props={{
                                                            ...register('postalCode', {
                                                                minLength: {
                                                                    value: 2,
                                                                    message: "Postal Code must be at least 2 characters",
                                                                },
                                                                maxLength: {
                                                                    value: 15,
                                                                    message: "Postal Code cannot exceed 15 characters",
                                                                },
                                                            }),
                                                            maxLength: 15
                                                        }}
                                                        errors={errors.postalCode}
                                                    />
                                                </div>
                                                <div className="">
                                                    <h4
                                                        className="text-sm font-tbLex font-normal text-slate-400 pb-2.5"
                                                    >
                                                        State
                                                    </h4>
                                                    <div className="">
                                                        <TextInput
                                                            label="Enter State"
                                                            placeholder="Enter State"
                                                            type="text"
                                                            registerName="state"
                                                            props={{
                                                                ...register('state', {
                                                                    pattern: {
                                                                        value: /^[a-zA-Z\s]*$/,
                                                                        message: "State name can only contain letters"
                                                                    }
                                                                })
                                                            }}
                                                            errors={errors.state}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <h4
                                                        className="text-sm font-tbLex font-normal text-slate-400 pb-2.5"
                                                    >
                                                        Country
                                                    </h4>
                                                    <div className="">
                                                        <SelectTextInput
                                                            label="Select Country"
                                                            registerName="country"
                                                            options={[
                                                                { value: 'India', label: 'India' },
                                                                { value: 'USA', label: 'USA' },
                                                                { value: 'Canada', label: 'Canada' },
                                                                { value: 'other', label: 'Other' },
                                                            ]}
                                                            placeholder="Select Country"
                                                            props={{
                                                                ...register('country', { required: true }),
                                                                value: watch('country') || ''
                                                            }}
                                                            errors={errors.country}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <h4
                                                        className="text-sm font-tbLex font-normal text-slate-400 pb-2.5"
                                                    >
                                                        Default Address
                                                    </h4>
                                                    <div className="">
                                                        <Controller
                                                            name="isDefault"
                                                            control={control}
                                                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                                                <Switch
                                                                    value={value}
                                                                    onChange={() => onChange(!value)}
                                                                    size={50}
                                                                    backgroundColor={{ on: "#86d993", off: "#c6c6c6" }}
                                                                    borderColor={{ on: "#86d993", off: "#c6c6c6" }}
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex justify-end gap-3 pt-4 justify-self-end">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setShowEditForm(false);
                                                        setEditingAddress(null);
                                                        reset();
                                                    }}
                                                    className="px-6 py-2 rounded-md border border-gray-900 text-gray-900 bg-white hover:bg-gray-100 transition"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={loader}
                                                    className={`${formBtn3} ${loader ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                >
                                                    {loader ? 'Saving...' : "Save Changes"}
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition >
    </>;
}

export default AddressChangeModal
