import formStyles from './form.module.css';

const Form = ({ 
    handleSubmit, 
    content, 
    handleContentChange, 
    email, 
    handleEmailChange, 
    lang,
}: Props): JSX.Element => {
    return (
        <div className={formStyles.Form}>
            <h2>{lang === 'fi-FI' ? 'Ota yhteyttä' : 'Contact me'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input 
                        type='email'
                        id='email'
                        value={email}
                        name='Email'
                        placeholder='your@email.com'
                        onChange={e => handleEmailChange(e)}
                    />
                    <button type="submit" aria-label='send email'>
                        {lang === 'fi-FI' ? 'Lähetä!' : 'Send!'}
                    </button>
                </div>
                <textarea
                    itemType='text'
                    id='content'
                    value={content}
                    name="Content"
                    placeholder={lang === 'fi-FI' ? 'mitä kuuluu?' : 'what\'s on your mind?'}
                    onChange={e => handleContentChange(e)}
                />
            </form>
        </div>
    );
};

type Props = {
    handleSubmit: (e: any) => Promise<void>;
    content: string;
    handleContentChange: (e: any) => void;
    email: string;
    handleEmailChange: (e: any) => void;
    lang: string;
}

export default Form;