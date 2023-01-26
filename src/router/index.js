import LandingPage from "../pages/LandingPage";
import ResultPage from "../pages/ResultPage";

export const routes = [
    {path: '/landing', element: <LandingPage/>, exact: false},
    {path: '/result', element: <ResultPage/>, exact: false}
]