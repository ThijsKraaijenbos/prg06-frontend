import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router";

function Details() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const {id} = useParams()
    const [cat, setCat] = useState([])

    useEffect(() => {
        async function fetchCat() {
            try {
                setLoading(true)
                const response = await fetch(`http://145.24.223.193:8080/silly-cats/${id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    }
                });
                const data = await response.json();
                setLoading(false)
                setCat(data);

            } catch (error) {
                console.error('Fout bij het ophalen van de kat:', error);
            }
        }

        fetchCat();
    }, []);

    const deleteHandler = async () => {
        await fetch(`http://145.24.223.193:8080/silly-cats/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
            }
        });

        navigate('/')
    }


    return (
        <>
        {loading ? (
            <p>Loading cat...</p>
        ) : (
            <div>
                <h1>{cat.name}</h1>
                <p>{cat.description}</p>
                <div className={"flex flex-col"}>
                    <Link to={'/edit/' + cat.id}>Edit</Link>
                    <button type={"submit"} onClick={deleteHandler}
                            className={"p-0 bg-transparent border-none text-[#d91a30] hover:text-[#bd172a]"}>Delete
                    </button>
                </div>
            </div>
        )}

            </>
    )

}
export default Details