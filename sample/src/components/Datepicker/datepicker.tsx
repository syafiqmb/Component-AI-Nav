import "./DatePicker.css";

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useDayzed } from "dayzed";
import moment from "moment";
import React, { useState } from "react";
import ReactGA from "react-ga4";

const monthNamesShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const weekdayNamesShort = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const Calendar = ({
  calendars,
  getBackProps,
  getForwardProps,
  getDateProps,
  startDate,
  endDate,
  minDate,
}: any) => {
  const { colorMode } = useColorMode();
  const monthLabelColor = useColorModeValue("#2D3748", "#dfe0e1");
  const weekDayLabelColor = useColorModeValue("#718096", "#a6abb1");
  if (calendars.length) {
    return (
      <Box
        // style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}
        className="date-picker-calendar-container"
        data-testid="news-filter-date-picker-calendar-container"
      >
        {calendars.map(
          (calendar: {
            month: string | number | any;
            year:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
            weeks: any[];
          }) => (
            <Box
              key={`${calendar.month}${calendar.year}`}
              // style={{
              //   display: "inline-block",
              //   padding: "0 10px 30px",
              //   boxSizing: "border-box",
              // }}
              className="date-picker-calendar-wrapper"
              data-testid="news-filter-date-picker-calendar-wrapper"
            >
              <Box
                // style={{
                //   display: "flex",
                //   justifyContent: "space-between",
                //   margin: "0 4px",
                // }}
                className="date-picker-calendar-month-year-wrapper"
                data-testid="news-filter-date-picker-calendar-month-year-wrapper"
              >
                <Text
                  padding="10px 8px"
                  color={monthLabelColor}
                  fontWeight="600"
                  data-testid={`news-filter-date-picker-month-year-${calendar.month}-${calendar.year}`}
                >
                  {monthNamesShort[calendar.month]} {calendar.year}
                </Text>
                <Box
                  // style={{
                  //   display: "flex",
                  //   justifyContent: "flex-end",
                  //   alignItems: "center",
                  //   gap: "8px",
                  // }}
                  className="date-picker-previous-next-wrapper"
                  data-testid="news-filter-date-picker-previous-next-wrapper"
                >
                  <button
                    {...getBackProps({ calendars })}
                    data-testid="news-filter-date-picker-previous-button"
                  >
                    <ChevronLeftIcon data-testid="news-filter-date-picker-previous-button-icon" />
                  </button>
                  <button
                    {...getForwardProps({ calendars })}
                    data-testid="news-filter-date-picker-next-button"
                  >
                    <ChevronRightIcon data-testid="news-filter-date-picker-next-button-icon" />
                  </button>
                </Box>
              </Box>
              {weekdayNamesShort.map((weekday) => (
                <Box
                  key={`${calendar.month}${calendar.year}${weekday}`}
                  // style={{
                  //   display: "inline-block",
                  //   width: "32px",
                  //   height: "32px",
                  //   border: "none",
                  //   background: "transparent",
                  //   color: "#718096",
                  // }}
                  color={weekDayLabelColor}
                  className="date-picker-weekday"
                  data-testid={`news-filter-date-picker-weekday-${weekday}`}
                >
                  {weekday}
                </Box>
              ))}
              {calendar.weeks.map((week: any[], weekIndex: any) =>
                week.map(
                  (
                    dateObj: {
                      date: any;
                      selected: any;
                      selectable: any;
                      today: any;
                    },
                    index: any,
                  ) => {
                    let key = `${calendar.month}${calendar.year}${weekIndex}${index}`;
                    if (!dateObj) {
                      return (
                        <Box
                          key={key}
                          // style={{
                          //   display: "inline-block",
                          //   width: "32px",
                          //   border: "none",
                          //   background: "transparent",
                          // }}
                          className="date-picker-week"
                          data-testid="news-filter-date-picker-week"
                        />
                      );
                    }
                    let { date, selected, selectable, today } = dateObj;
                    let background;
                    let color;
                    if (colorMode === "light") {
                      background = today ? "rgb(137, 162, 189)" : "";
                      background = selected ? "#BEE3F8" : background;
                      background = !selectable ? "transparent" : background;
                      color = !selectable ? "#8d8e98" : "#2D3748";
                    } else if (colorMode === "dark") {
                      background = today ? "#5a7188" : "";
                      background = selected ? "#1380be" : background;
                      background = !selectable ? "transparent" : background;
                      color = !selectable ? "#7d7d7e" : color;
                    }

                    if (startDate !== null && endDate !== null) {
                      const currentDate = moment(
                        endDate - startDate,
                        "M/D/YYYY",
                      );
                      const start = moment(startDate, "M/D/YYYY");
                      const end = moment(endDate, "M/D/YYYY");

                      // try to set background-color for dates in-range but not selected
                      if (
                        currentDate.isSameOrAfter(start) &&
                        currentDate.isSameOrBefore(end)
                      ) {
                        background = "orange"; // Set background color for dates between startDate and endDate
                      }
                    }
                    const disableDate =
                      minDate && minDate.getTime()
                        ? date.getTime() < minDate.getTime()
                        : false;
                    const backgroundColor = { background, color };
                    return (
                      <button
                        disabled={disableDate}
                        style={backgroundColor}
                        className="date-picker-get-date"
                        data-testid={`news-filter-date-picker-date-${date.getDate()}`}
                        key={key}
                        {...getDateProps({ dateObj })}
                      >
                        {selectable ? date.getDate() : date.getDate()}
                      </button>
                    );
                  },
                ),
              )}
            </Box>
          ),
        )}
      </Box>
    );
  }
  return null;
};

