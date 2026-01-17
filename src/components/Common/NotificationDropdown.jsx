import { useEffect, useState, useRef } from "react";
import { NotificationBing, SmsNotification } from "iconsax-reactjs";
import { getNotificationsDropdownCustomer, getNotificationsDropdown, clearAllNotifications } from "../../api";
import toast from "react-hot-toast";
import moment from "moment";
import { formBtn1 } from "../../utils/CustomClass";

const NotificationDropdown = ({ isCustomer = true }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notificationsDropdown, setNotificationsDropdown] = useState([]);

    const trigger = useRef(null);
    const dropdown = useRef(null);

    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!dropdown.current) return;
            if (
                !dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setDropdownOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    const fetchNotificationsDropdown = async () => {
        try {
            const res = isCustomer 
                ? await getNotificationsDropdownCustomer() 
                : await getNotificationsDropdown();
            if (res?.success) {
                setNotificationsDropdown(res?.data);
            } else {
                setNotificationsDropdown([]);
                toast.error(res?.message || res?.error || 'Failed to fetch notifications dropdown');
            }
        } catch (error) {
            console.log("==========error in fetchNotificationsDropdown", error);
        }
    }

    const clearAllNotificationHandler = async () => {
        try {
            const res = await clearAllNotifications();
            if (res?.success) {
                toast.success(res?.message || res?.success || 'Notifications cleared successfully');
                setDropdownOpen(false);
                fetchNotificationsDropdown();
            } else {
                toast.error(res?.message || res?.error || 'Failed to clear notifications');
            }
        }
        catch (error) {
            console.log("==========error in clearAllNotifications", error);
            toast.error(error?.message || error?.error || 'Failed to clear notifications');
        }
    }

    useEffect(() => {
        fetchNotificationsDropdown();
    }, []);

    return (
        <section className="">
            <div className="container">
                <div className="flex justify-center">
                    <div className="relative inline-block">
                        <button 
                            className={`relative ${!isCustomer && notificationsDropdown?.length === 0 ? 'disabled:cursor-not-allowed' : ''}`}
                            ref={trigger}
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            disabled={!isCustomer && notificationsDropdown?.length === 0}
                        >
                            {notificationsDropdown?.length > 0 && <span className="absolute flex top-0 -right-2 h-3.5 w-3.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>}
                            <div className={`flex items-center space-x-2 ${isCustomer ? 'p-2' : 'p-1.5'} bg-slate-100 rounded-full`}>
                                <NotificationBing size="26" className='text-black' variant='TwoTone' />
                            </div>
                        </button>
                        <div
                            ref={dropdown}
                            onFocus={() => setDropdownOpen(true)}
                            onBlur={() => setDropdownOpen(false)}
                            className={`absolute right-0 top-14 py-5 w-[350px] overflow-hidden rounded-lg z-50 bg-white shadow-lg border border-slate-100 transition-all ease-in-out duration-500 ${dropdownOpen ? "block opacity-100 transition-all ease-in-out duration-500" : "hidden opacity-0 transition-all ease-in-out duration-500"}`}
                        >
                            <ul className="focus:outline-none" tabIndex="-1">
                                <div className="flex items-center px-6 justify-between">
                                    <h3 className="mb-0 text-lg font-semibold font-tbLex">Notifications</h3>
                                    <span className="flex h-fit w-fit items-center font-medium font-tbPop bg-red-500 text-white p-1 text-xs rounded-full capitalize px-2.5 py-1" data-testid="flowbite-badge">
                                        <span>{notificationsDropdown?.length > 0 ? notificationsDropdown?.length + " new" : "No new"}</span>
                                    </span>
                                </div>

                                <div data-simplebar="init" className="max-h-80 mt-3 overflow-y-scroll">
                                    <div
                                        className="simplebar-content-wrapper"
                                        tabIndex="0"
                                        role="region"
                                        aria-label="scrollable content"
                                    >
                                        <div className="simplebar-content" style={{ padding: '0px' }}>
                                            {notificationsDropdown?.map((item, i) => (
                                                <li key={i} role="menuitem" className="focus:outline-none">
                                                    <a
                                                        type="button"
                                                        className="cursor-pointer text-sm text-ld hover:text-primary focus:bg-hover focus:outline-none px-6 py-3 flex justify-between items-center bg-hover group/link w-full"
                                                        tabIndex="-1"
                                                        data-discover="true"
                                                    >
                                                        <div className="flex items-center w-full space-x-2">
                                                            <div className="h-10 w-10 flex-shrink-0 rounded-full flex justify-center items-center bg-lighterror ">
                                                                <SmsNotification size={24} variant='TwoTone' className='text-orange-500' />
                                                            </div>
                                                            <div className=" flex justify-between w-full">
                                                                <div className="w-3/4 text-start leading-4 -space-y-0.5">
                                                                    <h5 className="mb-1 text-sm font-tbLex font-medium group-hover/link:text-primary capitalize line-clamp-1 text-start">{item?.title}</h5>
                                                                    <div className="text-xs text-slate-500  line-clamp-1 capitalize text-start">{item?.description}</div>
                                                                </div>
                                                                <h6 className="text-xs block font-tbPop self-start pt-1.5 text-end ">{moment(item?.createdAt).format('hh:mm A')}</h6>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {notificationsDropdown?.length > 0 && <div className="pt-5 px-5">
                                    <button type='submit' className={`${formBtn1}  bg-red-500 hover:bg-red-500/90 w-full tracking-tight font-normal text-sm`} onClick={clearAllNotificationHandler}>Clear All</button>
                                </div>}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NotificationDropdown;
