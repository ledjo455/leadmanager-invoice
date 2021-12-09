import getDatesFiltering from "./dateFilter";
import jsonData from "../../../dataLayer/scheduleOfValues.json";
import * as moment from "moment";

// Today
const todayStart = moment().format("MM/DD/YYYY 00:00");
const todayStartTimeStamp = moment(todayStart).unix();
const todayEnd = moment().format("MM/DD/YYYY 23:59");
const todayEndTimeStamp = moment(todayEnd).unix();

//Yesterday

const yesterdayStart = moment().subtract(1, "days").format("MM/DD/YYYY 00:00");
const yesterdayTimeStampStart = moment(yesterdayStart).unix();
const yesterdayEnd = moment().subtract(1, "days").format("MM/DD/YYYY 23:59");
const yesterdayTimeStampEnd = moment(yesterdayEnd).unix();
const dates = [];
jsonData.map((element) => dates.push(element.createdAt));

// This Week
const today = moment();
const weekStart = today.startOf("week").format("MM/DD/YYYY");
const weekStartTimeStamp = moment(weekStart).unix();
const weekEnd = today.endOf("week").format("MM/DD/YYYY");
const weekEndTimeStamp = moment(weekEnd).unix();

// Past 7 Days
const past7Start = moment().subtract(7, "days").format("MM/DD/YYYY 00:00");
const past7StartTimeStamp = moment(past7Start).unix();
const past7End = moment().format("MM/DD/YYYY 00:00");
const past7EndTimeStamp = moment(past7End).unix();

// Past 30 days
const past30Start = moment().subtract(30, "days").format("MM/DD/YYYY 00:00");
const past30StartTimeStamp = moment(past30Start).unix();
const past30End = moment().format("MM/DD/YYYY 00:00");
const past30EndTimeStamp = moment(past30End).unix();

//

export default function dateFiltering(condition) {
  switch (condition) {
    case "today":
      console.log(
        "switching...",
        yesterdayStart,
        yesterdayTimeStampStart,
        "this week",
        weekStart,
        weekStartTimeStamp,
        weekEnd,
        weekEndTimeStamp
      );
      const rangeToday = getRange("today");
      return rangeToday;

    case "yesterday":
      const rangeYesterday = getRange("yesterday");
      return rangeYesterday;

    case "this week":
      const rangeThisWeek = getRange("this week");
      return rangeThisWeek;

    case "past 7":
      const rangePast7 = getRange("past 7");
      return rangePast7;

    case "past 30":
      const rangePast30 = getRange("past 30");
      return rangePast30;
    default:
      return "no available range selected";
  }
}

function getRange(day) {
  switch (day) {
    case "today":
      // const start = "1637020800000";
      // const end = "1637107199000";
      const start = todayStartTimeStamp;
      const end = todayEndTimeStamp;

      console.log("Important", dates[0], start, end, dates);

      return dates.filter((element) => element < end && element > start);
    case "yesterday":
      return dates.filter(
        (element) =>
          element < yesterdayTimeStampEnd && element > yesterdayTimeStampStart
      );

    case "this week":
      return dates.filter(
        (element) => element < weekEndTimeStamp && element > weekStartTimeStamp
      );

    case "past 7":
      return dates.filter(
        (element) =>
          element < past7EndTimeStamp && element > past7StartTimeStamp
      );

    case "past 30":
      return dates.filter(
        (element) =>
          element < past30EndTimeStamp && element > past30StartTimeStamp
      );

    default:
      return "No valid Date selected";
  }
}

export function getCustomRange(passedArray) {
  const startRange = moment(passedArray[0]).format("MM/DD/YYYY 00:00");
  const startRangeCustom = moment(startRange).unix();
  const endRange = moment(passedArray[1]).format("MM/DD/YYYY 23:59");
  const endRangeCustom = moment(endRange).unix();

  const rangeResult = dates.filter(
    (element) => element < endRangeCustom && element > startRangeCustom
  );
  console.log("Range Result", rangeResult);

  return rangeResult;
}
