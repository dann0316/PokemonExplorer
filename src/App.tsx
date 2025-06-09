// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { useRoutes } from 'react-router-dom'
import routes from './routes'
import Breadcrumb from './components/Breadcrumb';

function App() {
  
  const element = useRoutes(routes);
  
  return (
    <div className='flex flex-col gap-10 items-center justify-center'>
      <Breadcrumb />
      <div>
        {element}
      </div>
    </div>
  )
}

export default App
