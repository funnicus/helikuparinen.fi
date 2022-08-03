import { useEffect, useState } from 'react';

import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import Curriculum from '@/components/curriculum';

import { getSingleContent, getContent } from '@/services/contentful';
import { AboutProps, Curriculum as CV } from '@/types/contentful';

import { useStateValue, setTheme } from '@/state/index';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import useScrollPosition, { IScrollProps } from '@/hooks/useScrollPosition';

import aboutStyles from './about.module.scss';

type Focus = 'about' | 'cv' | 'statement';

const About = ({ bio, curriculum, statement }: AboutProps): JSX.Element => {
    const [{ theme }, dispatch] = useStateValue();

    const [navFocus, setNavFocus] = useState<Focus>('about');

    // making seperate paragraphs from each newline in statement
    const statementMapped = statement.statement
        .split('\n')
        .map((s, i) => <p key={i}>{s}</p>);

    const setBackground = ({ currPos }: IScrollProps) => {
        if (currPos.y < 1000) {
            dispatch(setTheme({ background: '#aebfbe', color: '#000' }));
            setNavFocus('about');
        } else if (currPos.y < 4266) {
            dispatch(setTheme({ background: '#E0F2F1', color: '#000' }));
            setNavFocus('cv');
        } else {
            dispatch(setTheme({ background: '#fff', color: '#000' }));
            setNavFocus('statement');
        }
    };

    const isFocused = (target: Focus) =>
        navFocus === target ? aboutStyles['focused-nav'] : null;

    const { width } = useWindowDimensions();

    useScrollPosition(setBackground, null, null, true);

    //setting darker theme when navigating to page
    useEffect(() => {
        dispatch(setTheme({ background: '#aebfbe', color: '#000' }));
    }, []);

    return (
        <div>
            <Head>
                <title>About me</title>
                <meta
                    name="description"
                    content="Heli Kuparinen is a Helsinki-based artist who mainly works with oilpaints. 
                Currently, I am particulary interested in portraying people in
                my works. On the background, I have a solid understanding 
                of the living model, aqcuired from my studies, as well as an academic degree
                in painting."
                />
            </Head>
            {width > 950 ? (
                <nav id="about-me-nav">
                    <ul>
                        <li className={isFocused('about')}>
                            <a href="#about">About me</a>
                        </li>
                        <li className={isFocused('cv')}>
                            <a href="#curriculum">Curriculum</a>
                        </li>
                        <li className={isFocused('statement')}>
                            <a href="#statement">Statement</a>
                        </li>
                    </ul>
                </nav>
            ) : null}
            <div style={{ color: theme.color }} className={aboutStyles.About}>
                <section id="about" className={aboutStyles.bio}>
                    <article>
                        <h2>{bio.title}</h2>
                        <p>{bio.bio}</p>
                    </article>
                    <div>
                        <Image
                            src="/profile-heli.png"
                            alt="Picture of the author"
                            width={300}
                            height={300}
                        />
                    </div>
                </section>
                <hr></hr>
                <section id="curriculum">
                    <Curriculum curriculum={curriculum} />
                </section>
                <hr></hr>
                <section id="statement">
                    <h2>{statement.title}</h2>
                    <article>{statementMapped}</article>
                </section>
                <hr></hr>
            </div>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            bio: await getSingleContent<{ title: string; bio: string }>(
                context.locale,
                'biography'
            ),
            curriculum: await getContent<CV>(context.locale, 'curriculum'),
            statement: await getSingleContent<{
                title: string;
                statement: string;
            }>(context.locale, 'statement'),
        },
        revalidate: 60,
    };
};

export default About;
