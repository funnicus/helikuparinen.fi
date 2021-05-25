import { Entry } from 'contentful';

export type AboutProps = {
    bio: Biography;
    curriculum: contentful.Entry<Curriculum>[];
    statement: Statement;
}

export type PaintingsProps = {
    gallery: Entry<Gallery>[];
}

export type ContentType = 'biography' | 'gallery' | 'statement' | 'curriculum';

//turha?
export type Biography = {
        title: string;
        bio: string;
}

export type Curriculum = {
    title: string;
    section: Array<Entry<CurriculumSection>>;
}

//turha?
export type Statement = {
        title: string;
        statement: string;
}

type CurriculumSection = {
    title: string;
    entries: Array<Entry<CurriculumEntry>>;     
}

type CurriculumEntry = {
    content: string;
    year?: string;
}

export type Gallery = {
    gallery: string;
    collections: Array<Entry<Collection>>;
}

type Collection = {
    name: string;
    paintings: Array<Asset>;
}

export type File = {
    url: string;
    details: {
        size: number;
        image?: {
            width: number;
            height: number;
        };
    };
    fileName: string;
    contentType: string;
}