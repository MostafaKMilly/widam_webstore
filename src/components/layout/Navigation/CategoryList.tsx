const CategoryList: React.FC<{ categories: string[] }> = ({ categories }) => {
  return (
    <div className="hidden md:flex gap-5 self-start">
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex-auto text-xl font-semibold text-sky-900 capitalize"
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
