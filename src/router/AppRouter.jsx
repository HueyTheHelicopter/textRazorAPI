import { Routes, Route } from 'react-router-dom';
import {routes} from '.';
import LandingPage from '../pages/LandingPage';

const AppRouter = () => {

    return (
        <Routes>
            {routes.map(route => 
                <Route 
                    element={route.element}
                    path={route.path}
                    exact={route.exact}
                    key={route.path}
                />
            )}
            <Route path='*' element={<LandingPage/>}/>
        </Routes>
    );
};

export default AppRouter;