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
import React, { useEffect, useState } from "react";
import { MdOutlineOpenInNew } from "react-icons/md";
import ReactPaginate from "react-paginate";

import DeloitteLogo from "../../assets/images/deloitte_icon.svg";
import formatSourceToString from "../../utils/helper/FormatSourceToString";
import formatStringIntoArray from "../../utils/helper/FormatStringIntoArray";
import NewsIcon from "../../assets/icons/newsIcon";
import WebsiteAiIcon from "../../assets/icons/websiteAiIcon";

// Number of items to show per page
const itemsPerPage = 10;

const ArticleListModal = ({
  setSeeAllOpen,
  openDetailsModal,
  chatId,
  isOpen,
  onClose,
  data,
  iconBgColor,
  iconColor,
  tagBgColor,
  tagTextColor,
}) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentEndOffset, setCurrentEndOffset] = useState(0);
  const [filteredDataLength, setFilteredDataLength] = useState(0);

  // Initialize filter categories and filter keyword
  const [selected, setSelected] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // Initialize sorting option to relevance by default
  const [sortOption, setSortOption] = useState("relevance");

  // State to track the selected filter tags
  const [selectedTags, setSelectedTags] = useState([]);
  // State to track the presence of the search tag
  const [searchTagPresent, setSearchTagPresent] = useState(false);

  // Function to handle sorting option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Sorting logic
  const sortedData = data.sort((a, b) => {
    if (sortOption === "relevance") {
      // Sort by the distance field in ascending order
      return b.distance - a.distance;
    }
    if (sortOption === "latest") {
      // Sort by the date field in descending order for latest
      return new Date(b.date) - new Date(a.date);
    }
    return 0; // No sorting
  });

  // function to handle checkbox
  const handleCheckboxChange = (category) => {
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

  const handleSearchKeyDown = (e) => {
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
  const handleCloseTag = (tag) => {
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
  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % filteredDataLength;

    setCurrentPage(e.selected);
    setItemOffset(newOffset);
  };

  return (
    <ChakraProvider>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent backgroundColor={"white"} maxHeight="100%">
          <ModalHeader data-testid="related-articles-see-all-header">
            Related Articles
          </ModalHeader>
          <ModalCloseButton
            data-testid="related-articles-see-all-close-button"
            onClick={() => setSeeAllOpen(false)}
          />
          <ModalBody className="modal-container" backgroundColor={"white"}>
            <Box className="filter-container">
              <Box
                className="category-filter-container"
                data-testid="related-articles-see-all-category-container"
              >
                <Text
                  className="filter-header"
                  data-testid="related-articles-see-all-category-title"
                >
                  Category
                </Text>
                <Checkbox
                  value="news"
                  data-testid="related-articles-see-all-category-news-checkbox"
                  isChecked={selected.includes("news")}
                  isDisabled={selected.includes("all")}
                  onChange={() => handleCheckboxChange("news")}
                >
                  News
                </Checkbox>
                <Checkbox
                  value="websites_ai"
                  data-testid="related-articles-see-all-category-website-ai-checkbox"
                  isChecked={selected.includes("websites_ai")}
                  isDisabled={selected.includes("all")}
                  onChange={() => handleCheckboxChange("websites_ai")}
                >
                  Websites AI
                </Checkbox>
                <Checkbox
                  value="deloitte_public"
                  data-testid="related-articles-see-all-category-deloitte-public-checkbox"
                  isChecked={selected.includes("deloitte_public")}
                  isDisabled={selected.includes("all")}
                  onChange={() => handleCheckboxChange("deloitte_public")}
                >
                  Deloitte Public
                </Checkbox>
                <Checkbox
                  value="deloitte_private"
                  data-testid="related-articles-see-all-category-deloitte-private-checkbox"
                  isChecked={selected.includes("deloitte_private")}
                  isDisabled={selected.includes("all")}
                  onChange={() => handleCheckboxChange("deloitte_private")}
                >
                  Deloitte Private
                </Checkbox>
              </Box>
              <Box
                className="word-filter-container"
                data-testid="related-articles-see-all-topic-keyword-container"
              >
                <Text
                  className="filter-header"
                  data-testid="related-articles-see-all-topic-keyword-title"
                >
                  Topic or Keyword
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
              <Box className="list-container-header">
                <Text data-testid="related-articles-see-all-articles-found-text">
                  {filteredDataLength} related articles found
                </Text>
                <Box className="sort-dropdown-wrapper">
                  <Select
                    data-testid="related-articles-see-all-select"
                    value={sortOption}
                    onChange={(e) => handleSortChange(e)}
                  >
                    <option
                      value="relevance"
                      data-testid="related-articles-see-all-select-item"
                    >
                      Sort by: Relevance
                    </option>
                    <option
                      value="latest"
                      data-testid="related-articles-see-all-select-item"
                    >
                      Sort by: Latest
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
                  currentItems.map((item, index) => (
                    <Box
                      data-testid="related-articles-see-all-article-list-item"
                      className="article-container"
                      key={index}
                    >
                      <Box className="article-container-header">
                        <Box className="article-logo-container">
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
                            className="article-author"
                            data-testid="related-articles-see-all-article-header"
                          >
                            {String(item.author).toUpperCase() ||
                              formatSourceToString(item.source).toUpperCase()}
                          </Text>
                        </Box>
                        <Box className="article-logo-container">
                          <Text
                            className="article-date"
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
                              color="black"
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
                              className="article-title"
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
                          className="article-text"
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
                  className="pagination-details"
                  data-testid="related-articles-see-all-article-showing-record-text"
                >
                  {filteredDataLength === 0
                    ? `Showing 0 record`
                    : `Showing ${itemOffset + 1} to ${
                        currentPage + 1 === pageCount
                          ? filteredDataLength
                          : currentEndOffset
                      } of ${filteredDataLength} records`}
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
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
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
