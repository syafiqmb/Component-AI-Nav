import { Image, Text, VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";

import Logo from "../../assets/images/not-found-icon.svg";

// this is for empty news
const EmptyNews = ({
  title = "Select your topics of interest in your settings to see more relevant news for you!",
  desc = "Meanwhile, here are some popular news recently:",
}) => {
  return (
    <VStack
      width="100%"
      marginBottom="8vh"
      data-testid="empty-news-content-wrapper"
    >
      <Image
        src={Logo}
        maxWidth="439px"
        maxHeight="330px"
        data-testid="empty-news-image"
      />
      <Text as="b" data-testid="empty-news-title-text">
        {title}
      </Text>
      <Text data-testid="empty-news-desc-text">{desc}</Text>
    </VStack>
  );
};

EmptyNews.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
};

export default EmptyNews;
