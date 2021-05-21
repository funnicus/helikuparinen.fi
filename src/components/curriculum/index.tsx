import * as contentful from 'contentful';

import { Curriculum as CV } from '@type/contentful';

const Curriculum = ({ curriculum } : { curriculum: contentful.Entry<CV>[] }): JSX.Element => {
    return (
        <div className='Curriculum'>
            <h2>Curriculum</h2>
            {curriculum[0].fields.section.map((section) => {
                return(
                    <div className='CurriculumSection' key={section.sys.id}>
                        <h4>{section.fields.title}</h4>
                        {section.fields.entries.map(entry => {
                            return(
                                <div className='CurriculumRow' key={entry.sys.id}>
                                    <div className='Year'><strong>{entry.fields.year}</strong></div>
                                    <div className='Desc'>{entry.fields.content}</div>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default Curriculum;