import "./NewsFilter.css";

import {
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import ReactGA from "react-ga4";

import LightDropdownIcon from "../../assets/images/CkChevronDown.svg";
import DarkDropdownIcon from "../../assets/images/CkChevronDownWhite.svg";
import LightCalendarIcon from "../../assets/images/MdOutlineDateRange.svg";
import DarkCalendarIcon from "../../assets/images/MdOutlineDateRangeWhite.svg";
// import { ReactComponent as LightFilterIcon } from "../../assets/images/MdOutlineTune.svg";
// import { ReactComponent as DarkFilterIcon } from "../../assets/images/MdOutlineTuneWhite.svg";
import DatePicker from "../Datepicker";

const NewsFilter = ({ listoftopic, submitFunc }) => {
  // set up Google Analytics
  ReactGA.initialize("G-N82CLCBQFS");

  const { colorMode } = useColorMode();
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [valueStart, setValueStart] = useState(null);
  const [valueEnd, setValueEnd] = useState(null);
  const [datesDropdown, setDatesDropdown] = useState(false);
  const [topicsDropdown, setTopicsDropdown] = useState(false);

  // defining color for dark & light mode
  const dropdownBgColor = useColorModeValue(
    // light mode
    "#FFF",
    // dark mode
    "#1a202c",
  );

  const filterBorderColor = useColorModeValue(
    // light mode
    "1px solid #e2e8f0",
    // dark mode
    "1px solid #e2e8f034",
  );

  const borderColor = useColorModeValue(
    // light mode
    "1px solid #1a202c",
    // dark mode
    "1px solid rgba(255, 255, 255, 0.8)",
  );

  useEffect(() => {
    const submitButton = async () => {
      const startDate = valueStart
        ? moment(valueStart).format("M/D/YYYY")
        : null;
      const endDate = valueEnd ? moment(valueEnd).format("M/D/YYYY") : null;
      await submitFunc(
        {
          topics: selectedTopics,
          from_date: startDate,
          to_date: endDate,
        } || {},
      );
    };
    submitButton();
  }, [selectedTopics, valueStart, valueEnd]);

  const filterChange = (e) => {
    // update Google Analytics event
    ReactGA.event({
      category: "Button click",
      action: "Applied topics filter",
    });

    const { value, checked } = e.target;

    if (checked) {
      setSelectedTopics([...selectedTopics, value]);
    } else {
      setSelectedTopics(selectedTopics.filter((topic) => topic !== value));
    }
  };

  return (
    <Flex
      gap="1"
      className="filter-menu"
      data-testid="news-filter-menu-container"
    >
      <Flex
        direction="column"
        width="244px"
        data-testid="news-filter-menu-flex"
      >
        <Box
          className="news-filter-box"
          data-testid="news-filter-date-picker-content"
          border={filterBorderColor}
          onClick={() => {
            setDatesDropdown(!datesDropdown);
            setTopicsDropdown(false);
          }}
        >
          {/* <Text className="filter-box-text">Dates</Text> */}
          <Text
            className="filter-box-text"
            data-testid="news-filter-date-picker-title"
          >
            {valueStart === null && valueEnd === null
              ? "Dates"
              : valueStart !== null && valueEnd !== null
                ? valueStart === valueEnd
                  ? `${moment(valueStart).format("D MMM YYYY")}`
                  : `${moment(valueStart).format("D MMM YYYY")} - ${moment(
                      valueEnd,
                    ).format("D MMM YYYY")}`
                : valueStart !== null
                  ? `${moment(valueStart).format("D MMM YYYY")} ~ `
                  : `~ ${moment(valueEnd).format("D MMM YYYY")}`}
          </Text>
          {colorMode === "light" ? (
            <LightCalendarIcon
              className="filter-btn-icon"
              data-testid="news-filterd-date-picker-light-calendar-icon"
            />
          ) : (
            <DarkCalendarIcon
              className="filter-btn-icon"
              data-testid="news-filter-date-picker-dark-calendar-icon"
            />
          )}
        </Box>
        {datesDropdown ? (
          <Box
            // ref={datesRef}
            className="date-dropdown"
            data-testid="news-filter-date-picker-dropdown-wrapper"
            background={dropdownBgColor}
          >
            <DatePicker
              setStartDate={setValueStart}
              setEndDate={setValueEnd}
              startDate={valueStart}
              endDate={valueEnd}
              setDatesDropdown={setDatesDropdown}
            />
          </Box>
        ) : (
          ""
        )}
      </Flex>
      <Flex direction="column" data-testid="news-filter-topics-flex">
        <Box
          className="news-filter-box"
          data-testid="news-filter-topics-content"
          border={filterBorderColor}
          onClick={() => {
            setTopicsDropdown(!topicsDropdown);
            setDatesDropdown(false);
          }}
        >
          {/* <Text className="filter-box-text">All Topics</Text> */}
          <Text
            className="filter-box-text"
            data-testid="news-filter-topics-title"
          >
            {selectedTopics.length > 0
              ? selectedTopics.length === 1
                ? selectedTopics.length + " Topic Selected"
                : selectedTopics.length + " Topics Selected"
              : "All Topics"}
          </Text>
          {colorMode === "light" ? (
            <LightDropdownIcon
              className="filter-btn-icon"
              data-testid="news-filter-topics-light-dropdown-icon"
            />
          ) : (
            <DarkDropdownIcon
              className="filter-btn-icon"
              data-testid="news-filter-topics-dark-dropdown-icon"
            />
          )}
        </Box>
        {topicsDropdown ? (
          <Box
            // ref={topicsRef}
            className="topics-dropdown"
            data-testid="news-filter-topics-dropdown-wrapper"
            style={{ background: dropdownBgColor }}
          >
            <Box className="topics-checkbox">
              <CheckboxGroup
                direction="column"
                data-testid="news-filter-topics-dropdown-checkbox-group"
                defaultValue={selectedTopics}
              >
                {listoftopic.length > 0
                  ? listoftopic.map((topic, index) => (
                      <Checkbox
                        key={index}
                        isChecked={selectedTopics.includes(topic)}
                        value={topic}
                        data-testid="news-filter-topics-dropdown-checkbox"
                        className="topics-checkbox"
                        onChange={filterChange}
                      >
                        {topic}
                      </Checkbox>
                    ))
                  : "No topics found."}
              </CheckboxGroup>
            </Box>
          </Box>
        ) : (
          ""
        )}
      </Flex>
      {/* <Box className="filter-btn" border={borderColor}>
        {colorMode === "light" ? (
          <LightFilterIcon className="filter-btn-icon" />
        ) : (
          <DarkFilterIcon className="filter-btn-icon" />
        )}
        <Text className="filter-btn-text">Filters</Text>
      </Box> */}
    </Flex>
  );
};

export default NewsFilter;
