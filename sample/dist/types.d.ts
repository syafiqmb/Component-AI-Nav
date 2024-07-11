/* eslint-disable prettier/prettier */
import React$1, { MouseEventHandler, FC } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import PropTypes from 'prop-types';

type ButtonProps = {
    text?: string;
    primary?: boolean;
    disabled?: boolean;
    size?: "small" | "medium" | "large";
    onClick?: MouseEventHandler<HTMLButtonElement>;
};
declare const Button: React$1.FC<ButtonProps>;

declare const DatePicker: React$1.FC<any>;

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

interface RelatedArticlesProps {
    setSeeAllOpen: React.Dispatch<React.SetStateAction<boolean>>;
    openDetailsModal: (data: any) => void;
    isLoading: boolean;
    isFile: boolean;
    docs: [
        {
            article: string;
            author: string;
            date: string;
            description: string;
            distance: number;
            facets: [
                {
                    content: string;
                    header: string;
                }
            ];
            id: string;
            source: string;
            summary: string;
            tags: string;
            title: string;
            url: string;
        }
    ];
    tagBgColor: string;
    tagTextColor: string;
    iconBgColor: string;
    iconColor: string;
    textLinkColor: string;
}
declare const RelatedArticles: FC<RelatedArticlesProps>;

interface RelatedArticlesDrawerProps {
    isFile: boolean;
    isLoading: boolean;
    setSeeAllOpen: React.Dispatch<React.SetStateAction<boolean>>;
    openDetailsModal: (data: any) => void;
    docs: [
        {
            article: string;
            author: string;
            date: string;
            description: string;
            distance: number;
            facets: [
                {
                    content: string;
                    header: string;
                }
            ];
            id: string;
            source: string;
            summary: string;
            tags: string;
            title: string;
            url: string;
        }
    ];
    tagBgColor: string;
    tagTextColor: string;
    iconBgColor: string;
    iconColor: string;
    textLinkColor: string;
}
declare const RelatedArticlesDrawer: FC<RelatedArticlesDrawerProps>;

type ItemType = {
    article: string;
    author: string;
    date: string;
    description: string;
    distance: number;
    facets: [
        {
            content: string;
            header: string;
        }
    ];
    id: string;
    source: string;
    summary: string;
    tags: string;
    title: string;
    url: string;
};
interface ArticleListModalProps {
    setSeeAllOpen: React.Dispatch<React.SetStateAction<boolean>>;
    openDetailsModal: (data: ItemType) => void;
    chatId: string;
    isOpen: boolean;
    onClose: () => void;
    data: [
        {
            article: string;
            author: string;
            date: string;
            description: string;
            distance: number;
            facets: [
                {
                    content: string;
                    header: string;
                }
            ];
            id: string;
            source: string;
            summary: string;
            tags: string;
            title: string;
            url: string;
        }
    ];
    iconBgColor: string;
    iconColor: string;
    tagBgColor: string;
    tagTextColor: string;
}
declare const ArticleListModal: FC<ArticleListModalProps>;

export { ArticleListModal, Button, DatePicker, DynamicOverview, EmptyNews, GridNewsItem, News, NewsDetails as NewsDetail, NewsFilter, RelatedArticles, RelatedArticlesDrawer };
