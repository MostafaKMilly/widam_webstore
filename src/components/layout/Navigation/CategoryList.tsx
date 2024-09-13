// CategoryList.tsx
"use client";
import Link from "next/link";
import styles from "./CategoryList.module.css"; // Import the CSS module

interface Category {
  item_group_id: string;
  item_group_name: string;
  item_group_image: string | null;
  is_group: number;
}

const CategoryList: React.FC<{ categories: Category[] }> = ({ categories }) => {
  return (
    <div className="w-full">
      <div className="flex overflow-x-auto space-x-4 md:hidden px-4">
        <Link
          href={`/categories`}
          className={`flex-none flex flex-col items-center space-y-2 w-fit text-center text-sm font-semibold text-primary capitalize mb-4 ${styles.categoryLinkParent}`}
        >
          <span className={`${styles.categoryLink}`}>All Category</span>
        </Link>

        {categories.map((category) => (
          <Link
            key={category.item_group_id}
            href={`/categories?category=${category.item_group_id}`}
            className={`flex-none flex flex-col items-center space-y-2 w-fit text-center text-sm font-semibold text-primary capitalize mb-4 ${styles.categoryLinkParent}`}
          >
            <span className={`${styles.categoryLink}`}>
              {category.item_group_name}
            </span>
          </Link>
        ))}
      </div>

      <div className="md:flex hidden gap-12 px-4">
        <Link
          href={`/categories`}
          className={`flex flex-col items-center space-y-2 text-center text-xl font-semibold text-primary capitalize ${styles.categoryLinkParent}`}
        >
          <span className={`${styles.categoryLink}`}>All Category</span>
        </Link>
        {categories.map((category) => (
          <Link
            key={category.item_group_id}
            href={`/categories?category=${category.item_group_id}`}
            className={`flex flex-col items-center space-y-2 text-center text-xl font-semibold text-primary capitalize ${styles.categoryLinkParent}`}
          >
            <span className={`${styles.categoryLink}`}>
              {category.item_group_name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
