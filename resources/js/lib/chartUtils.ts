// Tremor Raw chartColors [v0.1.0]

export type ColorUtility = "bg" | "stroke" | "fill" | "text"

export const chartColors = {
  blue: {
    bg: "bg-blue-500",
    stroke: "stroke-blue-500",
    fill: "fill-blue-500",
    text: "text-blue-500",
  },
  emerald: {
    bg: "bg-emerald-500",
    stroke: "stroke-emerald-500",
    fill: "fill-emerald-500",
    text: "text-emerald-500",
  },
  violet: {
    bg: "bg-violet-500",
    stroke: "stroke-violet-500",
    fill: "fill-violet-500 dark:fill-violet-500",
    text: "text-violet-500",
  },
  amber: {
    bg: "bg-amber-500",
    stroke: "stroke-amber-500",
    fill: "fill-amber-500",
    text: "text-amber-500",
  },
  gray: {
    bg: "bg-gray-500",
    stroke: "stroke-gray-500",
    fill: "fill-gray-500",
    text: "text-gray-500",
  },
  zinc: {
    bg: "bg-muted",
    stroke: "stroke-muted-foreground",
    fill: "fill-muted-foreground",
    text: "text-muted-foreground",
  },
  chart1: {
    bg: "bg-admin-chart-1",
    stroke: "stroke-admin-chart-1",
    fill: "fill-admin-chart-1",
    text: "text-admin-chart-1",
  },
  chart2: {
    bg: "bg-admin-chart-2",
    stroke: "stroke-admin-chart-2",
    fill: "fill-admin-chart-2",
    text: "text-admin-chart-2",
  },
  chart3: {
    bg: "bg-admin-chart-3",
    stroke: "stroke-admin-chart-3",
    fill: "fill-admin-chart-3",
    text: "text-admin-chart-3",
  },
  chart4: {
    bg: "bg-admin-chart-4",
    stroke: "stroke-admin-chart-4",
    fill: "fill-admin-chart-4",
    text: "text-admin-chart-4",
  },
  chart5: {
    bg: "bg-admin-chart-5",
    stroke: "stroke-admin-chart-5",
    fill: "fill-admin-chart-5",
    text: "text-admin-chart-5",
  },
  cyan: {
    bg: "bg-cyan-500",
    stroke: "stroke-cyan-500",
    fill: "fill-cyan-500",
    text: "text-cyan-500",
  },
  pink: {
    bg: "bg-pink-500",
    stroke: "stroke-pink-500",
    fill: "fill-pink-500",
    text: "text-pink-500",
  },
  lime: {
    bg: "bg-lime-500",
    stroke: "stroke-lime-500",
    fill: "fill-lime-500 dark:fill-lime-500",
    text: "text-lime-500",
  },
  fuchsia: {
    bg: "bg-fuchsia-500",
    stroke: "stroke-fuchsia-500",
    fill: "fill-fuchsia-500 dark:fill-fuchsia-500",
    text: "text-fuchsia-500",
  },
} as const satisfies {
  [color: string]: {
    [key in ColorUtility]: string
  }
}

export type AvailableChartColorsKeys = keyof typeof chartColors

export const AvailableChartColors: AvailableChartColorsKeys[] = Object.keys(
  chartColors,
) as Array<AvailableChartColorsKeys>

export const constructCategoryColors = (
  categories: string[],
  colors: AvailableChartColorsKeys[],
): Map<string, AvailableChartColorsKeys> => {
  const categoryColors = new Map<string, AvailableChartColorsKeys>()
  categories.forEach((category, index) => {
    categoryColors.set(category, colors[index % colors.length])
  })
  return categoryColors
}

export const getColorClassName = (
  color: AvailableChartColorsKeys,
  type: ColorUtility,
): string => {
  const fallbackColor = {
    bg: "bg-gray-500",
    stroke: "stroke-gray-500",
    fill: "fill-gray-500",
    text: "text-gray-500",
  }
  return chartColors[color]?.[type] ?? fallbackColor[type]
}

/** Matches BarChart category order: Live Sites → blue, Pages → emerald */
export const chartCategoryColorKeys = {
  "Live Sites": "blue",
  Pages: "emerald",
} as const satisfies Record<string, AvailableChartColorsKeys>

export type ChartCategoryName = keyof typeof chartCategoryColorKeys

export function chartCategoryColorClassName(
  category: ChartCategoryName,
  type: ColorUtility,
): string {
  return getColorClassName(chartCategoryColorKeys[category], type)
}

export function chartCategoryBarListClassName(
  category: ChartCategoryName,
): string {
  return `${chartCategoryColorClassName(category, "bg")} transition-opacity group-hover:opacity-90`
}

// Tremor Raw getYAxisDomain [v0.0.0]

export const getYAxisDomain = (
  autoMinValue: boolean,
  minValue: number | undefined,
  maxValue: number | undefined,
) => {
  const minDomain = autoMinValue ? "auto" : minValue ?? 0
  const maxDomain = maxValue ?? "auto"
  return [minDomain, maxDomain]
}

// Tremor Raw hasOnlyOneValueForKey [v0.1.0]

export function hasOnlyOneValueForKey(
  array: any[],
  keyToCheck: string,
): boolean {
  const val: any[] = []

  for (const obj of array) {
    if (Object.prototype.hasOwnProperty.call(obj, keyToCheck)) {
      val.push(obj[keyToCheck])
      if (val.length > 1) {
        return false
      }
    }
  }

  return true
}