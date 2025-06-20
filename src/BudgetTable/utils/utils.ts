import saveAs from "file-saver";
import { months } from "../constants/constants";
import type { IBudgetRow, Month } from "../types/budget";
import ExcelJS from "exceljs";

export function calculateTotals(data: IBudgetRow[]) {
  const rowTotals = data.map(row => 
    months.reduce((sum, month) => sum + (row[month] || 0), 0)
  );
  
  const monthlyTotals = months.reduce((acc, month) => {
    acc[month] = data.reduce((sum, row) => sum + (row[month] || 0), 0);
    return acc;
  }, {} as Record<Month, number>);
  
  const grandTotal = rowTotals.reduce((sum, total) => sum + total, 0);
  
  return { rowTotals, monthlyTotals, grandTotal };
}

export async function exportToExcel(
  data: IBudgetRow[], 
  rowTotals: number[], 
  monthlyTotals: Record<Month, number>, 
  grandTotal: number
) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Presupuesto");

  sheet.addRow([
    "Clave", "Año", "urDescription", "cogKey", "Descripción", 
    ...months.map(m => m[0].toUpperCase() + m.slice(1)), 
    "Presupuesto"
  ]);

  data.forEach((row, i) => {
    sheet.addRow([
      (row.comp = "C0201"),
      (row.ur = "201101"),
      (row.urDescription = "Secretaría de Asuntos Legislativos y Jurídicos"),
      row.cogKey,
      row.cogDescription,
      ...months.map(m => row[m]),
      rowTotals[i]
    ]);
  });

  sheet.addRow([
    "", "", "", "", "Totales:",
    ...months.map(m => monthlyTotals[m]),
    grandTotal
  ]);

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer], { 
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
  }), "presupuesto.xlsx");
}