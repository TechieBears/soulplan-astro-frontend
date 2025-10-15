import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import LoadBox from '../Loader/LoadBox';
import ImageUploadInput from '../TextInput/ImageUploadInput';
import TextInput from '../TextInput/TextInput';
import { formBtn1, formBtn3 } from '../../utils/CustomClass';
import { TableTitle } from '../../helper/Helper';
import SelectTextInput from '../TextInput/SelectTextInput';
import { Star, X } from "@phosphor-icons/react";
import CustomTextArea from '../TextInput/CustomTextArea';
import { useSelector } from 'react-redux';
import { getPublicServicesDropdown, getProductsDropdown } from '../../api';
import { createTestimonial } from '../../api';


function TestimonialModal() {
    const [open, setOpen] = useState(false);

    const { register, handleSubmit, control, watch, reset, formState: { errors }, setValue } = useForm({
        defaultValues: {
            testimonial_for: '',
            service_id: '',
            product_id: '',
            message: '',
            rating: 0,
            city: '',
            state: '',
            country: ''
        }
    });

    const user = useSelector((state) => state.user.userDetails);
    const isLogged = useSelector((state) => state.user.isLogged);

    const [loader, setLoader] = useState(false);
    const [services, setServices] = useState([]);
    const [products, setProducts] = useState([]);
    const [cityLoading, setCityLoading] = useState(false);

    const city = watch('city');
    const testimonialFor = watch('testimonial_for');

    useEffect(() => {
        if (testimonialFor === 'services') {
            setValue('product_id', '');
        } else if (testimonialFor === 'products') {
            setValue('service_id', '');
        }
    }, [testimonialFor, setValue]);

    const toggle = () => {
        setOpen(!open);
        reset();
    };

    useEffect(() => {
        const fetchCityDetails = async () => {
            if (!city || city.trim().length < 3) {
                return;
            }

            const cityName = city.trim();
            setCityLoading(true);

            try {
                const res = await fetch(`https://api.postalpincode.in/postoffice/${cityName}`);
                const data = await res.json();

                if (data[0]?.Status === "Success") {
                    const postOffice = data[0].PostOffice?.[0];
                    if (postOffice) {
                        setValue("state", postOffice.State, { shouldValidate: true });
                        setValue("country", "India", { shouldValidate: true });
                    }
                } else {
                    console.log("City not found or invalid.");
                }
            } catch (err) {
                console.error("City API error:", err);
            } finally {
                setCityLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchCityDetails();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [city, setValue]);

    useEffect(() => {
        const fetchDropdowns = async () => {
            try {
                const [servicesRes, productsRes] = await Promise.all([
                    getPublicServicesDropdown(),
                    getProductsDropdown()
                ]);

                if (servicesRes?.success) {
                    setServices(servicesRes.data || []);
                }
                if (productsRes?.success) {
                    setProducts(productsRes.data || []);
                }
            } catch (error) {
                console.error('Error fetching dropdowns:', error);
            }
        };

        if (open) {
            fetchDropdowns();
        }
    }, [open]);

    const formSubmit = async (data) => {
        if (!isLogged) {
            toast.error('Please login to share your experience');
            return;
        }

        if (data.rating === 0) {
            toast.error('Please provide a rating');
            return;
        }

        try {
            setLoader(true);
            const testimonialData = {
                user_id: user?._id,
                service_id: data.service_id || null,
                product_id: data.product_id || null,
                message: data.message,
                rating: data.rating,
                media: data.media,
                city: data.city,
                state: data.state,
                country: data.country
            };

            const res = await createTestimonial(testimonialData);

            if (res?.success) {
                toast.success(res?.message || 'Thank you for sharing your experience!');
                setLoader(false);
                toggle();
            } else {
                toast.error(res?.message || 'Something went wrong');
                setLoader(false);
            }
        } catch (error) {
            console.error('Error submitting testimonial:', error);
            setLoader(false);
            toast.dismiss();
            toast.error('Failed to submit testimonial');
        }
    };
    return <>
        <button className={`btn justify-self-center ${formBtn3} !w-fit`} onClick={toggle}>Share Your Experience</button>

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
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white  text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h2"
                                    className="text-lg text-white w-full bg-linear-gradient font-tbLex leading-6  py-5 px-5 relative z-10"
                                >

                                    Share Your Experience

                                    <div className="absolute right-5 top-5">
                                        <X onClick={() => toggle()} className='text-white   hover:text-slate-200 cursor-pointer' size={30} />
                                    </div>
                                </Dialog.Title>
                                <div className=" bg-slate1">
                                    <form onSubmit={handleSubmit(formSubmit)} >
                                        <div className="bg-white px-4 pb-5 pt-5 sm:p-6 sm:pb-4">
                                            <div className='grid grid-cols-1 gap-x-5 gap-y-5' >
                                                <div className=''>
                                                    <h4 className="text-sm font-tbLex font-normal text-slate-400 pb-2.5">Write Testimonials For (Optional) <span className="text-red-500 text-xs font-tbLex">*</span></h4>
                                                    <SelectTextInput
                                                        label="Select Your Testimonial For"
                                                        registerName="testimonial_for"
                                                        options={[
                                                            { value: 'products', label: 'Products' },
                                                            { value: 'services', label: 'Services' },
                                                        ]}
                                                        placeholder="Select Your Testimonial For"
                                                        props={{ ...register('testimonial_for', { required: false }) }}
                                                        errors={errors.testimonial_for}
                                                        defaultValue={''}
                                                    />
                                                </div>
                                                {testimonialFor === 'services' && <div className=''>
                                                    <h4 className="text-sm font-tbLex font-normal text-slate-400 pb-2.5">Your Service <span className="text-red-500 text-xs font-tbLex">*</span></h4>
                                                    <SelectTextInput
                                                        label="Select Your Service"
                                                        registerName="service_id"
                                                        options={services?.map((service) => ({ value: service._id, label: service.name }))}
                                                        placeholder="Select Your Service"
                                                        props={{ ...register('service_id', { required: false }) }}
                                                        errors={errors.service_id}
                                                        defaultValue={''}
                                                    />
                                                </div>}

                                                {testimonialFor === 'products' && <div className=''>
                                                    <h4 className="text-sm font-tbLex font-normal text-slate-400 pb-2.5">Your Product <span className="text-red-500 text-xs font-tbLex">*</span></h4>
                                                    <SelectTextInput
                                                        label="Select Your Product"
                                                        registerName="product_id"
                                                        options={products?.map((product) => ({ value: product._id, label: product.name }))}
                                                        placeholder="Select Your Product"
                                                        props={{ ...register('product_id', { required: false }) }}
                                                        errors={errors.product_id}
                                                        defaultValue={''}
                                                    />
                                                </div>}

                                                <div className=''>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Rating <span className="text-red-500">*</span>
                                                    </label>
                                                    <Controller
                                                        name="rating"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <div className="flex items-center gap-1">
                                                                {[1, 2, 3, 4, 5].map((star) => (
                                                                    <button
                                                                        key={star}
                                                                        type="button"
                                                                        onClick={() => field.onChange(star)}
                                                                        className="focus:outline-none"
                                                                    >
                                                                        <Star
                                                                            className={`w-6 h-6 ${star <= field.value
                                                                                ? "text-yellow-400 fill-current"
                                                                                : "text-gray-300"
                                                                                } hover:text-yellow-400 transition-colors`}

                                                                            weight={star <= field.value ? "fill" : "regular"}
                                                                        />
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}
                                                    />
                                                </div>
                                                <div className=''>
                                                    <h4
                                                        className="text-sm font-tbLex font-normal text-slate-400 pb-2.5"
                                                    >
                                                        Your Image <span className="text-red-500 text-xs font-tbLex">*</span>
                                                    </h4>
                                                    <ImageUploadInput
                                                        label="Upload Your Image"
                                                        multiple={false}
                                                        registerName="media"
                                                        errors={errors.media}
                                                        {...register("media", { required: "Your Image is required" })}
                                                        register={register}
                                                        setValue={setValue}
                                                        control={control}
                                                        defaultValue={''}
                                                    />
                                                </div>
                                                <div className="">
                                                    <h4
                                                        className="text-sm font-tbLex font-normal text-slate-800 pb-2.5"
                                                    >
                                                        Your Experience <span className="text-red-500 text-xs font-tbLex">*</span>
                                                    </h4>
                                                    <CustomTextArea
                                                        label="Enter Your Experience"
                                                        placeholder="Enter Your Experience"
                                                        registerName="message"
                                                        props={{
                                                            ...register('message', {
                                                                required: "Your Experience is required",
                                                                minLength: {
                                                                    value: 50,
                                                                    message: "Your Experience must be at least 50 characters"
                                                                }
                                                            })
                                                        }}
                                                        errors={errors.message}
                                                    />
                                                </div>
                                                <div className='grid grid-cols-12 gap-x-5 gap-y-5'>
                                                    <div className='col-span-4'>
                                                        <h4
                                                            className="text-sm font-tbLex font-normal text-slate-400 pb-2.5"
                                                        >
                                                            Your City <span className="text-red-500 text-xs font-tbLex">*</span>
                                                        </h4>
                                                        <TextInput
                                                            label="Enter Your City"
                                                            placeholder="Enter Your City"
                                                            type="text"
                                                            registerName="city"
                                                            props={{
                                                                ...register('city', {
                                                                    required: "Your City is required",
                                                                    pattern: {
                                                                        value: /^[a-zA-Z\s]*$/,
                                                                        message: "Your City name can only contain letters"
                                                                    }
                                                                })
                                                            }}
                                                            errors={errors.city}
                                                        />
                                                    </div>
                                                    <div className="col-span-4">
                                                        <h4
                                                            className="text-sm font-tbLex font-normal text-slate-400 pb-2.5"
                                                        >
                                                            Your State <span className="text-red-500 text-xs font-tbLex">*</span>
                                                        </h4>
                                                        <div className="">
                                                            <TextInput
                                                                label="Enter Your State"
                                                                placeholder="Enter Your State"
                                                                type="text"
                                                                registerName="state"
                                                                props={{
                                                                    ...register('state', {
                                                                        required: "Your State is required",
                                                                        pattern: {
                                                                            value: /^[a-zA-Z\s]*$/,
                                                                            message: "Your State name can only contain letters"
                                                                        }
                                                                    })
                                                                }}
                                                                errors={errors.state}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-4">
                                                        <h4
                                                            className="text-sm font-tbLex font-normal text-slate-400 pb-2.5"
                                                        >
                                                            Your Country <span className="text-red-500 text-xs font-tbLex">*</span>
                                                        </h4>
                                                        <div className="">
                                                            <SelectTextInput
                                                                label="Select Your Country"
                                                                registerName="country"
                                                                options={[
                                                                    { value: 'India', label: 'India' },
                                                                    { value: 'USA', label: 'USA' },
                                                                    { value: 'Canada', label: 'Canada' },
                                                                    { value: 'other', label: 'Other' },
                                                                ]}
                                                                placeholder="Select Your Country"
                                                                props={{
                                                                    ...register('country', { required: "Your Country is required" }),
                                                                    value: watch('country') || ''
                                                                }}
                                                                errors={errors.country}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <footer className="py-3 flex bg-primary/5 justify-end px-4 space-x-3">
                                            {loader ? <LoadBox className={formBtn1} /> : <button type='submit' className={formBtn1}>submit</button>}
                                        </footer>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition >
    </>;
}

export default TestimonialModal
