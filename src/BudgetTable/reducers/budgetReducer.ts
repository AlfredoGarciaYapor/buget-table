
import { cogOptions, defaultRow, months } from "../constants/constants";
import type { FixedField, IBudgetRow, Month } from "../types/budget";


export type BudgetAction =
  | { type: "ADD_ROW" }
  | { type: "UPDATE_ROW"; payload: { index: number; key: keyof IBudgetRow; value: string } }
  | { type: "LOAD_DATA"; payload: IBudgetRow[] };

export function budgetReducer(state: IBudgetRow[], action: BudgetAction): IBudgetRow[] {
  switch (action.type) {
    case 'ADD_ROW':
      return [...state, { ...defaultRow }];

    case 'UPDATE_ROW':
      const { index, key, value } = action.payload;
      const updated = [...state];

      if (key === "cogKey") {
        updated[index].cogKey = value;
        const option = cogOptions.find(p => p.cogKey === +value);
        updated[index].cogDescription = option?.description || "";
      } else if (months.includes(key as Month)) {
        if (!/^\d*$/.test(value)) return state;
        updated[index][key as Month] = Number(value);
      } else if ((["comp", "ur", "urDescription"] as FixedField[]).includes(key as FixedField)) {
        updated[index][key as FixedField] = value;
      }

      return updated;

    case 'LOAD_DATA':
      return action.payload.length ? action.payload : [{ ...defaultRow }];

    default:
      return state;
  }
}