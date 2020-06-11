import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User{
    id: string;
    name: string;
    email:string;
    avatar_url: string;

}

interface AuthState{
    token: string;
    user: User;
}

interface singInCredentias{
    email: string;
    password: string;
}

interface AuthContextData{
    user: User;
    singIn(credentias: singInCredentias): Promise<void>;
    singOut(): void;
    updateUser(user: User): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const Authprovider: React.FC = ({children}) => {
   // salvando os dados do login em um estado
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@goBarber: token');
        const user = localStorage.getItem('@goBarber: user');

        if(token && user){
            api.defaults.headers.authorization = `Bearer ${token}`;

            return{ token, user: JSON.parse(user)};
        };


        return {} as AuthState;
    });

const singIn = useCallback( async ({email, password}) =>{

        const response = await api.post('sessions',{
            email,
            password,
        });

        const {token, user} = response.data;

        localStorage.setItem('@goBarber: token', token);
        localStorage.setItem('@goBarber: user', JSON.stringify(user));

        api.defaults.headers.authorization = `Bearer ${token}`;

        setData({token, user});
    }, []);

const singOut = useCallback(() => {

    localStorage.removeItem('@goBarber: token');
    localStorage.removeItem('@goBarber: user');
    
    setData({} as AuthState);
}, []);

    const updateUser = useCallback((user: User)=>{
        
        localStorage.setItem('@goBarber: user', JSON.stringify(user));
        setData({
            token: data.token,
            user,
        })
    },[setData, data.token])

    return(
        <AuthContext.Provider value = {{user: data.user, singIn, singOut, updateUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(): AuthContextData{
    const context = useContext(AuthContext);

    if(!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}