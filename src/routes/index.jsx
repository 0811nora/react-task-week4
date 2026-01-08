import App from '../App.jsx';
import { createHashRouter } from "react-router-dom";
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';




const routes = [
    {
        path: '/',
        element: <App/>,
        children:[
        {
            index: true,
            element: <Home/> 
        },
        {
            path: 'login',
            element: <Login/> 
        }
        ]
    },
]


const router = createHashRouter(routes);

export default router;