/*----------- Custom Hook -----------*/

function DayzedDatepicker(props: any) {
  let dayzedData = useDayzed(props);
  return <Calendar {...dayzedData} />;
}

/*----------- Functional Component -----------*/
const DatePicker: React.FC<any> = ({
  setStartDate,
  setEndDate,
  startDate,
  endDate,
  setDatesDropdown,
}) => {
  // set up Google Analytics
  ReactGA.initialize("G-N82CLCBQFS");

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const handleStartDateSelected = ({ date }: any) => {
    setStart(date);
    setEnd(null);
  };

  const handleEndDateSelected = ({ date }: any) => {
    setEnd(date);
  };

  const handleClearBtn = () => {
    setStart(null);
    setEnd(null);
    setStartDate(null);
    setEndDate(null);
    setDatesDropdown(false);
  };

  const handleDoneBtn = () => {
    // update Google Analytics event
    ReactGA.event({
      category: "Button click",
      action: "Applied date filter",
    });

    setStartDate(start);
    setEndDate(end);
    setDatesDropdown(false);
  };

  const dateLabelColor = useColorModeValue(
    { color: "#646a74" },
    { color: "#b3b3b3" },
  );

  return (
    <Box
      display="flex"
      flexDirection="row"
      data-testid="news-filter-date-picker-container"
    >
      <VStack
        width="100%"
        data-testid="news-filter-date-picker-from-to-date-content"
      >
        <Box
          display="flex"
          gap="6px"
          flex="row"
          data-testid="news-filter-date-picker-from-to-date-wrapper"
        >
          <Box data-testid="news-filter-date-picker-from-date-box">
            <Text
              color={dateLabelColor}
              className="date-label-text"
              data-testid="news-filter-date-picker-from-date-title"
            >
              From Date:
            </Text>
            <DayzedDatepicker
              data-testid="news-filter-date-picker-from-date"
              selected={start}
              onDateSelected={handleStartDateSelected}
              firstDayOfWeek={1}
              startDate={startDate}
              endDate={endDate}
              setStart={setStart}
              setEnd={setEnd}
            />
          </Box>
          <Box data-testid="news-filter-date-picker-to-date-box">
            <Text
              color={dateLabelColor}
              className="date-label-text"
              data-testid="news-filter-date-picker-to-date-title"
            >
              To Date:
            </Text>
            <DayzedDatepicker
              data-testid="news-filter-date-picker-to-date"
              selected={end}
              onDateSelected={handleEndDateSelected}
              firstDayOfWeek={1}
              startDate={startDate}
              endDate={endDate}
              setStart={setStart}
              setEnd={setEnd}
              minDate={start}
            />
          </Box>
        </Box>
        {/* {startDate && (
          <Box style={{ paddingTop: 20, textAlign: "center" }}>
            <p>Selected:</p>
            <p>{`${startDate.toLocaleDateString()}`}</p>
          </Box>
        )} */}
        <Box
          display="flex"
          justifyContent="flex-end"
          width="100%"
          data-testid="news-filter-date-picker-buttons-wrapper"
        >
          <Button
            fontWeight="400"
            width="106px"
            data-testid="news-filter-date-picker-clear-button"
            onClick={handleClearBtn}
          >
            Clear
          </Button>
          <Button
            data-testid="news-filter-date-picker-done-button"
            fontWeight="400"
            width="106px"
            color="#FFF"
            backgroundColor="#007CB0"
            _hover={{ backgroundColor: "#0b658b" }}
            marginLeft="2"
            onClick={handleDoneBtn}
          >
            Done
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default DatePicker;
