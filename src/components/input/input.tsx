import React, {InputHTMLAttributes, useEffect, useRef, useState, useCallback} from 'react';
import {Container, Error} from './styles';
import {IconBaseProps} from 'react-icons';
import {FiAlertCircle} from 'react-icons/fi';

import {useField} from '@unform/core';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
    containerStyle?: object;
    icon?: React.ComponentType<IconBaseProps>;
}



const Input: React.FC<InputProps> = ({name, containerStyle={}, icon: Icon, ...rest}) => {
    const InputRef  = useRef<HTMLInputElement>(null);
    const [isFocus, setIsFocus] = useState(false);
    const [isField, setIsfield] = useState(false);
    const {fieldName, defaultValue, error, registerField} = useField(name);

    const handleInputBlur = useCallback(() =>{
        setIsFocus(false);

        if(InputRef.current?.value){
            setIsfield(true)
        }else{
            setIsfield(false)
        }
    }, []);

    const handleInputFocus = useCallback(()=>{
        setIsFocus(true);
    }, []);
    
    useEffect(()=>{
        
        registerField({
            name: fieldName,
            ref: InputRef.current,
            path: 'value',
        
        })
    }, [fieldName, registerField]);

    return(
        <Container style={containerStyle} isErrored={!!error} isField={isField} isFoucosed={isFocus}>
            {Icon && <Icon size={20} />}
            <input
            onFocus={handleInputFocus}
            onBlur={handleInputBlur} 
            ref={InputRef} {...rest}
            defaultValue={defaultValue}
            />

            {error && <Error title={error}>
            <FiAlertCircle color='#c53030' size={20}/>
            </Error>}
            
        </Container>
    )
}

export default Input;