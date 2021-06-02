/* eslint-disable react/display-name */
import { FC, ReactNode } from 'react';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

export const Bold: FC<OptionsProps> = ({ children }) => <strong>{children}</strong>;

export const Text: FC<OptionsProps> = ({ children }) => <p>{children}</p>;

export const H1: FC<OptionsProps> = ({ children }) => <h1 style={{ fontSize: '3em' }}>{children}</h1>;

Bold.displayName = 'BOLD';
Text.displayName = 'PARAGRPH';

export const options = {
    renderMark: {
        [MARKS.BOLD]: (text: ReactNode): JSX.Element => <Bold>{text}</Bold>
    },
    renderNode: {
        [BLOCKS.PARAGRAPH]: (_node, children: ReactNode): JSX.Element => <Text>{children}</Text>,
        [BLOCKS.HEADING_1]: (_node, children: ReactNode): JSX.Element => <H1>{children}</H1>,
    }
};

interface OptionsProps {
    children: ReactNode;
}