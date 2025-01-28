import {useEffect, useState} from "react";
import SillyCat from "../components/SillyCat.jsx";
import {useParams} from "react-router";

function SillyCats() {

    const {id} = useParams()
    const [cat, setCat] = useState([])

    useEffect(() => {
        async function fetchCat() {
            try {
                const response = await fetch(`http://145.24.223.193:8080/silly-cats/${id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    }
                });
                const data = await response.json();
                setCat(data);
            } catch (error) {
                console.error('Fout bij het ophalen van de katten:', error);
            }
        }

        fetchCat();
    }, []);



    return (
        <div>
            <h1>{cat.name}</h1>
            <p>{cat.description}</p>
        </div>
    )
}

export default SillyCats