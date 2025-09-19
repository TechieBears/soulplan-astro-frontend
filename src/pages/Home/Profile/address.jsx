import { useState } from "react";
import ProfileSidebar from "../../../components/Sidebar/ProfileSidebar";
import { formBtn1, formBtn3 } from "../../../utils/CustomClass";
import { validateAlphabets, validatePhoneNumber } from "../../../utils/validateFunction";
import TextInput from "../../../components/TextInput/TextInput";
import { Controller, useForm } from "react-hook-form";
import SelectTextInput from "../../../components/TextInput/SelectTextInput";
import CustomTextArea from '../../../components/TextInput/CustomTextArea';
import { CaretRight, NotePencil, Power, Trash } from "@phosphor-icons/react";
const AddressPage = () => {

    const { register, handleSubmit, control, watch, reset, formState: { errors }, setValue } = useForm();
    const [showAddForm, setShowAddForm] = useState(false);
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            name: "John Doe",
            phone: "1234567890",
            type: "Home",
            isDefault: true,
            address: "123 Main St, Anytown, USA",
            city: "Anytown",
            state: "Anytown",
            postalCode: "123456",
            country: "USA",
        },
    ]);

    const formSubmit = (data) => {
        console.log(data);
    };

    return (
        <ProfileSidebar>
            <div className="flex justify-between items-center gap-4 mb-6">
                <h2 className="text-2xl font-medium text-secondary">My Address</h2>

                <div className="flex gap-3">
                    <button
                        className={`${formBtn3} border-b`}
                        onClick={() => setShowAddForm(true)}
                    >
                        Add New Address
                    </button>
                </div>
            </div>

            {/* Address List */}
            {addresses?.length > 0 && !showAddForm && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-scroll">
                    {addresses.map((address) => (
                        <AddressCard key={address?.id} address={address} setShowAddForm={setShowAddForm} />
                    ))}
                </div>
            )}

            {addresses?.length === 0 && !showAddForm && (
                <div className="flex flex-col items-center justify-center h-full space-y-6">
                    <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                        <svg
                            className="w-16 h-16 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </div>
                    <p className="text-slate-500 mb-4 font-tbPop font-normal">
                        No saved address. Add a new address to get started.
                    </p>
                </div>
            )}

            {showAddForm && (
                <div className="bg-white rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">
                        {showAddForm ? "Edit Address" : "Add New Address"}
                    </h2>

                    <form onSubmit={handleSubmit(formSubmit)} className="space-y-6">
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
                                    style="!bg-slate-100"
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
                                    style="!bg-slate-100"
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
                                    style="!bg-slate-100"
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
                                <div className="flex gap-2">
                                    {["Home", "Office", "Friend", "Other"].map((type) => (
                                        <Controller
                                            name="type"
                                            control={control}
                                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                                <button
                                                    key={type}
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
                                style="!bg-slate-100"
                                registerName="address"
                                props={{
                                    ...register('address', {
                                        required: "Message is required",
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
                                    style="!bg-slate-100"
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
                                    type="tel"
                                    style="!bg-slate-100"
                                    registerName="postalCode"
                                    props={{
                                        ...register('postalCode', {
                                            pattern: {
                                                value: /^[1-9][0-9]{5}$/,
                                                message: "Invalid pincode format"
                                            },
                                            minLength: {
                                                value: 6,
                                                message: "Postal Code must be at least 6 characters",
                                            },
                                            maxLength: {
                                                value: 6,
                                                message: "Postal Code cannot exceed 6 characters",
                                            },
                                        }),
                                        maxLength: 6,
                                        minLength: 6
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
                                        style="!bg-slate-100"
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
                                        style="!bg-slate-100"
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

                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-4 justify-self-end">
                            <button
                                type="button"
                                onClick={() => setShowAddForm(false)}
                                className="px-6 py-2 rounded-md border border-gray-900 text-gray-900 bg-white hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={`${formBtn3}`}
                            >
                                {showAddForm ? "Save Changes" : "Add Address"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </ProfileSidebar>
    );
};

const AddressCard = ({ address, setShowAddForm }) => {
    return (
        <div
            key={address?.id}
            className="bg-slate-100 rounded-lg p-4 "
        >
            <div className="flex flex-col md:flex-row justify-between items-start gap-3">
                <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-center">
                        <h3 className="font-medium font-tbLex text-slate-800">
                            {address?.name}
                        </h3>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowAddForm(true)}
                                className={"flex items-center justify-center border rounded border-black bg-transparent !racking-tight !text-black px-3.5 py-2 font-tbLex text-sm"}
                            >
                                <NotePencil size={20} className="mr-1 text-slate-700" />
                                Edit
                            </button>

                            <button
                                disabled
                                className={"flex items-center justify-center !racking-tight  px-3.5 py-2 !bg-red-500 !text-white rounded font-tbLex text-sm"}
                            >
                                <Trash size={20} className="mr-1 text-white" />
                                Delete
                            </button>
                        </div>
                    </div>
                    <p className="text-slate-500 font-tbPop font-normal text-sm">{address?.phone}</p>
                    <p className="text-slate-500 font-tbPop font-normal text-sm">{address?.address}</p>
                    <p className="text-slate-500 font-tbPop font-normal text-sm">
                        {address?.city}, {address?.state} {address?.postalCode},{" "}
                        {address?.country}
                    </p>
                </div>
            </div>
            <div className="flex justify-between items-center pt-3">
                <p className="text-slate-600 font-tbPop font-normal text-sm">• Default Address</p>
                <p className="text-slate-600 font-tbPop font-normal text-sm">• {address?.type}</p>
            </div>
        </div>
    );
};

export default AddressPage;
