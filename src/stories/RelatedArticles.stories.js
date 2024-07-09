import { fn } from "@storybook/test";
import React from 'react';
import RelatedArticles from "../components/RelatedArticles";

// function example
const openDetailsModal = (data) => {
	console.log("Article is clicked");
};


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/RelatedArticles",
  component: RelatedArticles,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  argTypes: {
    openDetailsModal: {action: 'openDetailsModal'},
    isLoading: "boolean",
    isFile: "boolean",
    docs: [
      {
        article: "string",
        author: "string",
        date: "string",
        description: "string",
        facets: [
            {
                content: "string",
                header: "string",
            }
        ],
        id: "string",
        source: "string",
        summary: "string",
        tags: "string",
        title: "string",
        url: "string",
      }
    ],
  },
};

export default meta;

const Template = (args) => <RelatedArticles {...args} />;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = Template.bind({});
Primary.args = {
  openDetailsModal,
  isLoading: "false",
  isFile: "false",
  docs: [
    {
      article: "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
      author: "Steve Jobs",
      date: "2023-09-05",
      description: "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
      facets: [
        {
          content: "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
          header: "Lorem ipsum",
        }
      ],
      id: "qwertyuioasdfg",
      source: "['website_abc', 'abc_link']",
      summary: "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
      tags: "['AUTOMATION', 'MACHINE LEARNING', 'RECOMMENDATION SYSTEMS', 'TEXT GENERATION', 'PREDICTIVE ANALYTICS & FORECASTING', 'DATA VISUALIZATION & ANALYSIS', 'DATA PREPARATION & CLEANING', 'AI SERVICE', 'GOOGLE (ALPHABET INC.)']",
      title: "Lorem ipsum",
      url: "https://www.deloitte.com/global/en.html",
    },
    {
      article: "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
      author: "Steve Jobs",
      date: "2023-09-05",
      description: "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
      facets: [
        {
          content: "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
          header: "Lorem ipsum",
        }
      ],
      id: "qwertyuioasdfg",
      source: "['website_abc', 'abc_link']",
      summary: "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
      tags: "['AUTOMATION', 'MACHINE LEARNING', 'RECOMMENDATION SYSTEMS', 'TEXT GENERATION', 'PREDICTIVE ANALYTICS & FORECASTING', 'DATA VISUALIZATION & ANALYSIS', 'DATA PREPARATION & CLEANING', 'AI SERVICE', 'GOOGLE (ALPHABET INC.)']",
      title: "Lorem ipsum",
      url: "https://www.deloitte.com/global/en.html",
    },
    {
      article: "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
      author: "Steve Jobs",
      date: "2023-09-05",
      description: "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
      facets: [
        {
          content: "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
          header: "Lorem ipsum",
        }
      ],
      id: "qwertyuioasdfg",
      source: "['website_abc', 'abc_link']",
      summary: "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
      tags: "['AUTOMATION', 'MACHINE LEARNING', 'RECOMMENDATION SYSTEMS', 'TEXT GENERATION', 'PREDICTIVE ANALYTICS & FORECASTING', 'DATA VISUALIZATION & ANALYSIS', 'DATA PREPARATION & CLEANING', 'AI SERVICE', 'GOOGLE (ALPHABET INC.)']",
      title: "Lorem ipsum",
      url: "https://www.deloitte.com/global/en.html",
    }
  ],
};

export const Secondary = Template.bind({});
Secondary.args = {
	openDetailsModal,
  isLoading: "false",
  isFile: "false",
  docs: [
    {
      article: "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
      author: "Steve Jobs",
      date: "2023-09-05",
      description: "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
      facets: [
        {
          content: "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
          header: "Lorem ipsum",
        }
      ],
      id: "qwertyuioasdfg",
      source: "['website_abc', 'abc_link']",
      summary: "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
      tags: "['AUTOMATION', 'MACHINE LEARNING', 'RECOMMENDATION SYSTEMS', 'TEXT GENERATION', 'PREDICTIVE ANALYTICS & FORECASTING', 'DATA VISUALIZATION & ANALYSIS', 'DATA PREPARATION & CLEANING', 'AI SERVICE', 'GOOGLE (ALPHABET INC.)']",
      title: "Lorem ipsum",
      url: "https://www.deloitte.com/global/en.html",
    }
  ],
};

export const Third = Template.bind({});
Third.args = {
  openDetailsModal,
  isLoading: "false",
  isFile: "false",
  promptId: "123456qwerty",
  docs: [
    {
      article: "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
      author: "Steve Jobs",
      date: "2023-09-05",
      description: "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
      facets: [
        {
          content: "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
          header: "Lorem ipsum",
        }
      ],
      id: "qwertyuioasdfg",
      source: "['website_abc', 'abc_link']",
      summary: "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
      tags: "['AUTOMATION', 'MACHINE LEARNING', 'RECOMMENDATION SYSTEMS', 'TEXT GENERATION', 'PREDICTIVE ANALYTICS & FORECASTING', 'DATA VISUALIZATION & ANALYSIS', 'DATA PREPARATION & CLEANING', 'AI SERVICE', 'GOOGLE (ALPHABET INC.)']",
      title: "Lorem ipsum",
      url: "https://www.deloitte.com/global/en.html",
    }
  ],
};