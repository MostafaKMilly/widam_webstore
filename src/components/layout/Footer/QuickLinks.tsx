import React from "react";
import ContactButton from "./ContactButton";

interface QuickLinksProps {
  title: string;
  links: string[];
}

const QuickLinks: React.FC<QuickLinksProps> = ({ title, links }) => {
  return (
    <div className="flex flex-col items-center mt-12 max-w-full">
      <div className="self-stretch h-px bg-[#03ADEB] w-full" />
      <h2 className="mt-7 text-2xl font-bold leading-10 text-center text-black">
        {title}
      </h2>
      <nav>
        <ul className="mt-16 text-lg font-medium text-center leading-[57px] text-neutral-700">
          {links.map((link, index) => (
            <li key={index} className={index !== 0 ? "mt-4" : ""}>
              <a href="#" className="hover:underline">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default QuickLinks;
