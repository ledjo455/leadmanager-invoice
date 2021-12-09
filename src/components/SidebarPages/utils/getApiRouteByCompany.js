import { compareIncluding } from "./compareIncluding"

const DEFAULT_COMPANY = "Core Scaffold Systems Inc"

export const getApiRouteByCompany = (
  companyName = "",
  first = "",
  second = ""
) => (compareIncluding(companyName, DEFAULT_COMPANY) ? first : second)
