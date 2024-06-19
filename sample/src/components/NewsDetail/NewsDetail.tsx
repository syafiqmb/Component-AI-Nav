import "./NewsDetails.css";

import { ChevronLeftIcon, Icon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { MdOutlineOpenInNew } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const NewsDetails = ({ data, isOpen, onClose, onBack }: any) => {
  const item = data ?? [];
  const url = item.url ?? "";
  const full_content = item.article ?? "";
  const summary = item.summary ?? "";
  const title = item.title ?? "";
  const rawPublishedDate = item.rawPublishedDate ?? "";
  const publishedDate = moment(rawPublishedDate).format("MMMM Do YYYY") ?? "";
  const recommendations = item.recommendations ?? "";
  const key_insight_1 = item.key_insight_1 ?? "";
  const key_impact_1 = item.key_impact_1 ?? "";
  const key_insight_2 = item.key_insight_2 ?? "";
  const key_impact_2 = item.key_impact_2 ?? "";
  const key_insight_3 = item.key_insight_3 ?? "";
  const key_impact_3 = item.key_impact_3 ?? "";
  const textLabelColor = useColorModeValue("#1a202c", "#FFF");
  const boxBg = useColorModeValue("#FFFCF1", "#f0ecde");
  const boxBorder = useColorModeValue("1px solid #E2E8F0", "1px solid #c5bea8");
  const backgroundColor = useColorModeValue("", "var(--gray-800, #1A202C)");

  // Styling for markdown content - start
  const BulletList = ({ children }: any) => {
    return <ul className="ul-component">{children}</ul>;
  };

  const hrStyle = () => {
    return <hr className="hr-component" />;
  };

  const olStyle = ({ children }: any) => {
    return <ol className="ol-component">{children}</ol>;
  };

  const liStyle = ({ children }: any) => {
    return <li className="li-component">{children}</li>;
  };

  const pStyle = ({ children }: any) => {
    return <p className="p-component">{children}</p>;
  };

  // Styling for markdown content - end

  const components = {
    ul: BulletList,
    hr: hrStyle,
    ol: olStyle,
    li: liStyle,
    p: pStyle,
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      data-testid="news-detail-modal"
    >
      <ModalOverlay data-testid="news-detail-modal-overlay" />
      <ModalContent
        maxHeight={"100%"}
        backgroundColor={backgroundColor}
        data-testid="news-detail-modal-content"
      >
        <ModalHeader padding={0} data-testid="news-detail-modal-header">
          <Flex
            className="top-container"
            data-testid="news-detail-modal-header-wrapper"
          >
            <Flex
              className="title"
              data-testid="news-detail-modal-header-title"
            >
              <IconButton
                aria-label="<"
                colorScheme={""}
                icon={
                  <ChevronLeftIcon
                    data-testid="news-detail-modal-header-back-button-icon"
                    color={"#000000"}
                  />
                }
                onClick={onClose}
                data-testid="news-detail-modal-header-back-button"
              />
            </Flex>

            <IconButton
              aria-label="x"
              colorScheme={""}
              padding="24px"
              icon={
                <SmallCloseIcon
                  data-testid="news-detail-modal-header-close-button-icon"
                  color={"#000000"}
                />
              }
              onClick={onClose}
              data-testid="news-detail-modal-header-close-button"
            />
          </Flex>
        </ModalHeader>
        <ModalBody
          // backgroundColor={"white"}
          overflowX={"auto"}
          data-testid="news-detail-modal-body-container"
        >
          <Box
            flexDirection={"column"}
            data-testid="news-detail-modal-body-wrapper"
          >
            <Box
              className="news-box"
              data-testid="news-detail-modal-body-news-box"
            >
              <Flex
                className="row"
                data-testid="news-detail-modal-body-published-date-wrapper"
              >
                <div>
                  <Text
                    className="text-a"
                    color={textLabelColor}
                    data-testid="news-detail-modal-body-published-date"
                  >
                    Published Date:
                    {publishedDate === "Invalid date"
                      ? " No date provided"
                      : " " + publishedDate}
                  </Text>
                </div>
                <Spacer data-testid="news-detail-modal-body-spacer" />
                {url === "" ? (
                  ""
                ) : (
                  <>
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      data-testid="news-detail-modal-body-external-link"
                    >
                      <Button
                        className="text-a-1"
                        data-testid="news-detail-modal-body-external-link-button"
                        rightIcon={
                          <Icon
                            as={MdOutlineOpenInNew}
                            data-testid="news-detail-modal-body-external-link-icon"
                            color={textLabelColor}
                            _hover={{
                              fill: "#A0AEC0",
                            }}
                          />
                        }
                        colorScheme=""
                        color={"#000000"}
                        variant="solid"
                      >
                        <Text
                          className="text-a"
                          color={textLabelColor}
                          data-testid="news-detail-modal-body-external-link-label"
                        >
                          SOURCE
                        </Text>
                      </Button>
                    </a>
                  </>
                )}
              </Flex>
              <Text
                className="title-news"
                color={textLabelColor}
                data-testid="news-detail-modal-body-news-title"
              >
                {title}
              </Text>
              <Divider
                orientation="horizontal"
                borderWidth="1.5px"
                color="#E4E7EC"
                margin="32px"
                width="auto"
                data-testid="news-detail-modal-body-news-divider"
              />
              <Card
                margin="24px"
                data-testid="news-detail-modal-body-summary-wrapper"
              >
                <CardBody
                  className="card"
                  background={boxBg}
                  border={boxBorder}
                  data-testid="news-detail-modal-body-summary-content"
                >
                  <Text
                    className="card-text-title"
                    data-testid="news-detail-modal-body-summary-title"
                  >
                    Summary
                  </Text>
                  <Text
                    className="card-text-a"
                    data-testid="news-detail-modal-body-summary"
                  >
                    {summary}
                  </Text>
                </CardBody>
              </Card>
              {key_insight_1.length > 0 && (
                <Card
                  margin={"24px"}
                  data-testid="news-detail-modal-body-key-insights-container"
                >
                  <CardBody
                    className="card"
                    data-testid="news-detail-modal-body-key-insights-wrapper"
                    background={boxBg}
                    border={boxBorder}
                  >
                    <Grid
                      templateColumns="40px 1fr 1fr"
                      gap={2}
                      data-testid="news-detail-modal-body-key-insights-grid"
                    >
                      <GridItem data-testid="news-detail-modal-body-key-insights-number-wrapper"></GridItem>
                      <GridItem data-testid="news-detail-modal-body-key-insights-insight-wrapper">
                        <Text
                          className="card-text-aa"
                          data-testid="news-detail-modal-body-key-insights-insight-label"
                        >
                          Insight
                        </Text>
                      </GridItem>
                      <GridItem data-testid="news-detail-modal-body-key-insights-impact-towards-company-wrapper">
                        <Text
                          className="card-text-aa"
                          data-testid="news-detail-modal-body-key-insights-impact-towards-company-label"
                        >
                          Impact towards Company
                        </Text>
                      </GridItem>
                    </Grid>
                    <Divider
                      orientation="horizontal"
                      borderWidth="1px"
                      color="#E2E8F0"
                      margin={"8px"}
                      data-testid="news-detail-modal-body-key-insights-divider-1"
                    />
                    <Grid
                      templateColumns="40px 1fr 1fr"
                      gap={2}
                      data-testid="news-detail-modal-body-key-insights-content-container"
                    >
                      <GridItem data-testid="news-detail-modal-body-key-insights-content-number-1-wrapper">
                        <Text
                          className="card-text-aaa"
                          data-testid="news-detail-modal-body-key-insights-content-number-1"
                          textAlign="center"
                        >
                          1
                        </Text>
                      </GridItem>
                      <GridItem data-testid="news-detail-modal-body-key-insights-content-key-insight-1-wrapper">
                        <Text
                          className="card-text-aaa"
                          data-testid="news-detail-modal-body-key-insights-content-key-insight-1"
                        >
                          {key_insight_1}
                        </Text>
                      </GridItem>
                      <GridItem data-testid="news-detail-modal-body-key-insights-content-key-impact-1-wrapper">
                        <Text
                          className="card-text-aaa"
                          data-testid="news-detail-modal-body-key-insights-content-key-impact-1"
                        >
                          {key_impact_1}
                        </Text>
                      </GridItem>
                    </Grid>
                    <Divider
                      orientation="horizontal"
                      borderWidth="1px"
                      color="#E2E8F0"
                      margin={"8px"}
                      data-testid="news-detail-modal-body-key-insights-divider-2"
                    />
                    <Grid templateColumns="40px 1fr 1fr" gap={2}>
                      <GridItem data-testid="news-detail-modal-body-key-insights-content-number-2-wrapper">
                        <Text
                          className="card-text-aaa"
                          data-testid="news-detail-modal-body-key-insights-content-number-2"
                          textAlign="center"
                        >
                          2
                        </Text>
                      </GridItem>
                      <GridItem data-testid="news-detail-modal-body-key-insights-content-key-insight-2-wrapper">
                        <Text
                          className="card-text-aaa"
                          data-testid="news-detail-modal-body-key-insights-content-key-insight-2"
                        >
                          {key_insight_2}
                        </Text>
                      </GridItem>
                      <GridItem data-testid="news-detail-modal-body-key-insights-content-key-impact-2-wrapper">
                        <Text
                          className="card-text-aaa"
                          data-testid="news-detail-modal-body-key-insights-content-key-impact-2"
                        >
                          {key_impact_2}
                        </Text>
                      </GridItem>
                    </Grid>
                    <Divider
                      orientation="horizontal"
                      borderWidth="1px"
                      color="#E2E8F0"
                      margin={"8px"}
                      data-testid="news-detail-modal-body-key-insights-divider-3"
                    />
                    <Grid templateColumns="40px 1fr 1fr" gap={2}>
                      <GridItem data-testid="news-detail-modal-body-key-insights-content-number-3-wrapper">
                        <Text
                          className="card-text-aaa"
                          data-testid="news-detail-modal-body-key-insights-content-number-3"
                          textAlign="center"
                        >
                          3
                        </Text>
                      </GridItem>
                      <GridItem data-testid="news-detail-modal-body-key-insights-content-key-insight-3-wrapper">
                        <Text
                          className="card-text-aaa"
                          data-testid="news-detail-modal-body-key-insights-content-key-insight-3"
                        >
                          {key_insight_3}
                        </Text>
                      </GridItem>
                      <GridItem data-testid="news-detail-modal-body-key-insights-content-key-impact-3-wrapper">
                        <Text
                          className="card-text-aaa"
                          data-testid="news-detail-modal-body-key-insights-content-key-impact-3"
                        >
                          {key_impact_3}
                        </Text>
                      </GridItem>
                    </Grid>
                    <Divider
                      orientation="horizontal"
                      borderWidth="1px"
                      color="#E2E8F0"
                      margin={"8px"}
                      data-testid="news-detail-modal-body-key-insights-divider-4"
                    />
                  </CardBody>
                </Card>
              )}

              {recommendations === "" ? (
                ""
              ) : (
                <>
                  <Text
                    className="reco"
                    color={textLabelColor}
                    data-testid="news-detail-modal-body-recommendations-title"
                  >
                    Recommendation
                  </Text>
                  <Box
                    className="reco2"
                    color={textLabelColor}
                    data-testid="news-detail-modal-body-recommendations"
                  >
                    <ReactMarkdown
                      components={components}
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {recommendations}
                    </ReactMarkdown>
                  </Box>
                </>
              )}
              {/* {full_content === "" ? (
            ""
          ) : (
            <>
              <Text className="reco" data-testid="news-detail-modal-body-full-content-title">Full Content</Text>
              <Box className="reco2" data-testid="news-detail-modal-body-full-content">
                <Markdown content={full_content}></Markdown>
              </Box>
            </>
          )} */}
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

// NewsDetails.propTypes = {
//   data: PropTypes.object,
//   isOpen: PropTypes.bool,
//   onClose: PropTypes.func,
//   onBack: PropTypes.func,
// };

export default NewsDetails;
