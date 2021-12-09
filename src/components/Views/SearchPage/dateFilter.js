import * as moment from "moment";
import jsonData from "../../../dataLayer/scheduleOfValues.json";

export default function getDatesFiltering(param) {
  switch (param) {
    case "today":
      return moment().format("L");
    case "yesterday":
      return moment().subtract(1, "days").format("L");
    default:
      return "no date available";
  }
}
