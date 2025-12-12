import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllAddress } from '../../api';
import { setAddresses } from '../../redux/Slices/cartSlice';
import toast from 'react-hot-toast';
import AddressChangeModal from '../Modals/AddressChangeModal';

const AddressSelector = () => {
    const addresses = useSelector((state) => state.cart?.addresses);
    console.log("⚡️🤯 ~ AddressSelector.jsx:24 ~ AddressSelector ~ addresses:", addresses)
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const fetchAddresses = async () => {
        try {
            const res = await getAllAddress();
            if (res?.data?.length > 0) {
                const defaultAddress = res?.data?.filter(item => item?.isDefault)
                dispatch(setAddresses(defaultAddress[0]))
            } else {
                dispatch(setAddresses([]));
            }
        } catch (err) {
            toast.error(err.message || "Failed to fetch addresses");
            console.error("Error fetching addresses", err);
        }
    };

    useEffect(() => {
        fetchAddresses();
        window.scrollTo(0, 0);
    }, []);


    return (
        <div>
            {addresses?.length === 0 ? (
                <AddressChangeModal edit={false} />
            ) : (
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full pb-4 bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
                    <div className="flex-1 flex flex-col">
                        <h3 className="text-sm font-semibold font-tbLex text-gray-800">
                            Deliver to: <span className="font-medium">
                                {addresses?.firstName || "------"}
                                {addresses?.lastName || "------"}
                            </span>
                        </h3>
                        <h3 className="text-sm font-semibold font-tbLex text-gray-800 capitalize">
                            {addresses?.phoneNumber || "----- ------"} (
                            {addresses?.addressType || "----- ------"})
                        </h3>
                        <p className="text-gray-500 text-sm font-tbPop mt-1">
                            {addresses?.address || "------"} {addresses?.city || "------"}
                            {addresses?.state || "------"} {addresses?.country || "------"}-{" "}
                            {addresses?.postalCode || "------"}
                        </p>
                    </div>

                    <AddressChangeModal edit={true} />
                </div>
            )}
        </div>
    )
}

export default AddressSelector;
