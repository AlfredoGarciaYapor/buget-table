export type Month =
  | "enero"
  | "febrero"
  | "marzo"
  | "abril"
  | "mayo"
  | "junio"
  | "julio"
  | "agosto"
  | "septiembre"
  | "octubre"
  | "noviembre"
  | "diciembre";

export type FixedField = "comp" | "ur" | "urDescription";
export type DynamicField = Month;

export type BudgetKey = FixedField | "cogKey" | "cogDescription" | "budget" | Month;

export type BudgetRow = {
  comp: string;
  ur: string;
  urDescription: string;
  cogKey?: string;
  cogDescription: string;
} & Record<Month, number>;

export type cogOption = {
  cogKey: number;
  description: string;
};
