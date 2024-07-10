import { ArrowLeftIcon, ArrowRightIcon, Icon } from "@chakra-ui/icons";
import "./RelatedArticlesDrawer.css";
import {
  Avatar,
  Box,
  Button,
  Center,
  ChakraProvider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  IconButton,
  Link,
  Tag,
  Text,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";

import React, { useEffect } from "react";
import { MdOutlineOpenInNew } from "react-icons/md";

import DeloitteLogo from "../../assets/images/deloitte_icon.svg";
import formatSourceToString from "../../utils/helper/FormatSourceToString";
import formatStringIntoArray from "../../utils/helper/FormatStringIntoArray";
import NewsIcon from "../../assets/icons/newsIcon";
import WebsiteAiIcon from "../../assets/icons/websiteAiIcon";

const RelatedArticlesDrawer = ({
  isFile,
  isLoading,
  setSeeAllOpen,
  openDetailsModal,
  docs,
}) => {
  const [isXl] = useMediaQuery("(min-width: 1280px)");

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isXl) {
      onClose();
    }
  }, [isXl, onClose]);

  var listArticle = docs;
  var listTag = [];

  // format tags in related article from array to string
  listArticle.forEach((data) => {
    listTag.push(formatStringIntoArray(data.tags));
  });

  // sorting article from most related (distance)
  listArticle.sort((a, b) => {
    return b.distance - a.distance; // Sort in descending order (latest first)
  });

  // defining color for dark & light mode
  const textColor = useColorModeValue(
    "#202123",
    "var(--white-alpha-800, rgba(255, 255, 255, 0.80))",
  );
  const tagTextColor = useColorModeValue(
    "rgba(26, 32, 44, 1)",
    "rgba(26, 32, 44, 1)",
  );

  return (
    <ChakraProvider>
      <IconButton
        display={{ base: "block", xl: "none" }}
        position="absolute"
        zIndex="1"
        icon={<ArrowLeftIcon />}
        border="1px solid #E2E8F0"
        borderRadius="6px"
        width="40px"
        top="3vh"
        right="4vw"
        onClick={onOpen}
        data-testid="related-article-button-chat-wrapper"
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <Box paddingTop="32px">
            <IconButton
              icon={<ArrowRightIcon />}
              backgroundColor="transparent"
              border="1px solid #E2E8F0"
              borderRadius="6px"
              width="40px"
              marginLeft="24px"
              marginBottom="24px"
              onClick={onClose}
            />
            <Text
              className="related-articles-title"
              color={textColor}
              paddingBottom="24px"
            >
              Related Articles
            </Text>
            {listArticle.length === 0 ? (
              <Center
                data-testid="related-articles-no-article-found-wrapper"
                flexDirection="column"
                height="100%"
                paddingX="6px"
              >
                <Text
                  fontWeight="700"
                  data-testid="related-articles-no-article-found-label"
                >
                  {isLoading
                    ? "Loading related articles..."
                    : isFile
                      ? "No related articles available"
                      : "No article found.."}
                </Text>
                {isFile && isLoading === false && (
                  <Text
                    data-testid="related-articles-no-article-found-description"
                    textAlign="center"
                  >
                    Questions about uploaded files are specific and do not have
                    related articles.
                  </Text>
                )}
              </Center>
            ) : (
              <>
                <Box className="article-list-container" height="75vh">
                  {listArticle.slice(0, 5).map((data, index) => {
                    return (
                      <Box className="article-container" key={index}>
                        <Box className="article-header">
                          {data.source === `['news']` ? (
                            <Avatar
                              icon={<NewsIcon />}
                              size="sm"
                              bg="transparent"
                              data-testid="news-item-header-news-icon"
                            />
                          ) : data.source === `['websites_ai']` ? (
                            <Avatar
                              icon={<WebsiteAiIcon />}
                              size="sm"
                              bg="transparent"
                              data-testid="news-item-header-website-icon"
                            />
                          ) : (
                            <Avatar
                              src={DeloitteLogo}
                              size="xs"
                              className="article-logo"
                              data-testid="news-item-header-deloitte-icon"
                            />
                          )}
                          <Box className="header-text-container">
                            <Text
                              className="article-header-text"
                              color={textColor}
                            >
                              {String(data.author).toUpperCase() ||
                                formatSourceToString(data.source).toUpperCase()}
                            </Text>
                            <Box className="external-source-container">
                              <Text
                                className="article-header-text"
                                color={textColor}
                              >
                                {data.date}
                              </Text>
                              <Link
                                color={textColor}
                                href={data?.url}
                                isExternal
                                className="link-icon"
                                data-testid="link-icon-external-source-container"
                              >
                                <Icon
                                  as={MdOutlineOpenInNew}
                                  size="lg"
                                  _hover={{
                                    fill: "#A0AEC0",
                                  }}
                                />
                              </Link>
                            </Box>
                          </Box>
                        </Box>
                        <Box>
                          <Text
                            className="related-article-title"
                            color={textColor}
                            onClick={() => openDetailsModal(data)}
                          >
                            {data.title}
                          </Text>
                        </Box>
                        <Box className="tag-container">
                          {listTag[index][0] !== "" && (
                            <>
                              {listTag[index].length <= 2 ? (
                                listTag[index]
                                  .slice(0, listTag[index].length)
                                  .map((data, key) => {
                                    return (
                                      <Tag
                                        className="tag-text"
                                        key={key}
                                        color={tagTextColor}
                                      >
                                        {data}
                                      </Tag>
                                    );
                                  })
                              ) : (
                                <>
                                  {listTag[index]
                                    .slice(0, 2)
                                    .map((data, key) => {
                                      return (
                                        <Tag
                                          fontSize="8px"
                                          className="tag-text"
                                          key={key}
                                          color={tagTextColor}
                                        >
                                          {data}
                                        </Tag>
                                      );
                                    })}
                                  <Tag
                                    className="popover-expand"
                                    color={tagTextColor}
                                  >
                                    {`+ ${listTag[index].length - 2}`}
                                  </Tag>
                                </>
                              )}
                            </>
                          )}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
                <Button
                  className="see-all-text-btn"
                  onClick={() => setSeeAllOpen(true)}
                >
                  See all
                </Button>
              </>
            )}
          </Box>
        </DrawerContent>
      </Drawer>
    </ChakraProvider>
  );
};

export default RelatedArticlesDrawer;
