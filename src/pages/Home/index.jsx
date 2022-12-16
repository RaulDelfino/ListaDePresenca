import React, { useState, useEffect } from 'react'

import './style.css'
import { Card } from '../../components/Card'

export function Home(){
    const [aluno, setAluno] = useState()
    const [estudantes, setEstudantes] = useState([])
    const [user, setUser] = useState({name: '', avatar: '' })


    function addEstudantes(){
        const novoEstudante = {
            nome: aluno,
            time: new Date().toLocaleTimeString('pt-br', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })
        }
        setEstudantes(prevState => [...prevState, novoEstudante])
    }


    useEffect(()=> {
        fetch('https://api.github.com/users/RaulDelfino')
        .then(response => response.json())
        .then(data => {
            setUser({
                name : data.name,
                avatar: data.avatar_url,
            }) 
        })
    }, []) // useEffect - é executado automaticamente quando a pagina é renderizada, ou toda vez que a dependencia "[]" for chamada
    
    
    return (
        <div className='container'>
            <header>
                <h1>Lista de Presença</h1>
                <div>
                    <strong>{user.name}</strong>
                    <img src={user.avatar} alt="Foto de perfil" />
                </div>
            </header>
            <input 
                type="text" 
                placeholder="Digite.."
                onChange= {e => setAluno(e.target.value)}/>

            <button type="button" onClick= {addEstudantes}>
                Adicionar
            </button>

            {
                estudantes.map(estudante => (
                    <Card 
                    key = {estudante.time}// a key precisa ter um valor unico, diferente dos outros
                    name ={estudante.nome} 
                    time={estudante.time} />
                ))
            }
            


        </div>

        
    )
}
