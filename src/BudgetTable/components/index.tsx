import { BudgetRow } from "./BudgetRow";
import { useBudgetData } from "../hooks/useBudgetData";
import { exportToExcel } from "../utils/utils";
import { months } from "../constants/constants";
import { useCallback } from "react";

export default function BudgetTable() {
  const { data, addRow, handleChange, rowTotals, monthlyTotals, grandTotal } =
    useBudgetData();

  const handleExport = useCallback(() => {
    exportToExcel(data, rowTotals, monthlyTotals, grandTotal);
  }, [data, rowTotals, monthlyTotals, grandTotal]);

  return (
    <>
      <div className="p-4 overflow-auto bg-white p-5 container">
        <div className="flex justify-between items-center my-5">
          <div className="flex items-center gap-2 -center">
            {/* <img
              className="w-32 h-auto"
              src="../../../public/images/Imagen1.png"
              alt="H. CONGRESO DEL ESTADO DE CHIHUAHUA"
            /> */}
            <h2 className="text-xl font-bold">
              H. CONGRESO DEL ESTADO DE CHIHUAHUA
            </h2>
          </div>
          <div className="flex gap-2 h-full">
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded"
              onClick={addRow}
            >
              Agregar Partida
            </button>
            <button
              className="bg-green-600 text-white px-4 py-1 rounded"
              onClick={handleExport}
            >
              Exportar a Excel
            </button>
          </div>
        </div>
        <div className="container overflow-x-scroll">
          <table className="min-w-max table-auto">
            <thead className="bg-sky-700">
              <tr>
                <th className="border-b text-white px-2 py-1">COMP</th>
                <th className="border-b text-white px-2 py-1">UR</th>
                <th className="border-b text-white px-2 py-1">UR DES</th>
                <th className="border-b text-white px-2 py-1">COG</th>
                <th className="border-b text-white px-2 py-1">
                  COG Descripción
                </th>
                <th className="border-b text-white px-2 py-1">
                  Presupuesto <br /> 2025
                </th>
                {months.map((m) => (
                  <th
                    key={m}
                    className="border-b text-white px-2 py-1 capitalize"
                  >
                    {m}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="[&>tr]:h-10">
              {data.map((row, i) => (
                <BudgetRow
                  key={i}
                  row={row}
                  index={i}
                  rowTotal={rowTotals[i]}
                  onChange={handleChange}
                />
              ))}
              <tr className="bg-sky-700 font-semibold">
                <td
                  colSpan={5}
                  className="text-right text-white px-2 py-1 border-t"
                >
                  Totales:
                </td>
                <td className="text-white border-t px-2 py-1 text-right">
                  {grandTotal}
                </td>
                {months.map((m) => (
                  <td
                    key={m}
                    className="text-white border-t px-2 py-1 text-right"
                  >
                    {monthlyTotals[m]}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
