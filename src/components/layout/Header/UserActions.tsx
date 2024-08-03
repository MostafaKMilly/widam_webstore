
const UserActions: React.FC = () => {
  return (
    <div className="flex gap-2.5 items-center mt-1.5 text-sm font-semibold text-white">
      <div className="grow my-auto">QAR 115.00</div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/9fb5b499-e781-4f3f-a238-b9afc316692a?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595"
        alt=""
        className="object-contain shrink-0 bg-white rounded-full aspect-[0.95] h-[41px] w-[41px]"
      />
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/78ea0983-2b91-4483-89e6-660a77d24118?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595"
        alt=""
        className="object-contain shrink-0 bg-white rounded-full aspect-square h-[38px] w-[38px]"
      />
    </div>
  );
};

export default UserActions;