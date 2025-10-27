import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '../TextInput/TextInput';
import toast from 'react-hot-toast';
import { editUserCustomer } from '../../api';
import { useSelector, useDispatch } from 'react-redux';
import { validateAlphabets } from '../../utils/validateFunction';
import { X, CheckCircle, Gift, User, Phone, Users, CheckSquare, Square } from 'lucide-react';
import LoadBox from '../Loader/LoadBox';
import SelectTextInput from '../TextInput/SelectTextInput';
import { setUserDetails } from '../../redux/Slices/loginSlice';


function ReferralPromptModal({ open, toggle }) {
    const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm();
    const user = useSelector(state => state.user.userDetails);
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [showOnlyReferral, setShowOnlyReferral] = useState(false);
    const [dontShowAgain, setDontShowAgain] = useState(false);

    const isProfileComplete = user?.firstName && user?.lastName && user?.mobileNo && user?.gender;

    useEffect(() => {
        if (open && user) {
            setValue('firstName', user?.firstName || '');
            setValue('lastName', user?.lastName || '');
            setValue('mobileNo', user?.mobileNo || '');
            setValue('gender', user?.gender || '');
            setShowOnlyReferral(isProfileComplete);
        }
    }, [open, user, setValue, isProfileComplete]);

    const formSubmit = async (data) => {
        try {
            setLoader(true);
            const payload = {
                ...data,
                id: user?._id
            };

            const res = await editUserCustomer(payload);
            if (res?.success) {
                dispatch(setUserDetails(res?.data?.user));

                if (!showOnlyReferral) {
                    setShowOnlyReferral(true);
                    toast.success('Profile updated successfully! Now enter your referral code.');
                } else {
                    if (dontShowAgain) {
                        localStorage.setItem(`dontShowReferralModal_${user?._id}`, 'true');
                    }
                    toggle();
                    toast.success(res?.message || 'Referral code added successfully!');
                    reset();
                }
            } else {
                toast.error(res?.message || "Something went wrong");
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        if (!open) {
            reset({
                firstName: '',
                lastName: '',
                mobileNo: '',
                gender: '',
                referralCode: '',
            });
            setShowOnlyReferral(false);
            setDontShowAgain(false);
        }
    }, [open, reset]);

    const validatePhoneNumber = (value) => {
        if (!value) return true;
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(value) || 'Phone number must be 10 digits';
    };

    return (
        <>
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
                        <div className="fixed inset-0 backdrop-blur-[2.3px] bg-black/30" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                                    {/* Header */}
                                    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
                                        <button
                                            onClick={toggle}
                                            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-all"
                                        >
                                            <X size={24} className="text-white" />
                                        </button>

                                        <div className="flex items-center gap-3 mb-2">
                                            {showOnlyReferral ? (
                                                <>
                                                    <Gift size={28} className="text-yellow-300" />
                                                    <h2 className="text-2xl md:text-3xl font-bold text-white">Enter Referral Code</h2>
                                                </>
                                            ) : (
                                                <>
                                                    <User size={28} className="text-yellow-300" />
                                                    <h2 className="text-2xl md:text-3xl font-bold text-white">Complete Your Profile</h2>
                                                </>
                                            )}
                                        </div>
                                        <p className="text-blue-100 text-sm">
                                            {showOnlyReferral
                                                ? 'Got a referral code? Enter it here to unlock rewards!'
                                                : 'Please fill in your details to continue'}
                                        </p>
                                    </div>

                                    {/* Form Container */}
                                    <div className="p-6 md:p-8">
                                        {/* Progress Bar */}
                                        {!showOnlyReferral && (
                                            <div className="mb-8">
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="text-sm font-semibold text-gray-700">Profile Completion</span>
                                                    <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                                                        {isProfileComplete ? '100%' : '0%'}
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                                    <div
                                                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500"
                                                        style={{ width: isProfileComplete ? '100%' : '0%' }}
                                                    ></div>
                                                </div>
                                            </div>
                                        )}

                                        <form onSubmit={handleSubmit(formSubmit)}>
                                            {!showOnlyReferral ? (
                                                // Profile Completion Form
                                                <div className="space-y-6">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        {/* First Name */}
                                                        <div>
                                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                                First Name <span className="text-red-500">*</span>
                                                            </label>
                                                            <TextInput
                                                                placeholder="Enter first name"
                                                                type="text"
                                                                registerName="firstName"
                                                                props={{
                                                                    ...register('firstName', {
                                                                        required: "First name is required",
                                                                        validate: validateAlphabets,
                                                                        minLength: { value: 2, message: "Minimum 2 characters" }
                                                                    }),
                                                                    className: "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                                                }}
                                                                errors={errors.firstName}
                                                            />
                                                        </div>

                                                        {/* Last Name */}
                                                        <div>
                                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                                Last Name <span className="text-red-500">*</span>
                                                            </label>
                                                            <TextInput
                                                                placeholder="Enter last name"
                                                                type="text"
                                                                registerName="lastName"
                                                                props={{
                                                                    ...register('lastName', {
                                                                        required: "Last name is required",
                                                                        validate: validateAlphabets,
                                                                        minLength: { value: 2, message: "Minimum 2 characters" }
                                                                    }),
                                                                    className: "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                                                }}
                                                                errors={errors.lastName}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        {/* Phone Number */}
                                                        <div>
                                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                                <Phone size={16} className="inline mr-2" />
                                                                Phone Number <span className="text-red-500">*</span>
                                                            </label>
                                                            <TextInput
                                                                placeholder="10 digit phone number"
                                                                type="tel"
                                                                registerName="mobileNo"
                                                                props={{
                                                                    ...register('mobileNo', {
                                                                        validate: validatePhoneNumber,
                                                                        required: "Phone number is required"
                                                                    }),
                                                                    maxLength: 10,
                                                                    minLength: 10,
                                                                    className: "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                                                }}
                                                                errors={errors.mobileNo}
                                                            />
                                                        </div>

                                                        {/* Gender */}
                                                        <div>
                                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                                <Users size={16} className="inline mr-2" />
                                                                Gender <span className="text-red-500">*</span>
                                                            </label>
                                                            <div>
                                                                <SelectTextInput
                                                                    placeholder="Select Gender"
                                                                    registerName="gender"
                                                                    options={[
                                                                        { value: 'male', label: '👨 Male' },
                                                                        { value: 'female', label: '👩 Female' },
                                                                        { value: 'other', label: '🧑 Other' },
                                                                    ]}
                                                                    props={{
                                                                        ...register('gender', { required: "Gender is required" }),
                                                                        value: watch('gender') || ''
                                                                    }}
                                                                    errors={errors.gender}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Info Box */}
                                                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                                                        <p className="text-sm text-blue-900">
                                                            <CheckCircle size={16} className="inline mr-2 text-blue-500" />
                                                            Complete your profile to unlock exclusive referral rewards!
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                // Referral Code Only Form
                                                <div className="space-y-6">
                                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-4 rounded">
                                                        <p className="text-sm text-green-900 font-semibold">
                                                            <CheckCircle size={16} className="inline mr-2 text-green-500" />
                                                            Your profile is complete!
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                            <Gift size={16} className="inline mr-2 text-yellow-500" />
                                                            Referral Code <span className="text-gray-400">(Optional)</span>
                                                        </label>
                                                        <TextInput
                                                            placeholder="Enter a referral code to earn rewards"
                                                            type="text"
                                                            registerName="referralCode"
                                                            props={{
                                                                ...register('referralCode'),
                                                                className: "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all uppercase"
                                                            }}
                                                            errors={errors.referralCode}
                                                        />
                                                    </div>

                                                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => setDontShowAgain(!dontShowAgain)}
                                                            className="flex items-center gap-3 w-full text-left hover:bg-amber-100/50 p-2 rounded transition-colors"
                                                        >
                                                            {dontShowAgain ? (
                                                                <CheckSquare size={20} className="text-purple-600 flex-shrink-0" />
                                                            ) : (
                                                                <Square size={20} className="text-gray-400 flex-shrink-0" />
                                                            )}
                                                            <span className="text-sm font-medium text-gray-700">
                                                                Don't show this again
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex gap-3 pt-10">
                                                <button
                                                    type="button"
                                                    onClick={toggle}
                                                    className="flex-1 px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
                                                >
                                                    {showOnlyReferral ? 'Skip' : 'Cancel'}
                                                </button>
                                                {loader ? (
                                                    <div className="flex-1">
                                                        <LoadBox className="flex-1 w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer " />
                                                    </div>
                                                ) : (
                                                    <button
                                                        type='submit'
                                                        className="flex-1 px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                                                    >
                                                        {showOnlyReferral ? 'Submit' : 'Complete Profile'}
                                                    </button>
                                                )}
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default ReferralPromptModal;
