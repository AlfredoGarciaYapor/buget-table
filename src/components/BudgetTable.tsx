import React, { useState, useEffect, useCallback, useMemo } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import type { BudgetRow, FixedField, Month, cogOption } from "../types/budget";

const months: Month[] = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const cogOptions: cogOption[] = [
  {
    cogKey: 21101,
    description: "Materiales, útiles y equipos menores de oficina",
  },
  { cogKey: 21501, description: "Material impreso e información digital" },
  { cogKey: 22101, description: "Productos alimenticios para personas" },
  {
    cogKey: 29301,
    description:
      "Refacciones y accesorios menores de mobiliario y equipo de administración, educacional y recreativo",
  },
  {
    cogKey: 29401,
    description:
      "Refacciones y accesorios menores de equipo de cómputo y tecnologías de la información",
  },
  {
    cogKey: 31701,
    description:
      "Servicios de acceso de Internet, redes y procesamiento de información",
  },
  { cogKey: 31801, description: "Servicios postales y telegráficos" },
  {
    cogKey: 33301,
    description:
      "Servicios de consultoría administrativa, procesos, técnica y en tecnologías de la información",
  },
  {
    cogKey: 33601,
    description: "Servicios de apoyo administrativo, fotocopiado e impresión",
  },
  { cogKey: 37201, description: "Pasajes terrestres" },
  { cogKey: 37501, description: "Viáticos en el país" },
  { cogKey: 38201, description: "Gastos de orden social y cultural" },
  { cogKey: 39901, description: "Otros servicios generales" },
  { cogKey: 44301, description: "Apoyos educacionales" },
  { cogKey: 51101, description: "Muebles de oficina y estantería" },
  {
    cogKey: 51501,
    description: "Equipo de cómputo y de tecnología de la información",
  },
  {
    cogKey: 51901,
    description: "Otros mobiliarios y equipos de administración",
  },
];

const defaultRow: BudgetRow = {
  comp: "C0201",
  ur: "201101",
  urDescription: "Secretaría de Asuntos Legislativos y Jurídicos",
  cogDescription: "",
  enero: 0,
  febrero: 0,
  marzo: 0,
  abril: 0,
  mayo: 0,
  junio: 0,
  julio: 0,
  agosto: 0,
  septiembre: 0,
  octubre: 0,
  noviembre: 0,
  diciembre: 0,
};

