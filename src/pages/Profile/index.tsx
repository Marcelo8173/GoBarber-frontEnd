import React, {useCallback, useRef, ChangeEvent} from 'react';
import {FormHandles} from '@unform/core';
import {Container, Content, AvaterInput} from './styled';
import {useHistory, Link } from 'react-router-dom';
import {FiMail, FiUser, FiLock, FiCamera, FiArrowLeft} from 'react-icons/fi';
import { useToast } from '../../hooks/Toast';
import {Form} from '@unform/web';
import * as Yup from 'yup';
import Input from '../../components/input/input';
import Button from '../../components/button/index'
import getValidationErros from '../../utils/getValidationErros';
import api from '../../services/api';
import { useAuth } from '../../hooks/AuthContext';

interface ProfileFormData{
    name: string;
    email: string;
    password: string;
}

const Profile: React.FC = () => {
    
    const { user, updateUser} = useAuth();

    const formRef = useRef<FormHandles>(null);
    const {addToast } = useToast();
    const history = useHistory();

   const HandleSubmit = useCallback(async(data: ProfileFormData) => {
    formRef.current?.setErrors({});
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatorio'),
                email: Yup.string().email().required('Email obrigatorio'),
                password: Yup.string().min(6, 'No minimo 6 letras'),
            });

            await schema.validate(data,{
                abortEarly: false,
            });

            await api.post('/users', data);

            history.push('/');

            addToast({
                type: 'sucess',
                title: 'Cadastro realizado com sucesso',
                description: 'Você já pode fazer o Logon',
            })
        } catch (error) {
            // const erros = getValidationErros(error)
            // formRef.current?.setErrors(erros);
            if(error instanceof Yup.ValidationError){
                const erros = getValidationErros(error)
                formRef.current?.setErrors(erros);
            }
            //disparar um toast
            addToast({
             type: 'error',
             title: 'Erro no cadastro',
             description: 'Ocorreu um erro ao fazer Cadastro, tente novamente'
            });
        }
    },[addToast, history])

    const handleAvatarChange = useCallback((event: ChangeEvent<HTMLInputElement>)=>{
      
        if(event.target.files){
            const data = new FormData();

            data.append('avatar',event.target.files[0])
            
            api.patch('/users/avatar', data).then((response)=>{
                updateUser(response.data)
                addToast({
                    type: "sucess",
                    title: 'Avatar atualizado'
                })
            });
            
        };
    },[addToast,updateUser])

    return(
        <Container>
            <header>
                <div>
                    <Link to='/painel_de_controle'>
                        <FiArrowLeft size={30} color='#999591'/>
                    </Link>
                </div>
            </header>
            <Content>
                <AvaterInput>
                    <img src={user.avatar_url} alt={user.name}/>
                    <label htmlFor="avatar">
                        <FiCamera size={20} color='#312e38'/>
                        <input type="file" id="avatar" onChange={handleAvatarChange}/>
                    </label>

                </AvaterInput>

                <Form 
               
                ref={formRef}
                initialData={{
                    name: user.name,
                    email: user.email,
                }} 
                onSubmit={HandleSubmit}>        
                        
                    <h1>Meu perfil</h1>

                    <Input name="name" icon={FiUser} placeholder="Nome"/>
                    <Input name="email" icon={FiMail} placeholder="E-mail"/>
                    <Input 
                    containerStyle={{marginTop: '24px'}}
                    name="old_password" 
                    type="password" 
                    icon={FiLock} 
                    placeholder="Senha atual"
                    />
                        
                    <Input name="password" type="password" icon={FiLock} placeholder="Nova senha"/>
                    <Input name="password_confirmation" type="password" icon={FiLock} placeholder="Confirmar atual"/>

                    <Button type="submit">Confirmar mudanças</Button>

                </Form>
            </Content>
        </Container>
    )
}

export default Profile;