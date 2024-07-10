import "./RelatedArticles.css";

import { ArrowLeftIcon, ArrowRightIcon, Icon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  IconButton,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { MdOutlineOpenInNew } from "react-icons/md";

import DeloitteLogo from "../../assets/images/deloitte_icon.svg";
import formatSourceToString from "../../utils/helper/FormatSourceToString";
import formatStringIntoArray from "../../utils/helper/FormatStringIntoArray";
import NewsIcon from "../../assets/icons/newsIcon";
import WebsiteAiIcon from "../../assets/icons/websiteAiIcon";

interface RelatedArticlesProps {
  setSeeAllOpen: React.Dispatch<React.SetStateAction<boolean>>,
  openDetailsModal: (data: any) => void,
  isLoading: boolean,
  isFile: boolean,
  docs: [
    {
      article: string,
      author: string,
      date: string,
      description: string,
      distance: number,
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

const RelatedArticles: FC<RelatedArticlesProps> = ({ setSeeAllOpen, openDetailsModal, isLoading, isFile, docs }) => {
  const [articleSidebarOpen, setArticleSidebarOpen] = useState(true);
  
  var listArticle = docs;
  var listTag: any[] = [];

  // format tags in related article from array to string
  listArticle.forEach((data: any) => {
    listTag.push(formatStringIntoArray(data.tags));
  });

  // sorting article from most related (distance)
  listArticle.sort((a: any, b: any) => {
    return b.distance - a.distance;
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

  // function to trigger sidebar open / close
  const handleClick = () => {
    setArticleSidebarOpen(!articleSidebarOpen);
  };

  const [visibleTagsCount, setVisibleTagsCount] = useState(2); // Initial visible tags count
  // const visibleTags = listTag.slice(0, visibleTagsCount);

  const [popoverTags, setPopoverTags] = useState("+3");

  const [width, setWidth] = useState(390); // Initial width of the sidebar
  const minWidth = 390;
  const maxWidth = 650;

  const handleMouseDown = (event: any) => {
    event.preventDefault();
    // Capture initial mouse position and current width
    const initialX = event.clientX;
    const initialWidth = width;

    const handleMouseMove = (event: any) => {
      event.preventDefault();
      // Calculate the change in mouse position and update the width
      const deltaX = initialX - event.clientX;
      const newWidth = initialWidth + deltaX;

      // Adjust the width only if new width is within the limit
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      // Remove event listeners when mouse is released
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // Add event listeners for mouse move and mouse up
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Adjust the number of visible tags based on the width
  useEffect(() => {
    if (width >= 500 && width < 600) {
      setVisibleTagsCount(3);
      setPopoverTags("+2");
    } else if (width >= 600 && width < 700) {
      setVisibleTagsCount(4);
      setPopoverTags("+1");
    } else if (width >= 700) {
      setVisibleTagsCount(5);
    } else {
      setVisibleTagsCount(2); // Default visible tags count
      setPopoverTags("+3");
    }
  }, [width]);

  return (
    <Box
      display={{ base: "none", xl: "block" }}
      data-testid="related-articles-main-container"
    >
      {articleSidebarOpen ? (
        <>
          <Box
            className={`resize-handle divider-color`}
            data-testid="resize-handle-related-article-container"
            onMouseDown={(e) => handleMouseDown(e)}
          ></Box>
          <Box
            className="related-articles-container"
            width={width}
            data-testid="related-articles-wrapper"
          >
            <Flex flexDirection="row">
              <IconButton
                aria-label="Close related articles panel"
                icon={
                  <ArrowRightIcon
                    data-testid="related-articles-collapse-button-icon"
                    width="10px"
                    minHeight="40px !important"
                  />
                }
                size="sm"
                className="collapse-button"
                data-testid="collapse-button-related-articles-container"
                onClick={handleClick}
              />
              <Text
                className="related-articles-title"
                color={textColor}
                data-testid="related-articles-title"
              >
                Related Articles
              </Text>
            </Flex>
            {listArticle.length < 1 ? (
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
              <Box
                className="article-list-container"
                data-testid="related-articles-list-container"
              >
                {listArticle.slice(0, 5).map((data, index) => {
                  return (
                    <Box
                      className="article-container"
                      key={index}
                      data-testid="related-articles-list-wrapper"
                    >
                      <Box
                        className="article-header"
                        data-testid="related-articles-list-header"
                      >
                        {data.source === `['news']` ? (
                          <Avatar
                            icon={<NewsIcon />}
                            size="sm"
                            bg="transparent"
                            data-testid="related-articles-list-news-icon"
                          />
                        ) : data.source === `['websites_ai']` ? (
                          <Avatar
                            icon={<WebsiteAiIcon />}
                            size="sm"
                            bg="transparent"
                            data-testid="related-articles-list-webisite-icon"
                          />
                        ) : (
                          <Avatar
                            src={DeloitteLogo}
                            size="xs"
                            className="article-logo"
                            data-testid="related-articles-list-deloitte-icon"
                          />
                        )}
                        <Box
                          className="header-text-container"
                          data-testid="related-articles-list-content-wrapper"
                        >
                          <Text
                            className="article-header-text"
                            color={textColor}
                            data-testid="related-articles-list-content-header-text"
                          >
                            {String(data.author) ||
                              formatSourceToString(data.source)}
                          </Text>
                          <Box
                            className="external-source-container"
                            data-testid="related-articles-list-content-external-link-wrapper"
                          >
                            <Text
                              className="article-header-text"
                              color={textColor}
                              data-testid="related-articles-list-content-date"
                            >
                              {moment(data.date).format("DD MMM YYYY")}
                            </Text>
                            <Link
                              color={textColor}
                              href={data?.url}
                              isExternal
                              className="link-icon"
                              data-testid="related-articles-list-content-external-link"
                            >
                              <Icon
                                as={MdOutlineOpenInNew}
                                _hover={{
                                  fill: "#A0AEC0",
                                }}
                                data-testid="related-articles-list-content-external-link-icon"
                              />
                            </Link>
                          </Box>
                        </Box>
                      </Box>
                      <Popover trigger="hover" placement="left">
                        <PopoverTrigger>
                          <Text
                            className="related-article-title"
                            data-testid="article-title-article-container"
                            color={textColor}
                            onClick={() => openDetailsModal(data)}
                          >
                            {data.title}
                          </Text>
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverBody>
                            <Text
                              className="article-summary"
                              noOfLines={10}
                              align={"left"}
                            >
                              {data.article}
                            </Text>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
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
                                {listTag[index]
                                  .slice(0, visibleTagsCount)
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
                                  })}
                                {visibleTagsCount < 5 && (
                                  <Popover trigger="hover" placement="top">
                                    <PopoverTrigger>
                                      <Tag
                                        className="popover-expand"
                                        color={tagTextColor}
                                      >
                                        {listTag[index].length <= 5
                                          ? `+${
                                              listTag[index].length -
                                              visibleTagsCount
                                            }`
                                          : popoverTags}{" "}
                                      </Tag>
                                    </PopoverTrigger>
                                    <PopoverContent className="popover-tags">
                                      <PopoverArrow />
                                      <PopoverBody>
                                        {listTag[index]
                                          .slice(2, 5)
                                          .map((tag: any, index: number) => (
                                            <Text
                                              key={index}
                                              className="popover-text"
                                            >
                                              · {tag}
                                            </Text>
                                          ))}
                                      </PopoverBody>
                                    </PopoverContent>
                                  </Popover>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </Box>
                      <Divider className="divider-color" />
                    </Box>
                  );
                })}
                <Button
                  className="see-all-btn"
                  onClick={() => setSeeAllOpen(true)}
                >
                  See all
                </Button>
              </Box>
            )}
          </Box>
        </>
      ) : (
        <IconButton
          aria-label="Open related articles panel"
          icon={<ArrowLeftIcon width="10px" minHeight="40px !important" />}
          size="sm"
          onClick={handleClick}
          className="expand-button"
          data-testid="expand-button-related-article-container"
        />
      )}
    </Box>
  );
};

export default RelatedArticles;
