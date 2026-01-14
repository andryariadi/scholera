"use client";
const Pagination = () => {
  return (
    <div className="px-4 flex items-center justify-between text-gray-500">
      <button disabled className="pagination-btn">
        Prev
      </button>

      <div className="flex items-center gap-2 text-sm">
        <button className="px-2 rounded-sm bg-scholera-sky">1</button>
        <button className="px-2 rounded-sm ">2</button>
        <button className="px-2 rounded-sm ">3</button>
        ...
        <button className="px-2 rounded-sm ">10</button>
      </div>

      <button className="pagination-btn">Next</button>
    </div>
  );
};

export default Pagination;
