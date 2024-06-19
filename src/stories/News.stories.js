import { fn } from "@storybook/test";
import News from "../components/News";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/News",
  component: News,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    news: [
      {
        article: "string1",
        date: "string1",
        description: "string1",
        key_impact_1: "string1",
        key_impact_2: "string1",
        key_impact_3: "string1",
        key_insight_1: "string1",
        key_insight_2: "string1",
        key_insight_3: "string1",
        rawPublishedDate: "26/12/1992",
        recommendations: "string1",
        src_nm: "string1",
        summary: "string1",
        title: "string1",
        url: "string1",
      },
    ],
  },
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  args: {
    view: false,
    news: [],
  },
};

export const Secondary = {
  args: {
    view: false,
    news: [
      {
        article: "string1",
        date: "string1",
        description: "string1",
        key_impact_1: "string1",
        key_impact_2: "string1",
        key_impact_3: "string1",
        key_insight_1: "string1",
        key_insight_2: "string1",
        key_insight_3: "string1",
        rawPublishedDate: "26/12/1992",
        recommendations: "string1",
        src_nm: "string1",
        summary: "string1",
        title: "string1",
        url: "string1",
      },
    ],
  },
};

export const Large = {
  args: {
    view: false,
    news: [
      {
        article: "string1",
        date: "string1",
        description: "string1",
        key_impact_1: "string1",
        key_impact_2: "string1",
        key_impact_3: "string1",
        key_insight_1: "string1",
        key_insight_2: "string1",
        key_insight_3: "string1",
        rawPublishedDate: "26/12/1992",
        recommendations: "string1",
        src_nm: "string1",
        summary: "string1",
        title: "string1",
        url: "string1",
      },
    ],
  },
};

export const Small = {
  args: {
    view: false,
    news: [
      {
        article: "string1",
        date: "string1",
        description: "string1",
        key_impact_1: "string1",
        key_impact_2: "string1",
        key_impact_3: "string1",
        key_insight_1: "string1",
        key_insight_2: "string1",
        key_insight_3: "string1",
        rawPublishedDate: "string1",
        recommendations: "string1",
        src_nm: "string1",
        summary: "string1",
        title: "string1",
        url: "string1",
      },
    ],
  },
};
