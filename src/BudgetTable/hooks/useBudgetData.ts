import { useReducer, useEffect, useMemo } from "react";
import { defaultRow } from "../constants/constants";
import { calculateTotals } from "../utils/utils";
import type { IBudgetRow, BudgetData } from "../types/budget";
import { budgetReducer } from "../reducers/budgetReducer";

export function useBudgetData(): BudgetData {
  const [data, dispatch] = useReducer(budgetReducer, [], () => {
    const saved = localStorage.getItem("presupuestoData");
    return saved ? JSON.parse(saved) : [defaultRow];
  });

  useEffect(() => {
    localStorage.setItem("presupuestoData", JSON.stringify(data));
  }, [data]);

  const addRow = () => dispatch({ type: 'ADD_ROW' });
  
  const handleChange = (index: number, key: keyof IBudgetRow, value: string) => {
    dispatch({ type: 'UPDATE_ROW', payload: { index, key, value } });
  };

  const { rowTotals, monthlyTotals, grandTotal } = useMemo(() => 
    calculateTotals(data), 
    [data]
  );

  return {
    data,
    addRow,
    handleChange,
    rowTotals,
    monthlyTotals,
    grandTotal
  };
}