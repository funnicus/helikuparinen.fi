import { useEffect, useState } from 'react';

import { GetStaticProps } from 'next';
import Image from 'next/image';

import Curriculum from '@/components/curriculum';
import Seo from '@/components/seo';
import JsonLd, {
    personSchema,
    breadcrumbSchema,
    faqPageSchema,
    SITE_URL,
} from '@/components/seo/JsonLd';
import Breadcrumb from '@/components/breadcrumb';

import { getSingleContent, getContent } from '@/services/contentful';
import { AboutProps, Curriculum as CV } from '@/types/contentful';

import { useStateValue, setTheme } from '@/state/index';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import useScrollPosition, { IScrollProps } from '@/hooks/useScrollPosition';
import { useRouter } from 'next/router';

import aboutStyles from './about.module.scss';

type Focus = 'about' | 'cv' | 'statement';

const faqItems = {
    'fi-FI': [
        {
            question: 'Kuka on Heli Kuparinen?',
            answer: 'Heli Kuparinen on helsinkiläinen taidemaalari, joka työskentelee pääasiassa öljyväreillä. Hänellä on akateeminen tutkinto maalaustaiteen alalta.',
        },
        {
            question: 'Millä tekniikalla Heli työskentelee?',
            answer: 'Heli työskentelee pääasiassa öljyväreillä ja kuvaa teoksissaan ihmisiä. Hänellä on vankka osaaminen elävän mallin kuvaamisessa.',
        },
        {
            question: 'Missä Heli Kuparinen asuu ja työskentelee?',
            answer: 'Heli Kuparinen asuu ja työskentelee Helsingissä, Suomessa.',
        },
    ],
    'en-US': [
        {
            question: 'Who is Heli Kuparinen?',
            answer: 'Heli Kuparinen is a Helsinki-based visual artist and painter who works primarily with oil paints. She holds an academic degree in painting.',
        },
        {
            question: 'What medium does Heli work with?',
            answer: 'Heli works primarily with oil paints and is particularly interested in portraying people in her works. She has a solid understanding of the living model acquired from her studies.',
        },
        {
            question: 'Where is Heli Kuparinen based?',
            answer: 'Heli Kuparinen is based in Helsinki, Finland.',
        },
    ],
};

const About = ({ bio, curriculum, statement }: AboutProps): JSX.Element => {
    const [{ theme }, dispatch] = useStateValue();
    const { locale } = useRouter();
    const isFi = locale === 'fi-FI';

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

    const currentFaq = isFi ? faqItems['fi-FI'] : faqItems['en-US'];

    return (
        <div>
            <Seo
                title={
                    bio.title === 'About me'
                        ? 'About Me | Heli Kuparinen'
                        : `${bio.title} | Heli Kuparinen`
                }
                description={
                    bio.bio.length > 160
                        ? bio.bio.substring(0, 157) + '...'
                        : bio.bio
                }
                ogImage="https://helikuparinen.fi/profile-heli.png"
                ogImageAlt="Portrait of Heli Kuparinen, visual artist"
            />
            <JsonLd
                data={[
                    personSchema(),
                    breadcrumbSchema([
                        { name: 'Heli Kuparinen', url: SITE_URL },
                        {
                            name: isFi ? 'Tietoa minusta' : 'About Me',
                            url: `${SITE_URL}${isFi ? '' : '/en-US'}/about`,
                        },
                    ]),
                    faqPageSchema(currentFaq),
                ]}
            />
            <Breadcrumb
                items={[
                    { label: 'Heli Kuparinen', href: '/' },
                    {
                        label: isFi ? 'Tietoa minusta' : 'About Me',
                        href: '/about',
                    },
                ]}
            />
            {width > 950 ? (
                <nav
                    id="about-me-nav"
                    aria-label={isFi ? 'Sivun sisältö' : 'Page sections'}
                >
                    <ul>
                        <li className={isFocused('about')}>
                            <a href="#about">
                                {isFi ? 'Tietoa minusta' : 'About me'}
                            </a>
                        </li>
                        <li className={isFocused('cv')}>
                            <a href="#curriculum">Curriculum</a>
                        </li>
                        <li className={isFocused('statement')}>
                            <a href="#statement">Statement</a>
                        </li>
                        <li className={isFocused('statement')}>
                            <a href="#faq">FAQ</a>
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
                            alt="Portrait of Heli Kuparinen, visual artist"
                            width={300}
                            height={300}
                        />
                    </div>
                </section>
                <hr />
                <section id="curriculum">
                    <Curriculum curriculum={curriculum} />
                </section>
                <hr />
                <section id="statement">
                    <h2>{statement.title}</h2>
                    <article>{statementMapped}</article>
                </section>
                <hr />
                <section id="faq">
                    <h2>
                        {isFi
                            ? 'Usein kysytyt kysymykset'
                            : 'Frequently Asked Questions'}
                    </h2>
                    <dl>
                        {currentFaq.map((item, index) => (
                            <div key={index}>
                                <dt>
                                    <strong>{item.question}</strong>
                                </dt>
                                <dd>{item.answer}</dd>
                            </div>
                        ))}
                    </dl>
                </section>
                <hr />
            </div>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            bio: await getSingleContent<{ title: string; bio: string }>(
                context.locale,
                'biography',
            ),
            curriculum: await getContent<CV>(context.locale, 'curriculum'),
            statement: await getSingleContent<{
                title: string;
                statement: string;
            }>(context.locale, 'statement'),
        },
        revalidate: 600,
    };
};

export default About;
