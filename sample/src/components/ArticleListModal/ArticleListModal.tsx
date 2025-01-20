/* eslint-disable prettier/prettier */
import "./ArticleListModal.css";

import { Icon, SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  ChakraProvider,
  Checkbox,
  Divider,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Select,
  Tag,
  TagCloseButton,
  Text,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { MdOutlineOpenInNew } from "react-icons/md";
import ReactPaginate from "react-paginate";

import DeloitteLogo from "../../assets/images/deloitte_icon.svg";
import formatSourceToString from "../../utils/helper/FormatSourceToString";
import formatStringIntoArray from "../../utils/helper/FormatStringIntoArray";
import NewsIcon from "../../assets/icons/newsIcon";
import WebsiteAiIcon from "../../assets/icons/websiteAiIcon";

// Number of items to show per page
const itemsPerPage = 10;

type ItemType = {
  article: string;
  author: string;
  date: string;
  description: string;
  distance: number;
  facets: [
    {
      content: string;
      header: string;
    },
  ];
  id: string;
  source: string;
  summary: string;
  tags: string;
  title: string;
  url: string;
};

interface ArticleListModalProps {
  // setSeeAllOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closeSeeAllsModal: (data: any) => void;
  openDetailsModal: (data: ItemType) => void;
  chatId: string;
  isOpen: boolean;
  onClose: () => void;
  data: [
    {
      article: string;
      author: string;
      date: string;
      description: string;
      distance: number;
      facets: [
        {
          content: string;
          header: string;
        },
      ];
      id: string;
      source: string;
      summary: string;
      tags: string;
      title: string;
      url: string;
    },
  ];
  iconBgColor: string;
  iconColor: string;
  tagBgColor: string;
  tagTextColor: string;
  relatedArticlesString: string;
  categoryString: string;
  newsString: string;
  websiteAISring: string;
  deloittePublicString: string;
  deloittePrivateString: string;
  topicOrKeyword: string;
  relatedArticlesFoundString: string;
  sortByRelevanceString: string;
  sortByLatestString: string;
  show0recordsString: string;
  showingString: string;
  toString: string;
  ofString: string;
  recordsString: string;
  theme: object;
  checkboxFilter: [{ value: string; name: string }];
}

const ArticleListModal: FC<ArticleListModalProps> = ({
  closeSeeAllsModal,
  openDetailsModal,
  chatId,
  isOpen,
  onClose,
  data,
  iconBgColor,
  iconColor,
  tagBgColor,
  tagTextColor,
  relatedArticlesString,
  categoryString,
  newsString,
  websiteAISring,
  deloittePublicString,
  deloittePrivateString,
  topicOrKeyword,
  relatedArticlesFoundString,
  sortByRelevanceString,
  sortByLatestString,
  show0recordsString,
  showingString,
  toString,
  ofString,
  recordsString,
  theme,
  checkboxFilter,
}) => {
  const [currentItems, setCurrentItems] = useState<ItemType[] | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentEndOffset, setCurrentEndOffset] = useState(0);
  const [filteredDataLength, setFilteredDataLength] = useState(0);

  // Initialize filter categories and filter keyword
  const [selected, setSelected] = useState<string[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // Initialize sorting option to relevance by default
  const [sortOption, setSortOption] = useState("relevance");

  // State to track the selected filter tags
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // State to track the presence of the search tag
  const [searchTagPresent, setSearchTagPresent] = useState(false);

  // Function to handle sorting option change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const checkNewsType = (data: any) => {
    if (data === `['websites_ai']`) {
      return websiteAISring;
    } else if (data === `['deloitte_private']`) {
      return deloittePrivateString;
    } else if (data === `['deloitte_curation']`) {
      return deloittePublicString;
    } else if (data === `['pdf']`) {
      return "PDF";
    }
    return newsString;
  };

  // Sorting logic
  const sortedData = data.sort((a: ItemType, b: ItemType) => {
    if (sortOption === "relevance") {
      // Sort by the distance field in ascending order
      return b.distance - a.distance;
    }
    if (sortOption === "latest") {
      // Sort by the date field in descending order for latest
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    }
    return 0; // No sorting
  });

  // function to handle checkbox
  const handleCheckboxChange = (category: string) => {
    if (selected.includes(category)) {
      setSelected(selected.filter((c) => c !== category));
      setSelectedTags(selectedTags.filter((tag) => tag !== category));
    } else {
      setSelected([...selected, category]);
      setSelectedTags([...selectedTags, category]);
    }
  };

  //Clear all filter criteria when switching chats
  useEffect(() => {
    setSelected([]);
    setSelectedTags([]);
    setSearchKeyword("");
    setSearchTagPresent(false);
  }, [chatId]);

  // Reset back to the first page whenever a filter criteria or sort option is changed
  useEffect(() => {
    setCurrentPage(0);
    setItemOffset(0);
    setCurrentEndOffset(10);
  }, [selected, searchKeyword, sortOption]);

  // Retrieve the length of filtered data after filtering
  useEffect(() => {
    const filteredLength = data.filter((item) => {
      // Return all the articles by default if no filtering criteria is set
      if (!searchKeyword && selected.length === 0) {
        return true;
      } else {
        const keywordMatch = item.title
          .toLowerCase()
          .includes(searchKeyword.toLowerCase());

        if (selected.length > 0) {
          return (
            keywordMatch && selected.some((cat) => item.source.includes(cat))
          );
        } else {
          return keywordMatch;
        }
      }
    }).length;

    setFilteredDataLength(filteredLength);
  }, [data, selected, searchKeyword]);

  // Perform filtering based on category and keyword search
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(
      sortedData
        .filter((item) => {
          // Return all the articles by default if no filtering criteria is set
          if (!searchKeyword && selected.length === 0) {
            return true;
          } else {
            const keywordMatch = item.title
              .toLowerCase()
              .includes(searchKeyword.toLowerCase());

            if (selected.length > 0) {
              return (
                keywordMatch &&
                selected.some((cat) => item.source.includes(cat))
              );
            } else {
              return keywordMatch;
            }
          }
        })
        .slice(itemOffset, endOffset),
    );

    setPageCount(Math.ceil(filteredDataLength / itemsPerPage));
    setCurrentEndOffset(endOffset);
  }, [
    sortedData,
    itemOffset,
    filteredDataLength,
    selected,
    searchKeyword,
    sortOption,
  ]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Trigger search if the user presses Enter
    if (e.key === "Enter") {
      const newSearchKeyword = searchInput;
      setSearchKeyword(newSearchKeyword);
      if (newSearchKeyword) {
        setSearchTagPresent(true);
      } else {
        setSearchTagPresent(false);
      }
      // Remove focus from the input element when the Enter key is pressed
      e.currentTarget.blur();
    }
  };

  const handleSearchClick = () => {
    const newSearchKeyword = searchInput;
    setSearchKeyword(newSearchKeyword);

    if (newSearchKeyword) {
      setSearchTagPresent(true);
    } else {
      setSearchTagPresent(false);
    }
  };

  // Handle closing a filter tag to remove the applied filter
  const handleCloseTag = (tag: string) => {
    if (tag.startsWith("search")) {
      setSearchTagPresent(false);
      setSearchKeyword("");
      // Clear the value in the search bar
      setSearchInput("");
    } else {
      setSelected(selected.filter((c) => c !== tag));
      setSelectedTags((prevTags) =>
        prevTags.filter((prevTag) => prevTag !== tag),
      );
    }
  };

  // Invoke when user clicks to navigate to another page
  const handlePageClick = (e: { selected: number }) => {
    const newOffset = (e.selected * itemsPerPage) % filteredDataLength;

    setCurrentPage(e.selected);
    setItemOffset(newOffset);
  };

  return (
    <ChakraProvider theme={theme}>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent maxHeight="100%">
          <ModalHeader data-testid="related-articles-see-all-header">
            {relatedArticlesString}
          </ModalHeader>
          <ModalCloseButton
            color="black"
            data-testid="related-articles-see-all-close-button"
            onClick={closeSeeAllsModal}
          />
          <ModalBody className="modal-container">
            <Box className="filter-container">
              <Box
                className="category-filter-container-modal"
                data-testid="related-articles-see-all-category-container"
              >
                <Text
                  className="filter-header-modal"
                  data-testid="related-articles-see-all-category-title"
                >
                  {categoryString}
                </Text>
                {checkboxFilter ? (
                  checkboxFilter.map((data: any, key: any) => (
                    <Checkbox
                      key={key}
                      value={data.value}
                      data-testid={`related-articles-see-all-category-${data.value}-checkbox`}
                      isChecked={selected.includes(data.value)}
                      isDisabled={selected.includes("all")}
                      onChange={() => handleCheckboxChange(data.value)}
                    >
                      {data.name}
                    </Checkbox>
                  ))
                ) : (
                  <>
                    <Checkbox
                      value="news"
                      data-testid="related-articles-see-all-category-news-checkbox"
                      isChecked={selected.includes("news")}
                      isDisabled={selected.includes("all")}
                      onChange={() => handleCheckboxChange("news")}
                    >
                      {newsString}
                    </Checkbox>
                    <Checkbox
                      value="pdf"
                      data-testid="related-articles-see-all-category-news-checkbox"
                      isChecked={selected.includes("pdf")}
                      isDisabled={selected.includes("all")}
                      onChange={() => handleCheckboxChange("pdf")}
                    >
                      PDF
                    </Checkbox>
                  </>
                )}
                {/* <Checkbox
                  value="websites_ai"
                  data-testid="related-articles-see-all-category-website-ai-checkbox"
                  isChecked={selected.includes("websites_ai")}
                  isDisabled={selected.includes("all")}
                  onChange={() => handleCheckboxChange("websites_ai")}
                >
                  {websiteAISring}
                </Checkbox>
                <Checkbox
                  value="deloitte_public"
                  data-testid="related-articles-see-all-category-deloitte-public-checkbox"
                  isChecked={selected.includes("deloitte_public")}
                  isDisabled={selected.includes("all")}
                  onChange={() => handleCheckboxChange("deloitte_public")}
                >
                  {deloittePublicString}
                </Checkbox>
                <Checkbox
                  value="deloitte_private"
                  data-testid="related-articles-see-all-category-deloitte-private-checkbox"
                  isChecked={selected.includes("deloitte_private")}
                  isDisabled={selected.includes("all")}
                  onChange={() => handleCheckboxChange("deloitte_private")}
                >
                  {deloittePrivateString}
                </Checkbox> */}
              </Box>
              <Box
                className="word-filter-container-modal"
                data-testid="related-articles-see-all-topic-keyword-container"
              >
                <Text
                  className="filter-header-modal"
                  data-testid="related-articles-see-all-topic-keyword-title"
                >
                  {topicOrKeyword}
                </Text>
                <InputGroup>
                  <Input
                    data-testid="related-articles-see-all-topic-keyword-input"
                    placeholder="Search"
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                  />
                  <InputRightElement>
                    <Button
                      size="sm"
                      bgColor="transparent"
                      data-testid="search-button-word-filter-container"
                      onClick={handleSearchClick}
                    >
                      {<SearchIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
            </Box>

            <Box className="list-container">
              <Box className="list-container-header-modal">
                <Text data-testid="related-articles-see-all-articles-found-text">
                  {filteredDataLength} {relatedArticlesFoundString}
                </Text>
                <Box className="sort-dropdown-wrapper-modal">
                  <Select
                    data-testid="related-articles-see-all-select"
                    value={sortOption}
                    onChange={(e) => handleSortChange(e)}
                  >
                    <option
                      value="relevance"
                      data-testid="related-articles-see-all-select-item"
                    >
                      {sortByRelevanceString}
                    </option>
                    <option
                      value="latest"
                      data-testid="related-articles-see-all-select-item"
                    >
                      {sortByLatestString}
                    </option>
                  </Select>
                </Box>
              </Box>
              {/* Display filter tags */}
              <Box className="filter-tag-container">
                {Array.isArray(selectedTags) &&
                  selectedTags.map((tag) => (
                    <Tag key={tag} className="filter-tag">
                      {tag}
                      <TagCloseButton onClick={() => handleCloseTag(tag)} />
                    </Tag>
                  ))}
                {searchTagPresent && (
                  <Tag className="filter-tag">
                    {searchKeyword}
                    <TagCloseButton onClick={() => handleCloseTag("search")} />
                  </Tag>
                )}
              </Box>
              <Box
                className="list-container-content"
                data-testid="related-articles-see-all-articles-list-container"
              >
                {Array.isArray(currentItems) &&
                  currentItems.map((item: ItemType, index: number) => (
                    <Box
                      data-testid="related-articles-see-all-article-list-item"
                      className="article-container"
                      key={index}
                    >
                      <Box className="article-container-header">
                        <Box className="article-logo-container-modal">
                          {item.source === `['news']` ? (
                            <Avatar
                              icon={
                                <NewsIcon
                                  iconBgColor={iconBgColor}
                                  iconColor={iconColor}
                                />
                              }
                              size="sm"
                              bg="transparent"
                              data-testid="article-logo-news-icon"
                            />
                          ) : item.source === `['websites_ai']` ? (
                            <Avatar
                              icon={
                                <WebsiteAiIcon
                                  iconBgColor={iconBgColor}
                                  iconColor={iconColor}
                                />
                              }
                              size="sm"
                              bg="transparent"
                              data-testid="related-articles-see-all-article-icon"
                            />
                          ) : (
                            <Avatar
                              src={DeloitteLogo}
                              size="xs"
                              className="article-logo"
                              data-testid="article-logo-deloitte-icon"
                            />
                          )}
                          <Text
                            className="article-author-modal"
                            data-testid="related-articles-see-all-article-header"
                          >
                            {checkNewsType(item.source)}
                            {/* {String(item.author).toUpperCase() ||
                              formatSourceToString(item.source).toUpperCase()} */}
                          </Text>
                        </Box>
                        <Box className="article-logo-container-modal">
                          <Text
                            className="article-date-modal"
                            data-testid="related-articles-see-all-article-date"
                          >
                            {item.date}
                          </Text>
                          <Link
                            href={item.url}
                            isExternal
                            data-testid="related-articles-see-all-article-source-icon"
                          >
                            <Icon
                              as={MdOutlineOpenInNew}
                              _hover={{
                                fill: "#A0AEC0",
                              }}
                              size="lg"
                            />
                          </Link>
                        </Box>
                      </Box>
                      <Box className="article-container-content">
                        {/* Popover window to display summary when hovering over the article title*/}
                        <Popover trigger="hover" placement="left">
                          <PopoverTrigger>
                            <Text
                              className="article-title-modal"
                              data-testid="related-articles-see-all-article-title"
                              onClick={() => {
                                openDetailsModal(item);
                              }}
                            >
                              {item.title}
                            </Text>
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverBody>
                              <Text
                                data-testid="related-article-item-hover"
                                className="article-summary"
                                noOfLines={10}
                                align={"left"}
                              >
                                {item.article}
                              </Text>
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                        <Text
                          className="article-text-modal"
                          data-testid="related-articles-see-all-article-description"
                        >
                          {item.description}
                        </Text>
                      </Box>
                      <Box className="article-container-footer">
                        <Box
                          className="tag-container"
                          data-testid="related-articles-see-all-article-tag-container"
                        >
                          {formatStringIntoArray(item.tags)
                            .slice(0, 5)
                            .map((data, index) => (
                              <Tag
                                className="tag-text"
                                data-testid="related-articles-see-all-article-tag-item"
                                key={index}
                                color={tagTextColor}
                                background={tagBgColor}
                              >
                                {data}
                              </Tag>
                            ))}
                        </Box>
                      </Box>
                      <Divider borderWidth="1.5px" />
                    </Box>
                  ))}
              </Box>
              <Box className="pagination-container">
                <Text
                  className="pagination-details-modal"
                  data-testid="related-articles-see-all-article-showing-record-text"
                >
                  {filteredDataLength === 0
                    ? `${show0recordsString}`
                    : `${showingString} ${itemOffset + 1} ${toString} ${
                        currentPage + 1 === pageCount
                          ? filteredDataLength
                          : currentEndOffset
                      } ${ofString} ${filteredDataLength} ${recordsString}`}
                </Text>
                <Box className="pagination-controls-container">
                  <ReactPaginate
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="<"
                    pageClassName="page-item"
                    pageLinkClassName="page-link-modal"
                    previousClassName="page-item"
                    previousLinkClassName="page-link-modal"
                    nextClassName="page-item"
                    nextLinkClassName="page-link-modal"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link-modal"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={currentPage}
                  />
                </Box>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default ArticleListModal;
