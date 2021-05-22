import * as contenful from 'contentful';

export type AboutProps = {
    bio: Biography;
    curriculum: contentful.Entry<Curriculum>[];
    statement: Statement;
}

export type PaintingsProps = {
    gallery: contenful.Entry<Gallery>[];
}

export type ContentType = 'biography' | 'gallery' | 'statement' | 'curriculum';

//turha?
export type Biography = {
        title: string;
        bio: string;
}

export type Curriculum = {
    title: string;
    section: Array<contenful.Entry<CurriculumSection>>;
}

//turha?
export type Statement = {
        title: string;
        statement: string;
}

type CurriculumSection = {
    title: string;
    entries: Array<contenful.Entry<CurriculumEntry>>;     
}

type CurriculumEntry = {
    content: string;
    year?: string;
}

export type Gallery = {
    gallery: string;
    collections: Array<contenful.Entry<Collection>>;
}

type Collection = {
    name: string;
    paintings: Array<contenful.Asset>;
}