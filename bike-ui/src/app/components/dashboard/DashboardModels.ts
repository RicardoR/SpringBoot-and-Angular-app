export interface DashboardScreenData {
  salesPerMonth: SalesPerMonth[];
  salesPerYear: SalesPerYear[];
  serialNumberIssues: string;
  totalContactPerson: string;
  totalSales: number;
  totalRevenue: number;
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
