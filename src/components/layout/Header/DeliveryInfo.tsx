import getUtils from "@/lib/queries/getUtils";

const DeliveryInfo: React.FC = async () => {
  const data = await getUtils();

  const dateFormatted = data?.data.delivery_date.date_formatted;
  let convertedDate = "";

  if (dateFormatted) {
    const dayOfMonth = dateFormatted.split(",")[1]?.trim().split(" ")[0];
    if (dayOfMonth) {
      convertedDate = `TOM ${dayOfMonth}`;
    }
  }
  return (
    <div className="flex gap-2.5 items-center font-bold leading-5 text-white">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/549e2d02a24238a076781bc3e6b93c72c473806eae1a3aef02a356e8589eb3ab?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595"
        alt=""
        className="object-contain shrink-0 self-start aspect-[0.86] w-[30px]"
      />
      <div>
        <span className="text-white font-normal">Deliver to</span>
        <br />
        Al Sadd, Qatar
      </div>
      <div className="flex gap-2 items-center ml-2">
        <img src="/icons/delivery-icon.svg" />
        <div className="w-[76px]  text-white text-base font-medium ">
          Earliest Delivery
        </div>
      </div>{" "}
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
