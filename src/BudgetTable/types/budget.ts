import { months, cogOptions } from "../constants/constants";

export type Month = typeof months[number];
export type cogOption = typeof cogOptions[number];
export type FixedField = 'comp' | 'ur' | 'urDescription';

export interface IBudgetRow {
  comp: string;
  ur: string;
  urDescription: string;
  cogKey?: string;
  cogDescription: string;
  enero: number;
  febrero: number;
  marzo: number;
  abril: number;
  mayo: number;
  junio: number;
  julio: number;
  agosto: number;
  septiembre: number;
  octubre: number;
  noviembre: number;
  diciembre: number;
}

export type BudgetAction =
  | { type: 'ADD_ROW' }
  | { type: 'UPDATE_ROW'; payload: { index: number; key: keyof IBudgetRow; value: string } }
  | { type: 'LOAD_DATA'; payload: IBudgetRow[] };

export interface BudgetData {
  data: IBudgetRow[];
  addRow: () => void;
  handleChange: (index: number, key: keyof IBudgetRow, value: string) => void;
  rowTotals: number[];
  monthlyTotals: Record<Month, number>;
  grandTotal: number;
}