const SearchBar: React.FC = () => {
  return (
    <form className="flex flex-wrap gap-3.5 self-stretch px-4 py-3 text-lg bg-white w-[801.792px] rounded-md text-neutral-700 md:px-6">
      <label htmlFor="searchInput" className="sr-only">
        Search for any product
      </label>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/81b2f047cf95a2b27eedd4440eb275b711a31d15818ccab3e6a507c762c8c470?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595"
        alt=""
        className="object-contain shrink-0 self-start w-6 aspect-[1.04]"
      />
      <input
        type="text"
        id="searchInput"
        placeholder="Search for any product"
        className="flex-auto bg-transparent border-none outline-none"
      />
    </form>
  );
};

export default SearchBar;
