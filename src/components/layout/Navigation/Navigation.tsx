import CategoryList from "./CategoryList";
import NavigationIcons from "./NavigationIcons";
import MobileDrawer from "./NavigationMobileDrawer";

const Navigation: React.FC = () => {
  const categories = [
    "All Category",
    "Meat and Chicken",
    "Fresh Fruits",
    "Fresh Vegetables",
    "Spices",
    "Local products",
  ];

  return (
    <nav className="flex flex-col justify-center items-center px-4 py-6 w-full bg-neutral-100 shadow-[0px_0px_2px_rgba(0,0,0,0.161)] md:px-16">
      <div className="flex flex-wrap gap-5 justify-between w-full max-w-[1680px]">
        <div className="flex items-center gap-5">
          <MobileDrawer categories={categories} />
          <CategoryList categories={categories} />
        </div>
        <NavigationIcons />
      </div>
    </nav>
  );
};

export default Navigation;
