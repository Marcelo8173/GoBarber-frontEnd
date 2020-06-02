import React, {ButtonHTMLAttributes} from 'react';
import {Container} from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?:boolean;
};

const Button: React.FC<ButtonProps> = ({children, loading, ...rest}) => {
    return(
        <Container>
            <button {...rest}>
                {loading ? 'Carregando...' : children }
              
            </button>
        </Container>
    )
}

export default Button;