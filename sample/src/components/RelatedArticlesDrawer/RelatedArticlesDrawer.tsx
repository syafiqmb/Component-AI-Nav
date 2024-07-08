import { ArrowLeftIcon, ArrowRightIcon, Icon } from "@chakra-ui/icons";
import "./RelatedArticlesDrawer.css";
import {
  Avatar,
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  IconButton,
  Link,
  Tag,
  Text,
  useColorModeValue,
  useDisclosure,
  ChakraProvider,
} from "@chakra-ui/react";

import { FC } from "react";
import ReactGA from "react-ga4";
import { MdOutlineOpenInNew } from "react-icons/md";

import DeloitteLogo from "../../assets/images/deloitte_icon.svg";
import formatSourceToString from "../../utils/helper/FormatSourceToString";
import formatStringIntoArray from "../../utils/helper/FormatStringIntoArray";
import NewsIcon from "../../assets/icons/newsIcon";
import WebsiteAiIcon from "../../assets/icons/websiteAiIcon";

interface RelatedArticlesDrawerProps {
  openDetailsModal: (data: any) => void,
  docs: [
    {
      article: string,
      author: string,
      date: string,
      description: string,
      facets: [
          {
              content: string,
              header: string,
          }
      ],
      id: string,
      source: string,
      summary: string,
      tags: string,
      title: string,
      url: string,
    }
  ],
}

const RelatedArticlesDrawer: FC<RelatedArticlesDrawerProps> = ({ openDetailsModal, docs }) => {
  var listArticle = docs;
  var listTag: any[] = [];

  // format tags in related article from array to string
  listArticle.forEach((data: any) => {
    listTag.push(formatStringIntoArray(data.tags));
  });

  // sorting article from most related (distance)
  listArticle.sort((a: any, b: any) => {
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

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider>
      <IconButton
        aria-label="Open drawer"
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
              aria-label="Close drawer"
              display={{ base: "block", xl: "none" }}
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
            <Box className="article-list-container" height="75vh">
              {listArticle.slice(0, 5).map((data: any, index: number) => {
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
                        <Text className="article-header-text" color={textColor}>
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
                            onClick={() =>
                              // update Google Analytics event
                              ReactGA.event({
                                category: "Button click",
                                action:
                                  "Navigate to related articles external URL",
                              })
                            }
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
                              .map((data: any, key: number) => {
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
                              {listTag[index].slice(0, 2).map((data: any, key: number) => {
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
          </Box>
        </DrawerContent>
      </Drawer>
    </ChakraProvider>
  );
};

export default RelatedArticlesDrawer;