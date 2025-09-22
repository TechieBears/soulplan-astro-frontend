import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { formBtn1 } from '../../../utils/CustomClass';
import LoadBox from '../../Loader/LoadBox';
import TextInput from '../../TextInput/TextInput';
import { validateAlphabets, validateEmail } from '../../../utils/validateFunction';
import toast from 'react-hot-toast';
import { Edit } from 'iconsax-reactjs';
import { respondFeedback } from '../../../api';
import { TableTitle } from '../../../helper/Helper';
import SelectTextInput from '../../TextInput/SelectTextInput';

function SendFeedbackReplay({ edit, userData, setRefreshTrigger }) {
    const { register, handleSubmit, control, watch, reset, formState: { errors }, setValue } = useForm();
    const [open, setOpen] = useState(false);
    const toggle = () => { setOpen(!open), reset() };
    const [loader, setLoader] = useState(false);

    const formSubmit = async (data) => {
        try {
            setLoader(true);
            const updatedData = {
                message: data?.message,
                subject: data?.subject,
                greeting: data?.greeting,
                signature: data?.signature,
            }
            if (edit) {
                await respondFeedback(userData?._id, updatedData).then(res => {
                    if (res?.success) {
                        toast.success(res?.message)
                        setLoader(false);
                        reset();
                        setRefreshTrigger(prev => prev + 1);
                        toggle();
                    } else {
                        toast.error(res?.message || "Something went wrong")
                        setLoader(false);
                    }
                })
            }
        } catch (error) {
            console.log('Error submitting form:', error);
            setLoader(false);
            toast.error("Failed to add Employee");
        }
    }

    return (
        <>
            {
                edit && <button onClick={toggle}>
                    <Edit className='text-yellow-500' size={20} />
                </button>
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
                                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-lg bg-white  text-left align-middle shadow-xl transition-all">
                                    <TableTitle
                                        title={"Send Feedback Replay"}
                                        toggle={toggle}
                                    />
                                    <div className=" bg-white">
                                        {/* React Hook Form */}
                                        <form onSubmit={handleSubmit(formSubmit)} >
                                            <div className='p-5 py-8 flex flex-col  gap-x-3 gap-y-5' >
                                                <div className="">
                                                    <h4
                                                        className="text-sm font-tbLex font-normal text-slate-400 pb-2.5"
                                                    >
                                                        Message
                                                    </h4>
                                                    <TextInput
                                                        label="Enter Message*"
                                                        placeholder="Enter Message"
                                                        type="text"
                                                        registerName="message"
                                                        props={{ ...register('message', { required: "Message is required", validate: validateAlphabets }), minLength: 3 }}
                                                        errors={errors.message}
                                                    />
                                                </div>
                                                <div className="">
                                                    <h4
                                                        className="text-sm font-tbLex font-normal text-slate-400 pb-2.5"
                                                    >
                                                        Subject
                                                    </h4>
                                                    <TextInput
                                                        label="Enter Subject*"
                                                        placeholder="Enter Subject"
                                                        type="text"
                                                        registerName="subject"
                                                        props={{ ...register('subject', { required: "Subject is required", validate: validateAlphabets }), minLength: 3 }}
                                                        errors={errors.subject}
                                                    />
                                                </div>
                                                <div className="">
                                                    <h4
                                                        className="text-sm font-tbLex font-normal text-slate-400 pb-2.5"
                                                    >
                                                        Greeting
                                                    </h4>
                                                    <TextInput
                                                        label="Enter Greeting"
                                                        placeholder="Enter Greeting"
                                                        type="text"
                                                        registerName="greeting"
                                                        props={{ ...register('greeting'), valdate: validateEmail, required: "Greeting is required" }}
                                                        errors={errors.greeting}
                                                    />
                                                </div>
                                                <div className="">
                                                    <h4
                                                        className="text-sm font-tbLex font-normal text-slate-400 pb-2.5"
                                                    >
                                                        Signature
                                                    </h4>
                                                    <div className="">
                                                        <SelectTextInput
                                                            label="Select Signature"
                                                            registerName="signature"
                                                            options={[
                                                                { value: '', label: 'Select Signature' },
                                                                { value: '1', label: 'Signature 1' },
                                                                { value: '2', label: 'Signature 2' },
                                                                { value: '3', label: 'Signature 3' },
                                                            ]}
                                                            placeholder="Select Signature"
                                                            props={{
                                                                ...register('signature', { required: true }),
                                                                value: watch('signature') || ''
                                                            }}
                                                            errors={errors.signature}
                                                            defaultValue={userData?.signature}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <footer className="py-3 flex bg-slate-100 justify-end px-4 space-x-3">
                                                {loader ? <LoadBox className={formBtn1} /> : <button type='submit' className={formBtn1}>Send </button>}
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
    )
}

export default SendFeedbackReplay
