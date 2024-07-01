import "./DynamicOverview.css";

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
  paragraphs /* paragraphs - accepts array of objects */,
}: any) => {
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
        {paragraphs &&
          paragraphs.map((data: any, index: any) => (
            <GridItem
              key={index}
              data-testid="summary-analysis-competitor-moves-grid-item"
            >
              <Text
                data-testid="summary-analysis-competitor-moves-title"
                fontSize={{ sm: "16px", xl: "16px" }}
                className="subheading"
              >
                {data.title}
              </Text>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                data-testid={`chatbox-response-markdown`}
              >
                {data.paragraph}
              </ReactMarkdown>
              {data?.graph?.dataset && (
                <Box width="300px" height="300px" margin="0 auto">
                  <Bar
                    width={300}
                    height={300}
                    data={{
                      labels: data.graph?.labels,
                      datasets: [
                        {
                          label: data.graph?.datasetLabel,
                          data: data.graph?.dataset,
                          backgroundColor: data.graph?.backgroundColor,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: data.graph?.optionPosition,
                        },
                        title: {
                          display: true,
                          text: data.graph?.chartTitle,
                        },
                      },
                    }}
                  />
                </Box>
              )}
            </GridItem>
          ))}
      </Grid>
    </Flex>
  );
};

export default DynamicOverview;
