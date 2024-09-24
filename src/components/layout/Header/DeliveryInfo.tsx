import getUtils from "@/lib/queries/getUtils";
import DeliverSelection from "./DeliverSelection";

const DeliveryInfo: React.FC = async () => {
  const data = await getUtils();

  const dateFormatted = data?.data.delivery_date.date_formatted;
  let convertedDate = "";

  if (dateFormatted) {
    const dayOfMonth = dateFormatted.split(",")[1]?.trim().split(" ")[0];
    if (dayOfMonth) {
      const currentDay = new Date().getDate();
      if (parseInt(dayOfMonth) > currentDay) {
        convertedDate = `TOM ${dayOfMonth}`;
      } else {
        convertedDate = `TOD ${dayOfMonth}`;
      }
    }
  }

  return (
    <div className="flex gap-2.5 items-center font-bold leading-5 text-white">
      <DeliverSelection />
      <div className="flex gap-2 items-center ml-2">
        <img src="/icons/delivery-icon.svg" />
        <div className="w-[76px]  text-white text-base font-medium ">
          Earliest Delivery
        </div>
      </div>
      <div className="flex ml-2 w-fit px-1 h-[36.782px] bg-[#F7F6FA] rounded-sm items-center gap-1">
        <div className="w-[34px] h-[33px] bg-white rounded-sm border ">
          <p className="text-[#ef3e42] text-xs text-center mt-[2px]">
            {convertedDate}
          </p>
        </div>
        <div className="text-[#232323] text-[10px] font-bold font-['Montserrat']">
          {data?.data.time_slot.time_formatted}
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
