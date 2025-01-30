import {useEffect, useState} from "react";
import SillyCat from "../components/SillyCat.jsx";
import Pagination from "../components/Pagination.jsx";

function SillyCats() {
    const [loading, setLoading] = useState(true)

    const [cats, setCats] = useState([])
    const [totalItems, setTotalItems] = useState()
    const [totalPages, setTotalPages] = useState()
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [previousPage, setPreviousPage] = useState(null)
    const [nextPage, setNextPage] = useState(null)

    useEffect(() => {
        async function fetchCats() {
            try {

                const response = await fetch(`http://145.24.223.193:8080/silly-cats?page=${page}&limit=${limit}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    }
                });
                const data = await response.json();
                setLoading(false);
                setCats(data.items);

                setTotalItems(data.pagination.totalItems);
                setTotalPages(data.pagination.totalPages);

                setPreviousPage(data.pagination._links?.previous?.page ?? null);
                setNextPage(data.pagination._links?.next?.page ?? null);

            } catch (error) {
                console.error('Fout bij het ophalen van de katten:', error);
            }
        }
        fetchCats();
    }, [limit, page]);



    function onLimitInput(event) {
        event.preventDefault()
        setLimit(event.target.value)
    }

    useEffect(() => {
        if (page > totalPages) {
            setPage(totalPages)
        }
    }, [totalPages]);


    return (
    <>
        {loading ? (
            <p>Loading cats...</p>
            ) : (
        <div>
            <h2>There are a total of {totalItems} cats </h2>

            <Pagination page={page} totalPages={totalPages} previousPage={previousPage} setPage={setPage} nextPage={nextPage} onLimitInput={onLimitInput} totalItems={totalItems} limit={limit}
            ></Pagination>

            <div className={"grid grid-cols-3 gap-4 max-w-max"}>
                {cats.map((cat) =>
                    <SillyCat key={cat.id} cat={cat}/>
                )}
            </div>

        </div>
        )}
    </>
    )
}

export default SillyCats