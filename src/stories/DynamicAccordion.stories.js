import React from 'react';
import { ChakraProvider, UnorderedList, ListItem, Image, Text } from '@chakra-ui/react';
import { Meta, Story } from '@storybook/react';
import DynamicAccordion from '../components/DynamicAccordion';

const meta = {
  title: 'Example/DynamicAccordion',
  component: DynamicAccordion,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: {
        type: 'radio',
        options: ['single', 'grid'],
      },
    },
  },
};

export default meta;

const Template = (args) => (
  <ChakraProvider>
    <DynamicAccordion {...args} />
  </ChakraProvider>
);

export const SingleVariant = Template.bind({});
SingleVariant.args = {
  title: 'Single Variant Example',
  data: [
    {
      title: "Section 1",
      content: (
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
      ),
    },
    {
      title: "Section 2",
      content: (
        <UnorderedList>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
        </UnorderedList>
      ),
    },
    {
      title: "Section 3",
      content: (
        <Image src="https://via.placeholder.com/150" alt="Placeholder Image" />
      ),
    },
    {
      title: "Section 4",
      content: (
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
      ),
    },
  ],
  variant: 'single',
};

export const GridVariant = Template.bind({});
GridVariant.args = {
  title: 'Grid Variant Example',
  data: [
    {
      title: "Section 1",
      content: (
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
      ),
    },
    {
      title: "Section 2",
      content: (
        <UnorderedList>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
        </UnorderedList>
      ),
    },
    {
      title: "Section 3",
      content: (
        <Image src="https://via.placeholder.com/150" alt="Placeholder Image" />
      ),
    },
    {
      title: "Section 4",
      content: (
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
      ),
    },
  ],
  variant: 'grid',
};

export const MixedContentVariant = Template.bind({});
MixedContentVariant.args = {
  title: 'Mixed Content Variant Example',
  data: [
    {
      title: "Section 1",
      content: (
        <>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>
          <Image src="https://via.placeholder.com/150" alt="Placeholder Image" />
        </>
      ),
    },
    {
      title: "Section 2",
      content: (
        <>
          <UnorderedList>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
            <ListItem>Item 3</ListItem>
          </UnorderedList>
          <Text mt={2}>
            Additional text content here.
          </Text>
        </>
      ),
    },
  ],
  variant: 'single',
};
