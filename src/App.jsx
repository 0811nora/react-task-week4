import axios from 'axios';
import { Outlet  } from 'react-router-dom';
import { Toaster } from "@pheralb/toast";


const token = document.cookie.split("; ").find((row) => row.startsWith("noraToken="))?.split("=")[1];
if (token) {axios.defaults.headers.common['Authorization'] = token}

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
