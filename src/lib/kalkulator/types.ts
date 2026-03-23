// ─── Zadanie w ramach kategorii procesów ─────────────────────────
export interface ProcessTask {
  id: string;
  name: string;
  avgMinutesPerUnit: number;
  unitsPerMonthPerEmployee: number;
  automationRate: number;          // 0.0–1.0
  errorRateHuman: number;          // 0.0–1.0
  errorRateAI: number;             // 0.0–1.0
}

// ─── Kategoria procesu biznesowego ───────────────────────────────
export interface ProcessCategory {
  id: string;
  name: string;
  icon: string;                    // nazwa ikony lucide-react
  description: string;
  avgMonthlySalary: number;        // PLN brutto
  salaryRange: { min: number; max: number };
  tasks: ProcessTask[];
  overallAutomationRate: number;   // ważona średnia
  keyMetric: { label: string; value: string };
  color: string;                   // kolor akcentowy karty
}

// ─── Wybór użytkownika ───────────────────────────────────────────
export interface ProcessSelection {
  categoryId: string;
  enabled: boolean;
  employeeCount: number;
  hoursPerWeek: number;
  selectedTaskIds: string[];
  customSalary?: number;
}

export interface CompanyProfile {
  companyName: string;
  industry: string;
  totalEmployees: number;
  avgSalary: number;
  email: string;
}

export interface WizardState {
  currentStep: number;             // 0–3
  selections: ProcessSelection[];
  companyProfile: CompanyProfile;
}

// ─── Wyniki obliczeń ────────────────────────────────────────────
export interface ProcessResult {
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  employeeCount: number;
  currentMonthlyHours: number;
  automatedHours: number;
  currentMonthlyCost: number;      // PLN
  monthlySavings: number;
  annualSavings: number;
  errorReduction: { before: number; after: number };
  automationPercentage: number;
}

export interface YearProjection {
  year: number;
  savingsGross: number;
  implementationCost: number;
  netSavings: number;
  cumulative: number;
  efficiencyMultiplier: number;
}

export interface AggregateResults {
  processes: ProcessResult[];
  totalMonthlyHoursSaved: number;
  totalAnnualHoursSaved: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  totalCurrentCost: number;
  fteEquivalent: number;
  avgAutomationRate: number;
  estimatedImplementationCost: number;
  paybackMonths: number;
  roiPercent: number;
  roiPercentThreeYear: number;
  taxRelief: number;
  netSavingsAfterTax: number;
  compoundYears: YearProjection[];
}
