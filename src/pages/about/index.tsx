import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import Curriculum from '@components/curriculum';

import { getSingleContent, getContent } from '@services/contentful';
import { AboutProps, Curriculum as CV } from '@type/contentful';
import useWindowDimensions from '@hooks/useWindowDimensions';

import aboutStyles from './about.module.css';

const About = (props: AboutProps): JSX.Element => {

    //making seperate paragraphs from each newline in statement
    const statement = props.statement.statement.split('\n').map((s, i) => <p key={i}>{s}</p>);

    const { width } = useWindowDimensions();

    return (
        <div>
            <Head >
                <title>About me</title>
                <meta name='description' content='Heli Kuparinen is a Helsinki-based artist who mainly works with oilpaints. 
                Currently, I am particulary interested in portraying people in
                my works. On the background, I have a solid understanding 
                of the living model, aqcuired from my studies, as well as an academic degree
                in painting.' />
            </Head>
            {width > 950 ? <nav id='about-me-nav'>
                <ul>
                    <li><a href='#about'>About me</a></li>
                    <li><a href='#curriculum'>Curriculum</a></li>
                    <li><a href='#statement'>Statement</a></li>
                </ul>
            </nav> : null}
            <div className={aboutStyles.About}>
                <section id='about' className={aboutStyles.bio}>
                    <article>
                        <h2>{props.bio.title}</h2>
                        <p>{props.bio.bio}</p>
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
                <section id='curriculum'>
                    <Curriculum curriculum={props.curriculum} />
                </section>
                <hr></hr>
                <section id='statement'>
                    <h2>{props.statement.title}</h2>
                    <article><p>{statement}</p></article>
                </section>
                <hr></hr>
            </div>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async context => {
    return {
        props: {
            bio: await getSingleContent<{ title: string; bio: string; }>(context.locale, 'biography'),
            curriculum: await getContent<CV>(context.locale, 'curriculum'),
            statement: await getSingleContent<{ title: string; statement: string; }>(context.locale, 'statement')
        }
    };
};

export default About;