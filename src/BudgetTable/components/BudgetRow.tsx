import React from "react";
import { cogOptions, months } from "../constants/constants";
import type { IBudgetRow } from "../types/budget";

interface IBudgetRowProps {
  row: IBudgetRow;
  index: number;
  rowTotal: number;
  onChange: (index: number, key: keyof IBudgetRow, value: string) => void;
}

export const BudgetRow: React.FC<IBudgetRowProps> = React.memo(({ 
  row, 
  index, 
  rowTotal, 
  onChange 
}) => (
  <tr>
    <td className="border-b bg-sky-200 px-2 py-1">{row.comp}</td>
    <td className="border-b bg-sky-200 px-2 py-1">{row.ur}</td>
    <td className="border-b bg-sky-200 px-2 py-1">{row.urDescription}</td>
    <td className="border-b px-2 py-1">
      <select
        className="w-32 shadow rounded px-1"
        value={row.cogKey}
        onChange={(e) => onChange(index, "cogKey", e.target.value)}
      >
        <option value={undefined}>Seleccionar...</option>
        {cogOptions.map(opt => (
          <option key={opt.cogKey} value={opt.cogKey}>
            {opt.cogKey}
          </option>
        ))}
      </select>
    </td>
    <td className="border-b px-2 py-1 w-40 relative">
      <div
        className="overflow-hidden hover:after:content-[attr(data-tooltip)] hover:after:absolute hover:after:z-50 hover:after:w-max hover:after:max-w-xs hover:after:bg-gray-800 hover:after:text-white hover:after:text-sm hover:after:rounded hover:after:px-2 hover:after:py-1 hover:after:bottom-full hover:after:left-1/2 hover:after:-translate-x-1/2 hover:after:mb-1 hover:after:pointer-events-none"
        data-tooltip={row.cogDescription}
      >
        <div className="w-75 truncate">{row.cogDescription}</div>
      </div>
    </td>
    <td className="border-b px-2 py-1 text-right bg-sky-200 font-semibold">{rowTotal}</td>
    {months.map(month => (
      <td key={month} className="border-b p-0 h-10">
        <div className="flex justify-end items-center h-full">
          <input
            className="w-30 h-full px-2 py-1 text-right border-b-0 focus:ring-1 focus:ring-blue-500"
            value={row[month]}
            onChange={(e) => onChange(index, month, e.target.value)}
          />
        </div>
      </td>
    ))}
  </tr>
));