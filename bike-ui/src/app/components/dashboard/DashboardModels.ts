import { SalesPerMonth } from '../../core/models/SalesPerMonth';

export interface DashboardScreenData {
  salesPerMonth: SalesPerMonth[];
  serialNumberIssues: string;
  totalContactPerson: string;
  totalSales: number;
  totalRevenue: number;
}

export interface SalesPerMonthGraph {
  labels: string[];
  series: [number[]];
}
