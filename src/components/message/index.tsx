import { Style } from '@hooks/useMessage';

import messageStyles from './message.module.css';

const Message = ({ message, style }: Props): JSX.Element => {
    return (
        <div className={messageStyles.Message} style={style}>
            {message}
        </div>
    );
};

type Props = {
    message: string;
    style: Style;
}

export default Message;