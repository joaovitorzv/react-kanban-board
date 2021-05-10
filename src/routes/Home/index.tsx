import React from 'react'
import { Link } from 'react-router-dom'

import Header from '../../common/components/Header'

import { ReactComponent as HomeIllustration } from '../../assets/home-illustration.svg';
import './styles.scss'
import '../../styles/_global.scss'

const Home: React.FC = () => {
  return (
    <div className='home-container'>
      <Header />
      <main>
        <section className='home-container__presentation'>
          <div className='home-container__about'>
            <h2>Taskei te ajuda a organizar e terminar suas tarefas.</h2>
            <p>Nunca foi tão facil ser produtivo, com uma interface simples mantenha o foco no trabalho e finalize todas suas tarefas sem dificuldades.</p>
          </div>
          <div className="home-container__illustration">
            <HomeIllustration />
          </div>
        </section>
        <div className='home-container__start'>
          <Link to='/tasks' className='link-button'>Comece agora!</Link>
        </div>
      </main>
    </div>
  )
}

export default Home