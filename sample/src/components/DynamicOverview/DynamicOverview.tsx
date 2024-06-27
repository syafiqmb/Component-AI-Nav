import { Box, Divider, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  registerables,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  ArcElement,
  ...registerables,
);

const DynamicOverview = ({
  overviewData /*  top paragraph - accepts string*/,
  // chart component starts
  labels /* accepts array of strings */,
  dataset /* accepts array of strings */,
  datasetLabel /* accepts strings */,
  backgroundColor /* accepts array of strings */,
  optionPosition /* accepts strings */,
  chartTitle /* accepts strings */,
  // chart component ends
  leftSideParagraph /* right paragraph - accepts object -> title and paragraph */,
  rightSideParagraph /* left paragraph - accepts object -> title and paragraph */,
}: any) => {
  // const datasets = [];
  // if (dataset.length > 0) {
  //   dataset.forEach((data: any) => {
  //     if (data) {
  //       datasets.push(parseInt(data.replace(/,/g, "")));
  //     }
  //   });
  // }

  const dataMetrics = {
    labels: labels,
    datasets: [
      {
        label: datasetLabel,
        data: dataset,
        backgroundColor: backgroundColor,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: optionPosition,
      },
      title: {
        display: true,
        text: chartTitle,
      },
    },
  };

  return (
    <Flex className="global-outlook-container">
      <Text className="global-outlook-overview">
        {overviewData && overviewData}
      </Text>
      <Divider
        data-testid="summary-analysis-competitor-moves-opening-divider"
        borderWidth="1.5px"
      />
      <Grid
        data-testid="summary-analysis-main-grid-wrapper"
        gap="10"
        templateColumns="repeat(2, 1fr)"
        className="grid-container"
      >
        <GridItem data-testid="summary-analysis-competitor-moves-grid-item">
          <Text
            data-testid="summary-analysis-competitor-moves-title"
            fontSize={{ sm: "16px", xl: "16px" }}
            className="subheading"
          >
            {leftSideParagraph.title}
          </Text>
          <Text
            data-testid="summary-analysis-competitor-moves-title"
            fontSize={{ sm: "16px", xl: "16px" }}
          >
            {leftSideParagraph.paragraph}
          </Text>
          {dataset && (
            <Box
              width="300px"
              height="300px"
              margin="0 auto"
              // className="bar-chart-container"
              // style={{ width: 300, height: 300, margin: "0 auto" }}
            >
              <Bar
                width={300}
                height={300}
                data={dataMetrics}
                options={options}
              />
            </Box>
          )}
        </GridItem>
        <GridItem data-testid="summary-analysis-news-analysis-grid-item">
          <Text
            data-testid="summary-analysis-news-analysis-title"
            fontSize={{ sm: "16px", xl: "16px" }}
            className="subheading"
          >
            {rightSideParagraph.title}
          </Text>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            data-testid={`chatbox-response-markdown`}
          >
            {rightSideParagraph.paragraph}
          </ReactMarkdown>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default DynamicOverview;
