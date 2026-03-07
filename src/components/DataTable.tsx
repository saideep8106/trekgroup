import { useState } from "react";
import { Search } from "lucide-react";

interface Props {
  columns: string[];
  data: any[];
}

function DataTable({ columns, data }: Props) {
  const [search, setSearch] = useState("");

  const filteredData = data.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="card overflow-hidden">
      {/* Search & Toolbar */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center bg-surface-muted border border-gray-100 px-3 py-2 rounded-lg w-72 focus-within:border-brand-300 focus-within:ring-2 focus-within:ring-brand-50 transition-all">
          <Search size={15} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search records..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none px-2 text-sm w-full text-gray-700 placeholder:text-gray-400"
          />
        </div>
        <p className="text-xs text-gray-400 font-medium">
          {filteredData.length} of {data.length} records
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-muted border-b border-gray-100">
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-brand-50/30 transition-colors duration-150"
                >
                  {columns.map((col, i) => (
                    <td
                      key={i}
                      className="px-5 py-3.5 text-gray-700 whitespace-nowrap"
                    >
                      {row[col]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-12 text-center text-gray-400 text-sm"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;