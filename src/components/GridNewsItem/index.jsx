import "./News.css";

import {
  Avatar,
  Box,
  Divider,
  Grid,
  GridItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import moment from "moment";
import React from "react";

// import { useNavigate } from "react-router-dom";
import NewsLogo from "../../assets/images/news-icon.svg";

const GridNewsItem = ({ item, openDetail }) => {
  // const navigate = useNavigate();

  // defining color for dark & light mode
  const titleColor = useColorModeValue(
    // light mode
    "rgba(26, 32, 44, 1)",
    // dark mode
    "rgba(255, 255, 255, 0.8)",
  );

  // defining color for dark & light mode
  const linkColor = useColorModeValue(
    // light mode
    "rgba(26, 32, 44, 1)",
    // dark mode
    "rgba(255, 255, 255, 0.64)",
  );

  const sourceName = item.src_nm;

  // function to open News Detail
  const openNewsNewTab = () => {
    openDetail();
  };

  return (
    <Box data-testid="grid-item-container">
      <Grid
        templateColumns="repeat(15, 1fr)"
        pt="15px"
        data-testid="grid-item-header-wrapper"
      >
        <GridItem colSpan={2} data-testid="grid-item-header-logo-wrapper">
          <Avatar
            src={NewsLogo}
            size="sm"
            className="article-logo"
            data-testid="grid-item-header-logo-avatar"
          />
        </GridItem>
        <GridItem
          colSpan={13}
          data-testid="grid-item-header-source-title-wrapper"
        >
          <Text
            className="article-src"
            color={titleColor}
            data-testid={`grid-item-header-news-source-title`}
          >
            {sourceName}
          </Text>
          <Text
            className="article-url"
            color={linkColor}
            data-testid="grid-item-header-news-link"
          >
            {item.url}
          </Text>
        </GridItem>
      </Grid>
      <Grid pt="15px" data-testid="grid-item-body-wrapper">
        <GridItem
          className="title-grid"
          data-testid="grid-item-body-news-title-wrapper"
        >
          <Text
            className="article-title"
            data-testid="grid-item-body-news-title"
            color={titleColor}
            onClick={() => openNewsNewTab()}
          >
            {item.title}
          </Text>
        </GridItem>
        <GridItem
          className="description-grid"
          data-testid="grid-item-body-news-description-wrapper"
        >
          <Text
            className="grid-article-description"
            color={titleColor}
            data-testid="grid-item-body-news-description"
          >
            {item.description || item.summary}
          </Text>
        </GridItem>
      </Grid>
      <Text
        className="article-date"
        py="15px"
        color={titleColor}
        data-testid={`grid-item-body-published-date-`}
      >
        {item.rawPublishedDate === null ||
        item.rawPublishedDate === "" ||
        item.rawPublishedDate === "None"
          ? ""
          : String(
              moment(item.rawPublishedDate).format("DD MMM YYYY"),
            ).toUpperCase()}
      </Text>
      <Divider
        orientation="horizontal"
        borderWidth="1.5px"
        data-testid="grid-item-body-divider"
      />
    </Box>
  );
};

export default GridNewsItem;
