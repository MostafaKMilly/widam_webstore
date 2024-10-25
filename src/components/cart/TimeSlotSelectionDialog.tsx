import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { XIcon } from "lucide-react"; // For the close button icon

interface TimeSlot {
  time_slot_id: string;
  from_time: string;
  to_time: string;
  maximum_orders: number;
  time_formatted: string;
  timeslot_overload: number;
}

interface DateSlot {
  date: string;
  date_formatted: string;
  time_slots: TimeSlot[];
}

interface DeliveryMethod {
  delivery_method_id: string;
  type: string;
  delivery_method_title: string;
  icon?: string;
  description?: string;
  delivery_charges: number;
  minimum_order_amount: number;
  time_slot_group: {
    time_slot_group_id: string;
    max_sales_order: number;
    dates: DateSlot[];
  };
}

interface TimeSlotSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onTimeSlotSelect: (date: DateSlot, timeSlot: TimeSlot) => void;
  normalDelivery: DeliveryMethod;
}

interface TimeSlotSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onTimeSlotSelect: (date: DateSlot, timeSlot: TimeSlot) => void;
  normalDelivery: DeliveryMethod;
}

const TimeSlotSelectionDialog: React.FC<TimeSlotSelectionDialogProps> = ({
  isOpen,
  onClose,
  onTimeSlotSelect,
  normalDelivery,
}) => {
  const dates = normalDelivery.time_slot_group.dates;

  // Initialize selectedDate to the first date
  const [selectedDate, setSelectedDate] = useState<DateSlot | null>(
    dates[0] || null
  );

  // Initialize selectedTimeSlot to the first available time slot
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    dates[0]?.time_slots.find((ts) => ts.timeslot_overload === 0) || null
  );

  const isSelectionComplete = selectedDate && selectedTimeSlot;

  const handleDateSelect = (date: DateSlot) => {
    setSelectedDate(date);
    // Update selectedTimeSlot to the first available time slot of the new date
    const firstAvailableTimeSlot = date.time_slots.find(
      (ts) => ts.timeslot_overload === 0
    );
    setSelectedTimeSlot(firstAvailableTimeSlot || null);
  };

  const handleTimeSelect = (timeSlot: TimeSlot) => {
    if (timeSlot.timeslot_overload === 0) {
      setSelectedTimeSlot(timeSlot);
    }
  };

  const handleConfirm = () => {
    if (isSelectionComplete && selectedDate && selectedTimeSlot) {
      onTimeSlotSelect(selectedDate, selectedTimeSlot);
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      {/* Dialog overlay */}
      <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />

      {/* Dialog panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          className="relative bg-white rounded-lg shadow-lg
          max-w-2xl w-full p-6"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-500
            hover:text-gray-700"
            aria-label="Close dialog"
          >
            <XIcon className="h-6 w-6" />
          </button>

          {/* Dialog Title */}
          <Dialog.Title className="text-2xl font-semibold text-gray-900 mb-6 mt-3 text-center">
            Select your delivery slot
          </Dialog.Title>

          {/* Date selection */}
          <div className="mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center justify-items-center">
              {dates.map((date, index) => (
                <button
                  key={index}
                  onClick={() => handleDateSelect(date)}
                  className={`flex flex-col items-center px-4 py-2
                    rounded cursor-pointer w-[163px] h-[85px] max-md:w-full ${
                      selectedDate?.date === date.date
                        ? "bg-[#05B] text-white"
                        : "bg-white border border-[#E7E7E7] text-gray-600"
                    }`}
                >
                  <div className="text-xl font-semibold">
                    {new Date(date.date).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </div>
                  <div className="mt-1 text-sm">{date.date_formatted}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Time slot selection */}
          {selectedDate && (
            <>
              <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Choose your Timeslot
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedDate.time_slots.map((timeSlot, index) => (
                  <button
                    key={index}
                    onClick={() => handleTimeSelect(timeSlot)}
                    disabled={timeSlot.timeslot_overload > 0}
                    className={`flex flex-col items-center px-4 py-2
                      rounded ${
                        timeSlot.timeslot_overload > 0
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : selectedTimeSlot?.time_slot_id ===
                            timeSlot.time_slot_id
                          ? "bg-[#F8FCFD] border border-sky-700 text-sky-900"
                          : "[#F8FCFD] border border-[#E7E7E7] text-gray-600"
                      }`}
                  >
                    <div className="text-base font-bold">
                      {timeSlot.time_formatted}
                    </div>
                    {timeSlot.timeslot_overload > 0 ? (
                      <div className="mt-2 text-sm text-red-500">
                        Fully Booked
                      </div>
                    ) : (
                      <div className="mt-2 text-sm">
                        Delivery Fees: QAR{" "}
                        {normalDelivery.delivery_charges.toFixed(2)}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="flex justify-center mt-4">
            <button
              onClick={handleConfirm}
              disabled={!isSelectionComplete}
              className={`mt-6 self-center mx-auto py-3 rounded w-[279px] ${
                isSelectionComplete
                  ? "bg-[#05B] text-white cursor-pointer"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
            >
              Select
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default TimeSlotSelectionDialog;
