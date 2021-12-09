export const onFilter = ({ gridApi, column, current, type = "equals" }) => {
  console.log({ current, type, column })
  const currentValues = Array.isArray(current)
    ? { values: [...current] }
    : { filter: current }
  type === "set"
    ? gridApi
        .getFilterInstance(column)
        .getChildFilterInstance(1)
        .setModel({
          type,
          ...currentValues,
        })
    : gridApi.getFilterInstance(column).setModel({
        type,
        ...currentValues,
      })
  gridApi.onFilterChanged()
}

export const onDateFilter = ({ gridApi, column, dateArray }) => {
  gridApi.getFilterInstance(column).setModel({
    type: "inRange",
    filterType: "date",
    dateFrom: dateArray[0]?.format("YYYY-MM-DD"),
    dateTo: dateArray[1]?.format("YYYY-MM-DD"),
  })
  gridApi.onFilterChanged()
}

export const clearFilter = ({ gridApi, column }) => {
  gridApi.getFilterInstance(column).setModel(null)
  gridApi.onFilterChanged()
}

export const clearAllFilters = ({ filters, gridApi }) => {
  filters.map((column) => clearFilter({ gridApi, column }))
}
