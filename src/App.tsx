// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { useRoutes } from 'react-router-dom'
import routes from './routes'
import Header from './components/Header'
import ScrollToTop from './components/ScrollTop';

function App() {
  
  const element = useRoutes(routes);
  
  return (
    <div className='flex flex-col gap-10 items-center justify-center'>
      <Header />
      <div>
        {element}
      </div>
      <ScrollToTop />
    </div>
  )
}

export default App
