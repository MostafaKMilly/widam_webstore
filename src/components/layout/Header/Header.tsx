import SearchBar from "./SearchBar";
import DeliveryInfo from "./DeliveryInfo";
import UserActions from "./UserActions";
import MobileDrawer from "./MobileDrawer";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center px-4 py-6 bg-sky-500 md:px-16">
      <div className="max-w-[1680px] w-full flex justify-between items-center mx-auto">
        <div className="flex items-center gap-5 ">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ddb7b89cdf5a5717478db868d6a33eca92a94829276d4d56cae4fe6a0fe03ddb?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595"
            alt=""
            className="object-contain shrink-0 self-stretch aspect-[1.84] w-[68px]"
          />
          <div className="hidden md:flex gap-5 items-center">
            <SearchBar />
            <DeliveryInfo />
          </div>
        </div>
        <div className="hidden md:flex">
          <UserActions />
        </div>
        <div className="md:hidden">
          <MobileDrawer />
        </div>
      </div>
    </header>
  );
};

export default Header;
