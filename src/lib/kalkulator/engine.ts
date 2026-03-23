import type {
  ProcessSelection,
  ProcessCategory,
  ProcessResult,
  CompanyProfile,
  AggregateResults,
  YearProjection,
} from './types';
import {
  EMPLOYER_COST_MULTIPLIER,
  STANDARD_MONTHLY_HOURS,
  WORKING_WEEKS_PER_MONTH,
  TAX_RELIEF_RATE,
  COMPOUND_GROWTH_RATE,
} from './constants';

// ─── Formatowanie PLN ────────────────────────────────────────────
export function formatZl(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) {
    return (value / 1_000_000).toFixed(1).replace('.', ',') + ' mln';
  }
  if (abs >= 1_000) {
    const rounded = Math.round(value).toLocaleString('pl-PL');
    return rounded;
  }
  return Math.round(value).toLocaleString('pl-PL');
}

export function formatHours(value: number): string {
  if (value >= 1_000) {
    return Math.round(value).toLocaleString('pl-PL');
  }
  return Math.round(value).toString();
}

// ─── Obliczenia per-proces ───────────────────────────────────────
export function calculateProcessResult(
  selection: ProcessSelection,
  category: ProcessCategory,
  fallbackSalary?: number
): ProcessResult {
  const salary = selection.customSalary || category.avgMonthlySalary || fallbackSalary || 8_735;
  const employerCost = salary * EMPLOYER_COST_MULTIPLIER;
  const hourlyRate = employerCost / STANDARD_MONTHLY_HOURS;

  const currentMonthlyHours =
    selection.employeeCount * selection.hoursPerWeek * WORKING_WEEKS_PER_MONTH;

  // Ważona średnia automatyzacji z wybranych zadań
  const selectedTasks = category.tasks.filter((t) =>
    selection.selectedTaskIds.includes(t.id)
  );
  const weightedAutomation =
    selectedTasks.length > 0
      ? selectedTasks.reduce((sum, t) => sum + t.automationRate, 0) /
        selectedTasks.length
      : category.overallAutomationRate;

  const automatedHours = currentMonthlyHours * weightedAutomation;
  const currentMonthlyCost = currentMonthlyHours * hourlyRate;
  const monthlySavings = automatedHours * hourlyRate;

  // Średnie błędy
  const avgErrorHuman =
    selectedTasks.length > 0
      ? selectedTasks.reduce((s, t) => s + t.errorRateHuman, 0) / selectedTasks.length
      : 0.05;
  const avgErrorAI =
    selectedTasks.length > 0
      ? selectedTasks.reduce((s, t) => s + t.errorRateAI, 0) / selectedTasks.length
      : 0.02;

  return {
    categoryId: category.id,
    categoryName: category.name,
    categoryColor: category.color,
    employeeCount: selection.employeeCount,
    currentMonthlyHours,
    automatedHours,
    currentMonthlyCost,
    monthlySavings,
    annualSavings: monthlySavings * 12,
    errorReduction: {
      before: Math.round(avgErrorHuman * 100 * 10) / 10,
      after: Math.round(avgErrorAI * 100 * 10) / 10,
    },
    automationPercentage: Math.round(weightedAutomation * 100),
  };
}

// ─── Obliczenia zagregowane ──────────────────────────────────────
export function calculateAggregate(
  processResults: ProcessResult[],
  _companyProfile: CompanyProfile
): AggregateResults {
  const sum = (arr: ProcessResult[], fn: (r: ProcessResult) => number) =>
    arr.reduce((s, r) => s + fn(r), 0);
  const avg = (arr: ProcessResult[], fn: (r: ProcessResult) => number) =>
    arr.length > 0 ? sum(arr, fn) / arr.length : 0;

  const totalMonthlySavings = sum(processResults, (r) => r.monthlySavings);
  const totalAnnualSavings = totalMonthlySavings * 12;
  const totalCurrentCost = sum(processResults, (r) => r.currentMonthlyCost) * 12;

  // Koszt wdrożenia: ~2.5 × miesięczne oszczędności (benchmark PL)
  const estimatedImplementationCost = Math.max(totalMonthlySavings * 2.5, 5_000);

  // Zwrot inwestycji
  const paybackMonths =
    totalMonthlySavings > 0
      ? Math.ceil(estimatedImplementationCost / totalMonthlySavings)
      : 99;

  // ROI pierwszego roku
  const roiPercent =
    estimatedImplementationCost > 0
      ? Math.round(
          ((totalAnnualSavings - estimatedImplementationCost) /
            estimatedImplementationCost) *
            100
        )
      : 0;

  // Ulga podatkowa na robotyzację (50% kosztów wdrożenia)
  const taxRelief = estimatedImplementationCost * TAX_RELIEF_RATE;

  // Projekcja 5-letnia (compound +15%/rok)
  const compoundYears: YearProjection[] = Array.from({ length: 5 }, (_, i) => {
    const multiplier = Math.pow(1 + COMPOUND_GROWTH_RATE, i);
    const yearSavings = totalAnnualSavings * multiplier;
    const implCost = i === 0 ? estimatedImplementationCost : 0;
    return {
      year: i + 1,
      savingsGross: yearSavings,
      implementationCost: implCost,
      netSavings: yearSavings - implCost,
      cumulative: 0,
      efficiencyMultiplier: multiplier,
    };
  });

  let cumulative = 0;
  compoundYears.forEach((y) => {
    cumulative += y.netSavings;
    y.cumulative = cumulative;
  });

  // ROI 3-letni
  const threeYearSavings = compoundYears
    .slice(0, 3)
    .reduce((s, y) => s + y.savingsGross, 0);
  const roiPercentThreeYear =
    estimatedImplementationCost > 0
      ? Math.round(
          ((threeYearSavings - estimatedImplementationCost) /
            estimatedImplementationCost) *
            100
        )
      : 0;

  // Ekwiwalent etatów
  const totalMonthlyAutomatedHours = sum(processResults, (r) => r.automatedHours);
  const fteEquivalent = totalMonthlyAutomatedHours / STANDARD_MONTHLY_HOURS;

  return {
    processes: processResults,
    totalMonthlyHoursSaved: totalMonthlyAutomatedHours,
    totalAnnualHoursSaved: totalMonthlyAutomatedHours * 12,
    totalMonthlySavings,
    totalAnnualSavings,
    totalCurrentCost,
    fteEquivalent: Math.round(fteEquivalent * 10) / 10,
    avgAutomationRate: Math.round(avg(processResults, (r) => r.automationPercentage)),
    estimatedImplementationCost,
    paybackMonths: Math.min(Math.max(paybackMonths, 1), 99),
    roiPercent,
    roiPercentThreeYear,
    taxRelief,
    netSavingsAfterTax: totalAnnualSavings + taxRelief,
    compoundYears,
  };
}
