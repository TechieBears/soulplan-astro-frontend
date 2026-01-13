import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { X } from "@phosphor-icons/react";
import { useSearchParams } from 'react-router-dom';
import LoadBox from '../Loader/LoadBox';
import ImageCropUpload from '../TextInput/ImageCropUpload';
import TextInput from '../TextInput/TextInput';
import SelectTextInput from '../TextInput/SelectTextInput';
import CustomTextArea from '../TextInput/CustomTextArea';
import GradientButton from '../Buttons/GradientButton';
import { formBtn1 } from '../../utils/CustomClass';
import { getPublicServicesDropdown, createTestimonial } from '../../api';


function TestimonialModal() {
    const [open, setOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const { register, handleSubmit, watch, reset, formState: { errors }, setValue } = useForm({
        defaultValues: { service_id: '', message: '', city: '', state: '', country: '' }
    });

    const { userDetails: user, isLogged } = useSelector((state) => state.user);
    const [loader, setLoader] = useState(false);
    const [services, setServices] = useState([]);
    const city = watch('city');

    const toggle = () => {
        setOpen(!open);
        reset();
    };

    useEffect(() => {
        if (searchParams.get('openTestimonial') === 'true') {
            setOpen(true);
            searchParams.delete('openTestimonial');
            setSearchParams(searchParams, { replace: true });
        }
    }, [searchParams, setSearchParams]);

    useEffect(() => {
        if (!city?.trim()) {
            setValue("state", "");
            setValue("country", "");
            return;
        }

        if (city.trim().length < 3) return;

        const timeoutId = setTimeout(async () => {
            try {
                const res = await fetch(`https://api.postalpincode.in/postoffice/${city.trim()}`);
                const data = await res.json();
                const postOffice = data[0]?.PostOffice?.[0];
                if (postOffice) {
                    setValue("state", postOffice.State, { shouldValidate: true });
                    setValue("country", "India", { shouldValidate: true });
                } else {
                    setValue("state", "");
                    setValue("country", "");
                }
            } catch (err) {
                console.error("City API error:", err);
                setValue("state", "");
                setValue("country", "");
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [city, setValue]);

    useEffect(() => {
        if (!open) return;
        
        getPublicServicesDropdown()
            .then(res => res?.success && setServices(res.data || []))
            .catch(err => console.error('Error fetching services:', err));
    }, [open]);

    const formSubmit = async (data) => {
        if (!isLogged) return toast.error('Please login to share your experience');

        setLoader(true);
        try {
            const formData = new FormData();
            formData.append('user_id', user?._id);
            formData.append('service_id', data.service_id || '');
            formData.append('message', data.message);
            formData.append('media', data.media);
            formData.append('city', data.city);
            formData.append('state', data.state);
            formData.append('country', data.country);

            const res = await createTestimonial(formData);

            if (res?.success) {
                toast.success(res?.message || 'Thank you for sharing your experience!');
                toggle();
            } else {
                toast.error(res?.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error submitting testimonial:', error);
            toast.error('Failed to submit testimonial');
        } finally {
            setLoader(false);
        }
    };
    const COUNTRY_OPTIONS = [
        { value: 'India', label: 'India' },
        { value: 'USA', label: 'USA' },
        { value: 'Canada', label: 'Canada' },
        { value: 'other', label: 'Other' }
    ];

    const LABEL_CLASS = "text-sm font-tbLex font-normal text-slate-400 pb-2.5";
    const REQUIRED_MARK = <span className="text-red-500 text-xs font-tbLex">*</span>;

    return (
        <>
            <GradientButton className="btn justify-self-center !w-fit" onClick={toggle}>
                Share Your Experience
            </GradientButton>

            {open && (
                <div className="fixed inset-0 z-[1000] overflow-y-auto scrollbars" onClick={toggle}>
                    <div className="fixed inset-0 backdrop-blur-[2.3px] bg-black/20 transition-opacity duration-300" />
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div 
                            className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all animate-in fade-in zoom-in-95 duration-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="text-lg text-white w-full bg-linear-gradient font-tbLex leading-6 py-5 px-5 relative z-10">
                                <h2>
                                    Share Your Experience
                                </h2>
                                <button onClick={toggle} className="absolute right-5 top-5 text-white hover:text-slate-200">
                                    <X size={30} />
                                </button>
                            </div>
                                <div className="bg-slate1">
                                    <form onSubmit={handleSubmit(formSubmit)} >
                                        <div className="bg-white px-4 pb-5 pt-5 sm:p-6 sm:pb-4">
                                            <div className='grid grid-cols-1 gap-5'>
                                                <div>
                                                    <h4 className={LABEL_CLASS}>Your Service {REQUIRED_MARK}</h4>
                                                    <SelectTextInput
                                                        label="Select Your Service"
                                                        registerName="service_id"
                                                        options={services.map(s => ({ value: s._id, label: s.name }))}
                                                        placeholder="Select Your Service"
                                                        props={{ ...register('service_id') }}
                                                        errors={errors.service_id}
                                                    />
                                                </div>

                                                <div>
                                                    <h4 className={LABEL_CLASS}>
                                                        Your Image {REQUIRED_MARK} <span className="text-[11px] text-orange-500">(Recommended: 315px × 200px)</span>
                                                    </h4>
                                                    <ImageCropUpload
                                                        label="Upload Your Image"
                                                        registerName="media"
                                                        errors={errors.media}
                                                        {...register("media", { required: "Image is required" })}
                                                        register={register}
                                                        setValue={setValue}
                                                        cropAspectRatio={1.575}
                                                        cropWidth={315}
                                                        cropHeight={200}
                                                        shouldUploadToCloudinary={false}
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-tbLex font-normal text-slate-800 pb-2.5">
                                                        Your Experience {REQUIRED_MARK}
                                                    </h4>
                                                    <CustomTextArea
                                                        label="Enter Your Experience"
                                                        placeholder="Enter Your Experience"
                                                        registerName="message"
                                                        props={{
                                                            ...register('message', {
                                                                required: "Experience is required",
                                                                minLength: { value: 50, message: "Minimum 50 characters required" }
                                                            })
                                                        }}
                                                        errors={errors.message}
                                                    />
                                                </div>
                                                <div className='grid grid-cols-12 gap-5'>
                                                    <div className='col-span-4'>
                                                        <h4 className={LABEL_CLASS}>Your City {REQUIRED_MARK}</h4>
                                                        <TextInput
                                                            label="Enter Your City"
                                                            placeholder="Enter Your City"
                                                            type="text"
                                                            registerName="city"
                                                            props={{
                                                                ...register('city', {
                                                                    required: "City is required",
                                                                    pattern: { value: /^[a-zA-Z\s]*$/, message: "Only letters allowed" }
                                                                })
                                                            }}
                                                            errors={errors.city}
                                                        />
                                                    </div>
                                                    <div className="col-span-4">
                                                        <h4 className={LABEL_CLASS}>Your State {REQUIRED_MARK}</h4>
                                                            <TextInput
                                                                label="Enter Your State"
                                                                placeholder="Enter Your State"
                                                                type="text"
                                                                registerName="state"
                                                                props={{
                                                                    ...register('state', {
                                                                        required: "State is required",
                                                                        pattern: { value: /^[a-zA-Z\s]*$/, message: "Only letters allowed" }
                                                                    })
                                                                }}
                                                                errors={errors.state}
                                                            />
                                                    </div>
                                                    <div className="col-span-4">
                                                        <h4 className={LABEL_CLASS}>Your Country {REQUIRED_MARK}</h4>
                                                            <SelectTextInput
                                                                label="Select Your Country"
                                                                registerName="country"
                                                                options={COUNTRY_OPTIONS}
                                                                placeholder="Select Your Country"
                                                                props={{
                                                                    ...register('country', { required: "Country is required" }),
                                                                    value: watch('country') || ''
                                                                }}
                                                                errors={errors.country}
                                                            />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <footer className="py-3 flex bg-primary/5 justify-end px-4 space-x-3">
                                            {loader ? <LoadBox className={formBtn1} /> : <button type='submit' className={formBtn1}>Submit</button>}
                                        </footer>
                                    </form>
                                </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default TestimonialModal;
