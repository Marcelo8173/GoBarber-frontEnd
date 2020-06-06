import React, { useState } from 'react';
import {Container,Header,HeaderContent,Profile,Content,Schedule,Calendar,NextAppointments,Section,Appointments} from './styles';
import logoImg from '../../assets/logo.svg';
import { FiPower, FiClock } from 'react-icons/fi';
import { useAuth } from '../../hooks/AuthContext';

const Dashboard: React.FC = () =>{
    const [selectedDate, setSelectedDate] = useState(new Date());

    const { singOut, user } = useAuth();
    
    return(
        <Container>
            <Header>
                <HeaderContent>
                    <img src={logoImg} alt="GoBarber"/>

                    <Profile>
                        <img src={user.avatar_url} alt=""/>

                        <div>
                            <span>Bem vindo</span>
                            <strong>{user.name}</strong>
                        </div>
                    </Profile>

                    <button onClick={singOut} >
                        <FiPower/>
                    </button>
                </HeaderContent>
            </Header>

            <Content>
                <Schedule>
                    <h1>Horarios agendados</h1>
                    <p>
                        <span>Hoje</span>
                        <span>dia 06</span>
                        <span>Segunda-feira</span>
                    </p>

                    <NextAppointments>
                        <strong>Atendimento a seguir</strong>
                        <div>
                            <img src="https://avatars3.githubusercontent.com/u/50594445?s=460&u=16dac43ef18932d9fe3d30b7e19f76bb9c0d170c&v=4" alt=""/>
                            <strong>Marcelo andré</strong>
                            <span>
                                <FiClock />
                                08:00
                            </span>
                        </div>
                    </NextAppointments>
                    
                    <Section>
                        <strong>Manhã</strong>

                        <Appointments>
                            <span>
                                <FiClock/>
                                08:00
                            </span>

                            <div>
                                <img src={user.avatar_url} alt=""/>
                                <strong>Marcelo andré</strong>
                            </div>
                        </Appointments>
                    </Section>

                    <Section>
                        <strong>Tarde</strong>

                        <Appointments>
                            <span>
                                <FiClock/>
                                08:00
                            </span>

                            <div>
                                <img src={user.avatar_url} alt=""/>
                                <strong>Marcelo andré</strong>
                            </div>
                        </Appointments>
                    </Section>
                </Schedule>
                <Calendar/>
            </Content>
        </Container>
    );
};


export default Dashboard;