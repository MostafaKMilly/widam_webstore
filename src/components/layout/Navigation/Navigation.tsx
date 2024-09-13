import NavigationMobileDrawer from "./NavigationMobileDrawer";
import CategoryList from "./CategoryList";

const categories = [
  {
    item_group_id: "IG001",
    item_group_name: "Beef",
    item_group_image: "https://widam.akwad.qa/files/Cow604f7e.png",
    is_group: 1,
  },
  {
    item_group_id: "IG009",
    item_group_name: "Bread & Bakery",
    item_group_image: "https://widam.akwad.qa/files/OK_Bread and Bakery.png",
    is_group: 1,
  },
  {
    item_group_id: "IG010",
    item_group_name: "Camel",
    item_group_image: "https://widam.akwad.qa/files/OK_Camel.png",
    is_group: 1,
  },
  {
    item_group_id: "IG011",
    item_group_name: "Chicken",
    item_group_image: "https://widam.akwad.qa/files/chicken 33.png",
    is_group: 1,
  },
  {
    item_group_id: "IG015",
    item_group_name: "Dairy",
    item_group_image: "https://widam.akwad.qa/files/OK_Dairy.png",
    is_group: 1,
  },
  {
    item_group_id: "IG016",
    item_group_name: "Frozen Food",
    item_group_image: "https://widam.akwad.qa/files/Frozen Food4af613.png",
    is_group: 1,
  },
  {
    item_group_id: "IG017",
    item_group_name: "Fruit & Vegetable",
    item_group_image:
      "https://widam.akwad.qa/files/OK_Fruits and Vegetables 1.png",
    is_group: 1,
  },
  {
    item_group_id: "IG018",
    item_group_name: "Lamb",
    item_group_image: "https://widam.akwad.qa/files/OK_Lamb.png",
    is_group: 1,
  },
];

const Navigation: React.FC = () => {
  return (
    <nav className="flex flex-col justify-center items-center px-4 py-6 max-md:pb-2 w-full bg-neutral-100 shadow-[0px_0px_2px_rgba(0,0,0,0.161)] md:px-16">
      <div className="flex flex-wrap gap-5 justify-between w-full max-w-[1680px]">
        <CategoryList categories={categories} />
      </div>
    </nav>
  );
};

export default Navigation;
