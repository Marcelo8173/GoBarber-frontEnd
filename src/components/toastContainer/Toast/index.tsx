import React, {useEffect} from 'react';
import { Container } from './styles';
import { FiAlertCircle, FiInfo, FiCheckCircle ,FiXCircle } from 'react-icons/fi';
import { ToastMessage, useToast } from '../../../hooks/Toast';

interface ToastProps {
    message: ToastMessage;
    style: object;
}

const icons ={
    info: <FiInfo size={22}/>,
    error: <FiAlertCircle size={22}/>,
    sucess: <FiCheckCircle size={22}/>,
}

const Toast: React.FC<ToastProps> = ({message, style}) => {
    const {removeToast} = useToast(); 

    useEffect(() =>{
        const time = setTimeout(() => {
            removeToast(message.id);
        }, 3000);

        return () =>{ //um retorno dentro do useEffect sempre é executado automaticamente
            clearTimeout(time);
        }

    }, [message.id, removeToast]);

    return(
        <Container style={style} type={message.type} hasDescription={Number(!!message.description)}>
           {icons[message.type || 'info']}
                 <div>
                     <strong>{message.title}</strong>
                     {message.description && <p>{message.description}</p>}
                 </div>
 
                 <button onClick={() => removeToast(message.id)} type="button">
                     <FiXCircle size={18} />
                 </button>
        </Container>
    );
}

export default Toast;