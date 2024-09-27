import React from "react";

const Table = ({ className, columns, data, onItemSelect }) => {
  const handleItemClick = (item) => {
    if (onItemSelect) onItemSelect(item);
  };

  return (
    <div
      className={`text-left border border-[#EAECF0] rounded-lg overflow-hidden ${className}`}
    >
      <table className="h-full w-full">
        <thead>
          <tr className="sticky top-0 bg-white">
            {columns.map((column) => (
              <th
                key={column.id}
                className="ps-6 py-3 text-sm font-semibold text-[#667085]"
              >
                {column.heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr
              key={i}
              className={
                onItemSelect
                  ? "hover:bg-gray-200 cursor-pointer duration-200"
                  : ""
              }
              onClick={() => handleItemClick(item)}
            >
              {columns.map((column) => (
                <td
                  className="text-sm font-medium text-[#667085] ps-6 py-[26px] border-t border-b border-[#EAECF0]"
                  key={`${column.id}-${i}`}
                >
                  {column.value(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
