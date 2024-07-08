import React, { MouseEventHandler, RefObject } from 'react';
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

declare const DynamicOverview: ({ overviewData, paragraphs, }: any) => react_jsx_runtime.JSX.Element;

declare const RelatedArticles: {({ openDetailsModal, isLoading, isFile, docs }:{
    openDetailsModal?: () => void;
    isLoading?: boolean;
    isFile?: boolean;
    docs?: [
        {
            article: string,
            author: string,
            date: string,
            description: string,
            facets: [
                {
                    content: string,
                    header: string,
                }
            ],
            id: string,
            source: string,
            summary: string,
            tags: string,
            title: string,
            url: string,
        }
    ],
}): react_jsx_runtime.JSX.Element};

declare const RelatedArticlesDrawer: {({ openDetailsModal, docs }:{   
    openDetailsModal?: () => void;
    docs?: [
        {
            article: string,
            author: string,
            date: string,
            description: string,
            facets: [
                {
                    content: string,
                    header: string,
                }
            ],
            id: string,
            source: string,
            summary: string,
            tags: string,
            title: string,
            url: string,
        }
    ],
}): react_jsx_runtime.JSX.Element};

declare const ArticleListModal: {({ openDetailsModal, chatId, openModal, data }:{   
    openDetailsModal?: () => void;
    chatId?: string;
    openModal?: boolean;
    data?: [
        {
            article: string,
            author: string,
            date: string,
            description: string,
            facets: [
                {
                    content: string,
                    header: string,
                }
            ],
            id: string,
            source: string,
            summary: string,
            tags: string,
            title: string,
            url: string,
        }
    ],
}): react_jsx_runtime.JSX.Element};

export { Button, DatePicker, DynamicOverview, EmptyNews, GridNewsItem, News, NewsDetails as NewsDetail, NewsFilter, RelatedArticles, RelatedArticlesDrawer, ArticleListModal };
