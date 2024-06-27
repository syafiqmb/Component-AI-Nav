import React, { MouseEventHandler } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import PropTypes from 'prop-types';

type ButtonProps = {
    text?: string;
    primary?: boolean;
    disabled?: boolean;
    size?: "small" | "medium" | "large";
    onClick?: MouseEventHandler<HTMLButtonElement>;
};
declare const Button: React.FC<ButtonProps>;

declare const DatePicker: React.FC<any>;

declare const EmptyNews: {
    ({ title, desc, }: {
        title?: string | undefined;
        desc?: string | undefined;
    }): react_jsx_runtime.JSX.Element;
    propTypes: {
        title: PropTypes.Requireable<string>;
        desc: PropTypes.Requireable<string>;
    };
};

declare const GridNewsItem: ({ item, openDetail }: any) => react_jsx_runtime.JSX.Element;

declare const NewsDetails: ({ data, isOpen, onClose, onBack }: any) => react_jsx_runtime.JSX.Element;

declare const NewsFilter: ({ listoftopic, submitFunc }: any) => react_jsx_runtime.JSX.Element;

declare const News: ({ view, news }: any) => react_jsx_runtime.JSX.Element;

declare const DynamicOverview: ({ overviewData, labels, dataset, datasetLabel, backgroundColor, optionPosition, chartTitle, leftSideParagraph, rightSideParagraph, }: any) => react_jsx_runtime.JSX.Element;

export { Button, DatePicker, DynamicOverview, EmptyNews, GridNewsItem, News, NewsDetails as NewsDetail, NewsFilter };
