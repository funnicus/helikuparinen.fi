import { FC, ReactNode } from 'react';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';

const Bold: FC<OptionsProps> = ({ children }) => <strong>{children}</strong>;

const Text: FC<OptionsProps> = ({ children }) => <p>{children}</p>;

const H1: FC<OptionsProps> = ({ children }) => (
    <h1 style={{ fontSize: '3em' }}>{children}</h1>
);

Bold.displayName = 'BOLD';
Text.displayName = 'PARAGRPH';

export const options = {
    renderMark: {
        [MARKS.BOLD]: (text: ReactNode): JSX.Element => <Bold>{text}</Bold>,
    },
    renderNode: {
        [BLOCKS.PARAGRAPH]: (_node, children: ReactNode): JSX.Element => (
            <Text>{children}</Text>
        ),
        [BLOCKS.HEADING_1]: (_node, children: ReactNode): JSX.Element => (
            <H1>{children}</H1>
        ),
        [INLINES.HYPERLINK]: ({ data }, children: ReactNode): JSX.Element => (
            <a href={data.uri} style={{ color: 'blue' }}>
                {children}
            </a>
        ),
    },
};

interface OptionsProps {
    children: ReactNode;
}
