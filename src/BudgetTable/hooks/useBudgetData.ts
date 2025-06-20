import { useReducer, useEffect, useMemo } from "react";
import { cogOptions, defaultRow, months } from "../constants/constants";
import { calculateTotals } from "../utils/utils";
import type { BudgetAction, IBudgetRow, BudgetData, Month, FixedField } from "../types/budget";
import { budgetReducer } from "../reducers/budgetReducer";

// function budgetReducer(state: IBudgetRow[], action: BudgetAction): IBudgetRow[] {
//   switch (action.type) {
//     case 'ADD_ROW':
//       return [...state, { ...defaultRow }];
    
//     case 'UPDATE_ROW':
//       const { index, key, value } = action.payload;
//       const updated = [...state];
      
//       if (key === "cogKey") {
//         updated[index].cogKey = value;
//         const option = cogOptions.find(p => p.cogKey === +value);
//         updated[index].cogDescription = option?.description || "";
//       } else if (months.includes(key as Month)) {
//         if (!/^\d*$/.test(value)) return state;
//         updated[index][key as Month] = Number(value);
//       } else if ((["comp", "ur", "urDescription"] as FixedField[]).includes(key as FixedField)) {
//         updated[index][key as FixedField] = value;
//       }
      
//       return updated;
    
//     case 'LOAD_DATA':
//       return action.payload.length ? action.payload : [{ ...defaultRow }];
    
//     default:
//       return state;
//   }
// }

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