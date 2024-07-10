import React from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, Grid, Flex, Text, GridItem, AccordionIcon, ChakraProvider } from '@chakra-ui/react';

const DynamicAccordion = ({ title, data = [], variant = 'single' }) => {
  const isGrid = variant === 'grid';

  if (isGrid) {
    // Splitting data into two halves for grid variant
    const firstHalf = data.slice(0, Math.ceil(data.length / 2));
    const secondHalf = data.slice(Math.ceil(data.length / 2));

    return (
      <ChakraProvider>
        <Flex flexDirection="column" data-testid="summary-analysis-news-analysis-grid-item">
          <Text data-testid="summary-analysis-news-analysis-title" fontSize={{ sm: "26px", xl: "30px" }} className="subheading">
            {title}
          </Text>
          <Accordion allowToggle>
            <Grid templateColumns="repeat(2, 1fr)" gap="4">
              {/* Left column */}
              <GridItem>
                {firstHalf.map((item, index) => (
                  <AccordionItem key={index}>
                    <AccordionButton>
                      <Flex align="center" justify="space-between" w="100%">
                        <Text fontSize={{ sm: "16px", xl: "16px" }} className="subheading">
                          {item.title}
                        </Text>
                        <AccordionIcon />
                      </Flex>
                    </AccordionButton>
                    <AccordionPanel pb={2}>
                      {item.content}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </GridItem>
              {/* Right column */}
              <GridItem>
                {secondHalf.map((item, index) => (
                  <AccordionItem key={index + firstHalf.length}>
                    <AccordionButton>
                      <Flex align="center" justify="space-between" w="100%">
                        <Text fontSize={{ sm: "16px", xl: "16px" }} className="subheading">
                          {item.title}
                        </Text>
                        <AccordionIcon />
                      </Flex>
                    </AccordionButton>
                    <AccordionPanel pb={2}>
                      {item.content}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </GridItem>
            </Grid>
          </Accordion>
        </Flex>
      </ChakraProvider>
    );
  } else {
    // Single column variant
    return (
      <ChakraProvider>
        <Flex flexDirection="column" data-testid="summary-analysis-news-analysis-grid-item">
          <Text data-testid="summary-analysis-news-analysis-title" fontSize={{ sm: "26px", xl: "30px" }} className="subheading">
            {title}
          </Text>
          <Accordion allowToggle>
            {data.map((item, index) => (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton>
                    <Box as='span' flex='1' textAlign='left'>
                      {item.title}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {item.content}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Flex>
      </ChakraProvider>
    );
  }
};

export default DynamicAccordion;
