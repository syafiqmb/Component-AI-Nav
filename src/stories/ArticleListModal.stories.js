import { fn } from "@storybook/test";
import React, {useState} from 'react';
import { action } from '@storybook/addon-actions';
import ArticleListModal from "../components/ArticleListModal";

// function example
const openDetailsModal = (data) => {
	console.log("Article is clicked");
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/ArticleListModal",
  component: ArticleListModal,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  argTypes: {
    setSeeAllOpen: { control: 'boolean' },
    openDetailsModal: {action: 'openDetailsModal'},
    chatId: "string",
    isOpen: { control: 'boolean' },
    onClose: { action: 'onClose' },
    data: [
      {
        article: "string",
        author: "string",
        date: "string",
        description: "string",
        distance: "number",
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
    iconBgColor: "string",
    iconColor: "string",
    tagBgColor: "string",
    tagTextColor: "string",
  },
};

export default meta;

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  return (
    <ArticleListModal
      {...args}
      setSeeAllOpen={(value) => setIsOpen(value)}
      isOpen={isOpen}
    />
  );
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = Template.bind({});
Primary.args = {
  setSeeAllOpen: action('setSeeAllOpen'),
  openDetailsModal,
  chatId: "qwerty123",
	isOpen: true,
  onClose: action('onClose'),
  data: [
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
  iconBgColor: "pink",
  iconColor: "black",
  tagBgColor: "orange",
  tagTextColor: "white",
};

export const Secondary = Template.bind({});
Secondary.args = {
  setSeeAllOpen: action('setSeeAllOpen'),
  openDetailsModal,
  chatId: "qwerty123",
	isOpen: true,
  onClose: action('onClose'),
  data: [
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
  iconBgColor: "pink",
  iconColor: "black",
  tagBgColor: "orange",
  tagTextColor: "white",
};

export const Third = Template.bind({});
Third.args = {
  setSeeAllOpen: action('setSeeAllOpen'),
  openDetailsModal,
  chatId: "qwerty123",
	isOpen: true,
  onClose: action('onClose'),
  data: [
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
  iconBgColor: "pink",
  iconColor: "black",
  tagBgColor: "orange",
  tagTextColor: "white",
};