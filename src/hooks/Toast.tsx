import React, {createContext, useContext, useCallback, useState} from 'react';
import ToasContainer from '../components/toastContainer/index';
import {uuid} from 'uuidv4';

export interface ToastMessage{
    id: string;
    type?: 'sucess' | 'error' | 'info';
    title: string;
    description?: string;
}

interface ToastContextData{
    addToast(messages: Omit<ToastMessage, 'id'>): void;
    removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) =>{
    const [messages, setMessages ] = useState<ToastMessage[]>([]);

    const addToast = useCallback(( {title, description, type}: Omit<ToastMessage, 'id'> ) => {
        const id = uuid();

        const toast = {
            id,
            title,
            description,
            type
        };

        setMessages((oldMessage) => [...oldMessage, toast])

    }, [messages]);

    const removeToast = useCallback(( id: string ) => {
        setMessages(state => state.filter(message => message.id !== id))
    }, []);

    return(
        <ToastContext.Provider value={{addToast, removeToast}}>
            {children}
            <ToasContainer messages ={messages} />
        </ToastContext.Provider>
    );
};

function useToast (): ToastContextData {
    const context = useContext(ToastContext);

    if(!context){
        throw new Error ('UseToast must be used whitin a ToastProvider')
    };

    return context;
};



export {ToastProvider, useToast};