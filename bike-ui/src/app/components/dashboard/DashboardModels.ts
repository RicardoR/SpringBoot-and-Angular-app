export interface DashboardScreenData {
  salesPerMonth: SalesPerMonth[];
  salesPerYear: SalesPerYear[];
  statisticalData: StatisticalData;
}
export interface SalesGraph {
  labels: string[];
  series: [number[]];
}
export interface SalesPerMonth {
  id: number;
  month: string;
  purchase: number;
}
export interface SalesPerYear {
  purchase: number;
  year: string;
}

export interface StatisticalData {
  totalContactPerson: string;
  totalSales: number;
  totalSerialNumberIssues: string;
  totalRevenue: number;
}