export default function BudgetTable() {
  const [data, setData] = useState<BudgetRow[]>(() => {
    const saved = localStorage.getItem("presupuestoData");
    return saved ? JSON.parse(saved) : [defaultRow];
  });

  useEffect(() => {
    localStorage.setItem("presupuestoData", JSON.stringify(data));
  }, [data]);

  // const totals = useMemo(() => {

  // })

  const handleChange = (index: number, key: keyof BudgetRow, value: string) => {
    const updated = [...data];
    if (key === "cogKey") {
      updated[index].cogKey = value;
      const option = cogOptions.find((p) => p.cogKey === +value);
      updated[index].cogDescription = option?.description || "";
    } else if (months.includes(key as Month)) {
      if (!/^\d*$/.test(value)) return;
      updated[index][key as Month] = Number(value);
    } else if (
      (["comp", "ur", "urDescription"] as FixedField[]).includes(
        key as FixedField
      )
    ) {
      updated[index][key as FixedField] = value;
    }

    setData(updated);
  };

  const addRow = () => setData([...data, { ...defaultRow }]);

  const getPresupuestoRowTotal = (row: BudgetRow): number =>
    months.reduce((sum, month) => sum + (row[month] || 0), 0);

  const getMonthlyTotals = () => {
    const totals: Record<Month, number> = Object.fromEntries(
      months.map((m) => [m, 0])
    ) as Record<Month, number>;
    let presupuesto = 0;
    for (const row of data) {
      for (const month of months) totals[month] += row[month] || 0;
      presupuesto += getPresupuestoRowTotal(row);
    }
    return { ...totals, presupuesto };
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Presupuesto");

    const headers = [
      "Clave",
      "Año",
      "urDescription",
      "cogKey",
      "Descripción",
      ...months.map((m) => m[0].toUpperCase() + m.slice(1)),
      "Presupuesto",
    ];

    sheet.addRow(headers);

    data.forEach((row) => {
      const presupuesto = getPresupuestoRowTotal(row);
      const values = [
        (row.comp = "C0201"),
        (row.ur = "201101"),
        (row.urDescription = "Secretaría de Asuntos Legislativos y Jurídicos"),
        row.cogKey,
        row.cogDescription,
        ...months.map((m) => row[m]),
        presupuesto,
      ];
      sheet.addRow(values);
    });

    const totals = getMonthlyTotals();
    const totalRow = [
      "",
      "",
      "",
      "",
      "Totales:",
      ...months.map((m) => totals[m]),
      totals.presupuesto,
    ];
    sheet.addRow(totalRow);

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "presupuesto.xlsx");
  };

  const totals = getMonthlyTotals();

  return (
    <div className="p-4 overflow-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Tabla de Presupuesto</h2>
      <table className="min-w-max table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">COMP</th>
            <th className="border px-2 py-1">UR</th>
            <th className="border px-2 py-1">UR DES</th>
            <th className="border px-2 py-1">COG</th>
            <th className="border px-2 py-1">COG Descripción</th>
            <th className="border px-2 py-1">
              Presupuesto <br /> 2025
            </th>
            {months.map((m) => (
              <th key={m} className="border px-2 py-1 capitalize">
                {m}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&>tr]:h-10">
          {data.map((row, i) => (
            <tr key={i}>
              <td className="border px-2 py-1">{row.comp}</td>
              <td className="border px-2 py-1">{row.ur}</td>
              <td className="border px-2 py-1">{row.urDescription}</td>
              <td className="border px-2 py-1">
                <select
                  className="w-32 border rounded px-1"
                  value={row.cogKey}
                  onChange={(e) => handleChange(i, "cogKey", e.target.value)}
                >
                  <option value={undefined}>Seleccionar...</option>
                  {cogOptions.map((opt) => (
                    <option key={opt.cogKey} value={opt.cogKey}>
                      {opt.cogKey}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border px-2 py-1 w-40 relative">
                {/* Contenedor principal que activa el tooltip */}
                <div
                  className="overflow-hidden hover:after:content-[attr(data-tooltip)] hover:after:absolute hover:after:z-50 hover:after:w-max hover:after:max-w-xs hover:after:bg-gray-800 hover:after:text-white hover:after:text-sm hover:after:rounded hover:after:px-2 hover:after:py-1 hover:after:bottom-full hover:after:left-1/2 hover:after:-translate-x-1/2 hover:after:mb-1 hover:after:pointer-events-none"
                  data-tooltip={row.cogDescription}
                >
                  <div className="w-75 truncate">{row.cogDescription}</div>
                </div>
              </td>
              {/* <td className="border px-2 py-1">

              </td> */}
              <td className="border px-2 py-1 text-right font-semibold">
                {getPresupuestoRowTotal(row)}
              </td>
              {months.map((month) => (
                <td key={month} className="border p-0 h-10">
                  <div className="flex justify-end items-center h-full">
                    <input
                      className="w-30 h-full px-2 py-1 text-right border-0 focus:ring-1 focus:ring-blue-500"
                      value={row[month]}
                      onChange={(e) => handleChange(i, month, e.target.value)}
                    />
                  </div>
                </td>
              ))}
            </tr>
          ))}
          <tr className="bg-gray-100 font-semibold">
            <td colSpan={5} className="text-right px-2 py-1 border">
              Totales:
            </td>
            {/* <td>
              {totals.presupuesto}
            </td> */}
            <td className="border px-2 py-1 text-right">
              {totals.presupuesto}
            </td>
            {months.map((m) => (
              <td key={m} className="border px-2 py-1 text-right">
                {totals[m]}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <div className="flex gap-2 mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded"
          onClick={addRow}
        >
          Agregar Partida
        </button>
        <button
          className="bg-green-600 text-white px-4 py-1 rounded"
          onClick={exportToExcel}
        >
          Exportar a Excel
        </button>
      </div>
    </div>
  );
}
