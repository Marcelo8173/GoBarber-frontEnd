import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  
    > header{
        height: 144px ;
        background: #28262e;
        display: flex;
        align-items: center;

        div{
            width: 100%;
            margin: 0 auto;
            max-width: 1120px;
        }
    }

`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: -240px auto 0;

    form{
        margin:  50px 0;
        width: 340px;
        text-align:center;

        h1{
            margin-bottom:24px;
            font-size: 20px;
            text-align: left;
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
`;

export const AvaterInput = styled.div`
    margin-top: 150px;
    position:relative;
    
    img{
        width: 186px;
        height: 186px;
        border-radius: 50%;
    }

    label{
        position: absolute;
        width: 48px;
        height: 48px;
        background: #ff9000;
        border-radius: 50%;
        right: 0;
        bottom: 0;
        border:0;
        transition: all;
        transition-duration: 0.5s;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        input{
            display: none;
        }

        &:hover{
            background: ${shade(0.2, '#ff9000')}
        }
    }
`;
