const DeliveryInfo: React.FC = () => {
  return (
    <div className="flex gap-2.5 items-center font-bold leading-5 text-white">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/549e2d02a24238a076781bc3e6b93c72c473806eae1a3aef02a356e8589eb3ab?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595"
        alt=""
        className="object-contain shrink-0 self-start aspect-[0.86] w-[30px]"
      />
      <div>
        <span className="text-white">Deliver to</span>
        <br />
        Al Sadd, Qatar
      </div>
    </div>
  );
};

export default DeliveryInfo;
