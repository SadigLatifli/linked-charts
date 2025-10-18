export interface DataPoint {
  date: string;
  value: number;
}

export interface CategoryData {
  category: string;
  values: DataPoint[];
}

export interface BarDataItem {
  name: string;
  value: number;
}

export interface ChartClickParams {
  componentType: string;
  name: string;
}