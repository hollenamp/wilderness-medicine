// Tremor BarList [v1.0.0]

import React from "react"

import { cx, focusRing } from "@/lib/utils"

type Bar<T> = T & {
  key?: string
  href?: string
  value: number
  name: string
  leading?: React.ReactNode
  barClassName?: string
}

interface BarListProps<T = unknown>
  extends React.HTMLAttributes<HTMLDivElement> {
  data: Bar<T>[]
  valueFormatter?: (value: number) => string
  showAnimation?: boolean
  onValueChange?: (payload: Bar<T>) => void
  sortOrder?: "ascending" | "descending" | "none"
  barClassName?: string
  barLabelClassName?: string
}

const defaultBarClassName =
  "bg-blue-200 dark:bg-blue-900 group-hover:bg-blue-300 dark:group-hover:bg-blue-800"

function BarListInner<T>(
  {
    data = [],
    valueFormatter = (value) => value.toString(),
    showAnimation = false,
    onValueChange,
    sortOrder = "descending",
    barClassName = defaultBarClassName,
    barLabelClassName,
    className,
    ...props
  }: BarListProps<T>,
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
) {
  const Component = onValueChange ? "button" : "div"
  const sortedData = React.useMemo(() => {
    if (sortOrder === "none") {
      return data
    }
    return [...data].sort((a, b) => {
      return sortOrder === "ascending" ? a.value - b.value : b.value - a.value
    })
  }, [data, sortOrder])

  const widths = React.useMemo(() => {
    const maxValue = Math.max(...sortedData.map((item) => item.value), 0)
    return sortedData.map((item) =>
      item.value === 0 ? 0 : Math.max((item.value / maxValue) * 100, 2),
    )
  }, [sortedData])

  const rowHeight = "h-8"
  const hasLeading = sortedData.some((item) => item.leading)

  const labelTextClassName =
    barLabelClassName ?? "text-gray-900 dark:text-gray-50"

  const renderBarLabel = (item: Bar<T>) =>
    item.href ? (
      <a
        href={item.href}
        className={cx(
          "truncate whitespace-nowrap rounded-sm text-sm",
          labelTextClassName,
          "hover:underline hover:underline-offset-2",
          focusRing,
        )}
        target="_blank"
        rel="noreferrer"
        onClick={(event) => event.stopPropagation()}
      >
        {item.name}
      </a>
    ) : (
      <p
        className={cx(
          "truncate whitespace-nowrap text-sm",
          labelTextClassName,
        )}
      >
        {item.name}
      </p>
    )

  return (
    <div
      ref={forwardedRef}
      className={cx("flex justify-between space-x-6", className)}
      aria-sort={sortOrder}
      tremor-id="tremor-raw"
      {...props}
    >
      <div
        className={cx(
          "w-full space-y-1.5",
          hasLeading ? "space-y-2" : "relative",
        )}
      >
        {sortedData.map((item, index) => {
          const itemBarClassName = item.barClassName ?? barClassName

          const bar = (
            <div
              className={cx(
                "flex items-center rounded-sm transition-all",
                rowHeight,
                itemBarClassName,
                onValueChange ? "" : "",
                {
                  "mb-0": index === sortedData.length - 1 && !hasLeading,
                  "duration-800": showAnimation,
                },
              )}
              style={{ width: `${widths[index]}%` }}
            >
              <div className={cx("absolute left-2 flex max-w-full pr-2")}>
                {renderBarLabel(item)}
              </div>
            </div>
          )

          if (hasLeading) {
            return (
              <div
                key={item.key ?? item.name}
                className={cx("flex items-center gap-2", rowHeight)}
              >
                {item.leading}
                <Component
                  onClick={() => {
                    onValueChange?.(item)
                  }}
                  className={cx(
                    "group relative min-w-0 flex-1 rounded-sm",
                    focusRing,
                    onValueChange
                      ? "-m-0! cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900"
                      : "",
                  )}
                >
                  {bar}
                </Component>
              </div>
            )
          }

          return (
            <Component
              key={item.key ?? item.name}
              onClick={() => {
                onValueChange?.(item)
              }}
              className={cx(
                "group w-full rounded-sm",
                focusRing,
                onValueChange
                  ? [
                      "-m-0! cursor-pointer",
                      "hover:bg-gray-50 dark:hover:bg-gray-900",
                    ]
                  : "",
              )}
            >
              {bar}
            </Component>
          )
        })}
      </div>
      <div>
        {sortedData.map((item, index) => (
          <div
            key={item.key ?? item.name}
            className={cx(
              "flex items-center justify-end",
              rowHeight,
              index === sortedData.length - 1 ? "mb-0" : "mb-1.5",
            )}
          >
            <p
              className={cx(
                "truncate whitespace-nowrap text-sm leading-none",
                "text-gray-900 dark:text-gray-50",
              )}
            >
              {valueFormatter(item.value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

BarListInner.displayName = "BarList"

const BarList = React.forwardRef(BarListInner) as <T>(
  p: BarListProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => ReturnType<typeof BarListInner>

export { BarList, type BarListProps, type Bar }
