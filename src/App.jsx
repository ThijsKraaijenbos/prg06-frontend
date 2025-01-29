import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import SillyCats from "./pages/SillyCats.jsx";
import Details from "./pages/Details.jsx";
import Layout from "./components/Layout.jsx";
import Create from "./pages/Create.jsx";

function App() {

    // const onCreateCat = (cats, setCats, data) => {
    //     setCats ([...cats, data])
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
                {
                    path: '/create',
                    element: <Create/>,
                },
            ]
        }
    ]);

    return (
        <RouterProvider router={router}/>
    )
}

export default App
