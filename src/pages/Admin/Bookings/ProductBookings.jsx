import { ArrowLeft2, ArrowRight2, Copy } from 'iconsax-reactjs';
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { getAllProductOrders, updateProductOrder } from '../../../api';
import Table from '../../../components/Table/Table'
import SelectTextInput from '../../../components/TextInput/SelectTextInput'
import TextInput from '../../../components/TextInput/TextInput'
import usePagination from '../../../utils/customHooks/usePagination'
import { formBtn1 } from '../../../utils/CustomClass'
import TableHeader from '../../../components/Table/TableHeader'

const initialFilterState = {
    orderId: '',
    date: '',
    status: '',
};

const ProductBookings = () => {
    const { register, handleSubmit, reset, watch } = useForm({ defaultValues: initialFilterState });
    const [filterCriteria, setFilterCriteria] = useState(initialFilterState);
    const [refreshTrigger, setRefreshTrigger] = useState(0)

    const combinedFilters = useMemo(() => ({
        ...filterCriteria,
        refresh: refreshTrigger
    }), [filterCriteria, refreshTrigger]);

    const {
        filterData,
        pageNo,
        nextIsValid,
        prevIsValid,
        pageChangeHandler,
        recordChangeHandler,
        records,
        error
    } = usePagination(1, 10, getAllProductOrders, combinedFilters);
    useEffect(() => {
        if (error) toast.error('Failed to fetch product bookings');
    }, [error]);

    const handleFilterSubmit = (data) => {
        setFilterCriteria(data);
        pageChangeHandler(1);
    };

    const handleClearFilters = () => {
        reset(initialFilterState);
        setFilterCriteria(initialFilterState);
        toast.success('Filters cleared');
    };


    const handleOrderStatusChange = async (orderId, newStatus) => {
        try {
            const updatedData = {
                orderStatus: newStatus
            }
            await updateProductOrder(orderId, updatedData);
            setRefreshTrigger(prev => prev + 1);
            toast.success('Order status updated successfully');
        } catch (error) {
            console.log('error', error)
            toast.error('Failed to update order status');
        }
    };

    const orderStatusOptions = [
        { value: 'PENDING', label: 'Pending' },
        { value: 'CONFIRMED', label: 'Confirmed' },
        { value: 'SHIPPED', label: 'Shipped' },
        { value: 'DELIVERED', label: 'Delivered' },
        { value: 'CANCELLED', label: 'Cancelled' },
        { value: 'REFUNDED', label: 'Refunded' }
    ];

    const orderStatusBody = (row) => (
        <select
            value={row?.orderStatus || 'PENDING'}
            onChange={(e) => handleOrderStatusChange(row?._id, e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-tbLex tracking-tight"
        >
            {orderStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );

    const paymentStatusBody = (row) => {
        const statusColor = row?.paymentStatus === 'PAID' ? 'text-green-600 bg-green-100' :
            row?.paymentStatus === 'PENDING' ? 'text-yellow-600 bg-yellow-100' :
                'text-red-600 bg-red-100';
        return (
            <span className={`px-4 py-2 rounded-full text-xs font-tbLex tracking-tight font-medium ${statusColor}`}>
                {row?.paymentStatus || 'PENDING'}
            </span>
        );
    };
    const columns = [
        {
            field: '_id', header: 'Order Id', body: (row) => <div className="flex items-center gap-2"><span className='capitalize'>{row?._id?.slice(-10) || "---- -----"}</span> <span><Copy className="cursor-pointer text-primary hover:text-primary" size={18}
                onClick={() => {
                    navigator.clipboard.writeText(row?._id);
                    toast.success('ID Copied!');
                }} /></span>
            </div>, style: true, sortable: true
        },
        {
            field: 'user',
            header: 'Customer',
            body: (row) => (
                <div className='space-y-1'>
                    <div className='font-medium capitalize'>{row?.user?.firstName} {row?.user?.lastName}</div>
                    <div className='text-xs text-gray-500'>{row?.user?.email}</div>
                </div>
            ),
            style: true, sortable: true
        },
        {
            field: 'items',
            header: 'Products',
            body: (row) => (
                <div className='space-y-1'>
                    {row?.items?.map((item, index) => (
                        <div key={index} className='text-sm'>
                            <div className='font-medium'>{item?.product?.name}</div>
                            <div className='text-xs text-gray-500'>Qty: {item?.quantity} × ₹{item?.sellingPrice}</div>
                        </div>
                    ))}
                </div>
            ),
            style: true, sortable: true
        },
        {
            field: 'address',
            header: 'Delivery Address',
            body: (row) => (
                <div className='text-sm space-y-1'>
                    <div className='font-medium'>{row?.address?.firstName} {row?.address?.lastName}</div>
                    <div className='text-xs text-gray-500'>{row?.address?.phoneNumber}</div>
                    <div className='text-xs text-gray-500'>{row?.address?.city}, {row?.address?.state}</div>
                </div>
            ),
            style: true, sortable: true
        },
        {
            field: 'finalAmount',
            header: 'Total Amount',
            body: (row) => (
                <div className='space-y-1'>
                    <div className='font-bold text-green-600'>₹{row?.finalAmount}</div>
                    <div className='text-xs text-gray-500'>Base: ₹{row?.amount?.basePrice}</div>
                    <div className='text-xs text-gray-500'>GST: ₹{row?.amount?.gst}</div>
                </div>
            ),
            style: true, sortable: true
        },
        {
            field: 'paymentMethod',
            header: 'Payment Method',
            body: (row) => <span className='px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-tbLex tracking-tight'>{row?.paymentMethod || 'COD'}</span>,
            style: true, sortable: true
        },
        {
            field: 'paymentStatus',
            header: 'Payment Status',
            body: paymentStatusBody,
            style: true, sortable: true
        },
        {
            field: 'orderStatus',
            header: 'Order Status',
            body: orderStatusBody,
            style: true, sortable: true
        },
        {
            field: 'createdAt',
            header: 'Order Date',
            body: (row) => <>{moment(row?.createdAt).format('DD-MM-YYYY HH:mm') || '---- -----'}</>,
            style: true, sortable: true
        }
    ];
    return (
        <div className="space-y-5">
            {/* Filter */}
            <div className="bg-white p-4 sm:m-5 rounded-xl">
                <form onSubmit={handleSubmit(handleFilterSubmit)} className="flex flex-col lg:flex-row gap-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-2">
                        <TextInput
                            label="Enter Order Id*"
                            placeholder="Enter Order Id"
                            type="text"
                            registerName="orderId"
                            props={{ ...register('orderId') }}
                        />
                        <TextInput
                            label="Enter Date*"
                            placeholder="Enter Date"
                            type="date"
                            registerName="date"
                            props={{ ...register('date') }}
                        />
                        <div className="">
                            <SelectTextInput
                                label="Select Status*"
                                registerName="status"
                                options={[
                                    { value: 'PENDING', label: 'Pending' },
                                    { value: 'CONFIRMED', label: 'Confirmed' },
                                    { value: 'PROCESSING', label: 'Processing' },
                                    { value: 'SHIPPED', label: 'Shipped' },
                                    { value: 'DELIVERED', label: 'Delivered' },
                                    { value: 'CANCELLED', label: 'Cancelled' },
                                    { value: 'REFUNDED', label: 'Refunded' }
                                ]}
                                placeholder="Select Status"
                                props={{
                                    ...register('status'),
                                    value: watch('status') || ''
                                }}
                            />
                        </div>

                    </div>
                    <div className="flex space-x-2">
                        <button type="submit" className={`${formBtn1} w-full`}>Filter</button>
                        <button type="button" onClick={handleClearFilters} className={`${formBtn1} w-full !bg-transparent border border-primary !text-primary`}>Clear</button>
                    </div>
                </form>
            </div>

            {/* Product Booking Table Section */}
            <div className="bg-white rounded-xl m-4 sm:m-5 shadow-sm  p-5 sm:p-7 ">

                <TableHeader title={"Product Booking"} subtitle={"Recently added product bookings will appear here"} />

                <Table data={filterData} columns={columns} paginator={false} />

                {/* Pagination */}
                <div className="flex justify-end items-center gap-4 mt-4">
                    <button
                        onClick={() => pageChangeHandler(pageNo - 1)}
                        disabled={!prevIsValid}
                    >
                        <ArrowLeft2 size={20} color={prevIsValid ? "#8833FF" : "#ccc"} />
                    </button>
                    <button
                        onClick={() => pageChangeHandler(pageNo + 1)}
                        disabled={!nextIsValid}
                    >
                        <ArrowRight2 size={20} color={nextIsValid ? "#8833FF" : "#ccc"} />
                    </button>
                    <div className="relative">
                        <select
                            value={records}
                            onChange={(e) => recordChangeHandler(Number(e.target.value))}
                            className="pr-8 appearance-none"
                        >
                            {[10, 25, 50].map((size) => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductBookings;
