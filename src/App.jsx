import { Outlet  } from 'react-router-dom';
import { Toaster } from "@pheralb/toast";



function App() {


  return (
    <>
      <div className='App'>        
        <Toaster />
        <div className="all-bg"></div>
        <div className="all-bg-blur"></div>
        <Outlet/>
      </div>
    </>
  )
}

export default App
