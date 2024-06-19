import "./News.css";

import { GridItem, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import NewsFilter from "../NewsFilter";
import NewsDetails from "../NewsDetail";
import EmptyNews from "../EmptyNews";
import GridNewsItem from "../GridNewsItem";

const News = ({ view, news }) => {
  const [loading, setLoading] = useState(false);

  const [newsDataDetails, setNewsDataDetails] = useState({});
  const [newsOpenDetails, setNewsOpenDetails] = useState(false);

  return (
    <div>
      <div
        data-testid="competitor-news-grid-panel-content"
        className="list-panel-content"
      >
        <NewsFilter
          listoftopic={[]}
          data-testid="competitor-news-grid-filter"
          submitFunc={() => console.log("NewsFilter")}
        ></NewsFilter>
        <SimpleGrid
          data-testid="competitor-news-grid-wrapper"
          columns={{ base: 1, sm: 2, xl: 3 }}
          spacingX={10}
        >
          {loading ? (
            <GridItem data-testid="competitor-news-grid-loading" colSpan={2}>
              Loading...
            </GridItem>
          ) : news && news.length > 0 ? (
            news.map((item, key) => (
              <GridNewsItem
                data-testid="competitor-news-grid-item"
                item={item}
                key={key}
                openDetail={() => {
                  setNewsDataDetails(item);
                  setNewsOpenDetails(true);
                }}
              />
            ))
          ) : (
            <EmptyNews
              data-testid="competitor-news-grid-empty-item"
              title="No data to display"
              desc=""
            />
          )}
        </SimpleGrid>
      </div>
      <NewsDetails
        data={newsDataDetails}
        isOpen={newsOpenDetails}
        onClose={() => setNewsOpenDetails(false)}
        onBack={() => setNewsOpenDetails(false)}
      />
    </div>
  );
};

export default News;
