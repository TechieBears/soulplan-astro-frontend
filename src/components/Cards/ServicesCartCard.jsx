import React from 'react'
import { Timer1 } from 'iconsax-reactjs'
import { Calendar } from 'iconsax-reactjs'
import { Icon } from '@iconify/react'
import { Zoom } from 'iconsax-reactjs'
import { FaRegTrashAlt } from 'react-icons/fa'

const ServicesCartCard = ({ service, removeItem, isUpdating }) => {
    const formatTime = (time) => {
        if (!time) return '';
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div
            key={service._id}
            className="bg-[#9E52D8] rounded-lg p-4 flex flex-col md:flex-row md:items-start md:justify-between gap-4 w-full"
        >
            {/* Service Details */}
            <div className="flex-1 bg-[#9E52D8] rounded-lg text-white">
                <h3 className="font-medium font-dm text-lg mb-4">
                    Service: {service.name}
                </h3>

                {service.astrologer && (
                    <p className="flex items-center gap-3 mb-2 text-sm sm:text-base">
                        <Icon
                            icon="ph:user"
                            className="w-5 h-5 sm:w-6 sm:h-6"
                        />
                        <span>Astrologer: {service.astrologer.fullName}</span>
                    </p>
                )}

                <p className="flex items-center gap-3 mb-2 text-sm sm:text-base">
                    <Timer1 className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>Time: {formatTime(service.startTime)} - {formatTime(service.endTime)}</span>
                </p>

                <p className="flex items-center gap-3 mb-2 text-sm sm:text-base">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>Date: {formatDate(service.date)}</span>
                </p>

                <p className="flex items-center gap-3 mb-2 text-sm sm:text-base">
                    <Icon
                        icon="ph:device-mobile"
                        className="w-5 h-5 sm:w-6 sm:h-6"
                    />
                    <span>Mode: {service.serviceMode === 'online' ? 'Online' : 'Pandit Center'}</span>
                </p>

                <p className="flex items-center gap-3 mb-2 text-sm sm:text-base">
                    <Icon
                        icon="ph:currency-inr"
                        className="w-5 h-5 sm:w-6 sm:h-6"
                    />
                    <span>Price: ₹{service.totalPrice?.toLocaleString()}</span>
                </p>

                {service.link && (
                    <div className="flex items-center gap-3 mt-3 break-all">
                        <Zoom className="w-5 h-5 sm:w-6 sm:h-6" />
                        <a
                            href={service.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white underline text-sm sm:text-base"
                        >
                            {service.link}
                        </a>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="flex md:flex-col items-center md:items-end gap-2 w-full md:w-auto">
                {/* Delete Button */}
                <button
                    onClick={() => removeItem(service._id)}
                    disabled={isUpdating}
                    className={`p-2 text-white rounded-md transition-colors ${isUpdating ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-[#8B3FC1]'
                        }`}
                >
                    <FaRegTrashAlt className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            </div>
        </div>
    )
}

export default ServicesCartCard
