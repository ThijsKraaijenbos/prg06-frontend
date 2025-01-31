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
        if (confirm(`Are you sure you want to delete ${cat.name}?`) === true) {
            await fetch(`http://145.24.223.193:8080/silly-cats/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                }
            });

            navigate('/')
        }
    }


    return (
        <div className={"flex justify-center w-[100vw]"}>
            {loading ? (
                <p>Loading cat...</p>
            ) : (
                <div className={"flex flex-row gap-32"}>
                    <div className={"flex flex-col gap-8"}>
                        <h1 className={"font-bold"}>{cat.name}</h1>
                        <div className={"flex flex-col text-left gap-1"}>
                            <h2 className={"text-4xl font-semibold"}>Description</h2>
                            <p>{cat.description}</p>
                        </div>
                        <div className={"flex flex-col text-left gap-1"}>
                            <h2 className={"text-4xl font-semibold"}>Display Tag</h2>
                            <p>{cat.displayTag}</p>
                        </div>
                        <div className={"flex flex-col text-left gap-1"}>
                            <h2 className={"text-4xl font-semibold"}>Fur Color</h2>
                            <p>{cat.furColor}</p>
                        </div>
                        <div className={"flex flex-col text-left gap-1"}>
                            <h2 className={"text-4xl font-semibold"}>Gender</h2>
                            <p>{cat.gender}</p>
                        </div>
                        <div className={"flex flex-col text-left gap-1"}>
                            <h2 className={"text-4xl font-semibold"}>Birth Date</h2>
                            <p>{cat.birthDate
                                ? new Date(cat.birthDate).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                                : "Unknown Birth Date"
                            }</p>
                        </div>
                        <div className={"flex flex-col"}>
                            <Link to={'/edit/' + cat.id}>Edit</Link>
                            <button type={"submit"} onClick={deleteHandler}
                                    className={"p-0 focus:outline-none bg-transparent border-none text-[#d91a30] hover:text-[#bd172a]"}>Delete
                            </button>
                        </div>
                    </div>
                    <img className={"w-[28rem] z-1 h-[28rem] rounded-xl object-cover"} src={cat.imgUrl}
                         alt={"image of " + cat.name}/>
                </div>
            )
            }

        </div>
    )

}

export default Details