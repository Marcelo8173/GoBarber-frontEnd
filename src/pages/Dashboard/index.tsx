import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {isToday,format, getDate } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import {Container,Header,HeaderContent,Profile,Content,Schedule,Calendar,NextAppointments,Section,Appointments} from './styles';
import logoImg from '../../assets/logo.svg';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { FiPower, FiClock } from 'react-icons/fi';
import { useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';

interface mouthAvailability{
    day: number;
    available: boolean;
}

interface Appointments{
    id:string;
    date: string;
    user:{
        name: string;
        avatar_url: string;
    }
}

const Dashboard: React.FC = () =>{
    const { singOut, user } = useAuth();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [mouthAvailability, setMouthAvailability] = useState<mouthAvailability[]>([]);
    const [currentMouth, setCurrentMouth] = useState(new Date());
    const [appointments, setAppointments] = useState<Appointments[]>([]);

    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers)=>{
        if(modifiers.available){
            setSelectedDate(day);
        }
    },[]);

    const handleMouthChange = useCallback((mouth:Date)=>{
        setCurrentMouth(mouth);
    }, []);
    
    //useEffects
    useEffect(()=>{
        api.get(`/providers/${user.id}/month-availability`,{
            params: {
                year: currentMouth.getFullYear(),
                mouth: currentMouth.getMonth()+1,
            }
        }).then(response =>{
            setMouthAvailability(response.data)
        })
    },[currentMouth,user.id]);

    useEffect(()=>{
        
        api.get('/appoitments/me',{
            params:{
                year: selectedDate.getFullYear(),
                mouth: selectedDate.getMonth()+1,
                day:  selectedDate.getDate()
            }
        }).then(response =>{
            setAppointments(response.data);
            console.log(response.data);
        });

    },[selectedDate]);

    const disabledDays = useMemo(()=>{
        const dates = mouthAvailability.filter(mouthDay => mouthDay.available === false)
        .map(mouthDay => {
            const year = currentMouth.getFullYear();
            const mouth = currentMouth.getMonth();

            return new Date(year, mouth, mouthDay.day);
        });

        return dates;
    },[currentMouth, mouthAvailability])

    const selectedDateAsText = useMemo(()=>{
        return format(selectedDate, "'Dia' dd 'de' MMMM",{
            locale: ptBR,
        });
    },[selectedDate]);

    const selectedWeekDay = useMemo(()=>{
        return format(selectedDate, 'cccc',{
            locale: ptBR
        })
    }, [selectedDate])

    
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
                        {isToday(selectedDate) && <span>Hoje</span>}    
                        <span>{selectedDateAsText}</span>
                        <span>{selectedWeekDay}</span>
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
                <Calendar>
                    <DayPicker 
                        weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                        fromMonth={new Date()}
                        onDayClick={handleDateChange}
                        selectedDays={selectedDate}
                        onMonthChange={handleMouthChange}
                        disabledDays={[
                            {daysOfWeek:[0,6]}, ...disabledDays
                        ]}
                        modifiers={{
                            available: {daysOfWeek: [1,2,3,4,5]}
                        }}
                        months ={[
                            'Janeiro',
                            'Fevereiro',
                            'Março',
                            'Abril',
                            'Maio',
                            'Junho',
                            'Julho',
                            'Agosto',
                            'Setembro',
                            'Outubro',
                            'Novembro',
                            'Dezembro'
                        ]}

                    />
                </Calendar>
            </Content>
        </Container>
    );
};


export default Dashboard;