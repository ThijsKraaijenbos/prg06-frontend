import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import SillyCats from "./pages/SillyCats.jsx";
import Details from "./pages/Details.jsx";
import Layout from "./components/Layout.jsx";

function App() {

    // const onCreateProduct = (setChessSpots, chessSpots, data) => {
    //     setChessSpots([...chessSpots, data])
    // }

    const router = createBrowserRouter([
        {
            element: <Layout/>,
            children: [
                {
                    path: '/',
                    element: <SillyCats/>,
                },
                {
                    path: '/details/:id',
                    element: <Details/>,
                },
            ]
        }
    ]);

    return (
        <RouterProvider router={router}/>
    )
}

export default App
