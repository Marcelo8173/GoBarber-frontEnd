import styled, {keyframes} from 'styled-components';
import SingIn from '../../assets/sign-in-background.png';
import { shade } from 'polished';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;

`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 700px;

    
  
`;

const appearFromLeft = keyframes`
    from{
        opacity: 0;
        transform: translateX(-50px);
    }
    to{
        opacity: 1;
        transform: translateX(0px);
    }
`;

export const AnimationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    animation: ${appearFromLeft} 1s;

      form{
        margin:  50px 0;
        width: 340px;
        text-align:center;

        h1{
            margin-bottom:24px;
        }
        
       

        button{
            background: #ff9000;
            height: 56px;
            border-radius: 10px;
            border: 0;
            padding: 0 16px;
            color: #312e38;
            width: 100%;
            font-weight: 500;
            margin-top: 16px;
            transition: background 0.2s;

           &:hover{
             background: ${shade(0.2,'#ff9000')};
           }
        }

        a{
            color: #F4EDE8;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;

            &:hover{
            color: ${shade(0.2, '#F4EDE8')};
        }

    }
}
> a{
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    &:hover{
            color: ${shade(0.2, '#ff9000')};
        }
    svg{
        margin-right: 16px;
    }

}
`;

export const Background = styled.div`
    flex: 1;
    background: url(${SingIn}), no-repeat;
    background-size: cover;
`;