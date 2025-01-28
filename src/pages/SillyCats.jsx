import {useEffect, useState} from "react";
import SillyCat from "../components/SillyCat.jsx";
import {Link, useParams, useSearchParams} from "react-router";
import {flushSync} from "react-dom";
import error from "eslint-plugin-react/lib/util/error.js";

function SillyCats() {

    const [cats, setCats] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [previousPage, setPreviousPage] = useState(null)
    const [nextPage, setNextPage] = useState(2)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState([])

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
                setCats(data.items);
                setTotalItems(data.pagination.totalItems)
                setTotalPages(data.pagination.totalPages)

                const prev = data.pagination._links.previous.page
                const next = data.pagination._links.next.page
                if (prev !== null) {
                    setPreviousPage(prev)
                }
                if (next !== null) {
                    setNextPage(next)
                }

            } catch (error) {
                console.error('Fout bij het ophalen van de katten:', error);
            }
        }
        console.log(limit)
        fetchCats();
    }, [limit, page]);


    function onLimitInput(event) {
        event.preventDefault()
        setLimit(event.target.limit.value)
        setPage(1)
    }


    return (
        <div>
            <h2>There are a total of {totalItems} cats </h2>
            <form onSubmit={onLimitInput} className={"flex flex-col mb-5 w-[50%]"}>
                <label htmlFor={"limit"}>Amount of items to load per page</label>
                <input type={"number"} name={"limit"} max={totalItems}/>
                <input type={"submit"} value={"Submit"} name={"Submit"}/>
            </form>

            <div className={"grid grid-cols-3 gap-4 max-w-max"}>
                {cats.map((cat) =>
                    <SillyCat key={cat.id} cat={cat}/>
                )}
            </div>
            <div className={"pagination"}>
                <button onClick={() => setPage(previousPage)}>Previous</button>
                <button onClick={() => setPage(nextPage)}>Next</button>
            </div>
        </div>
    )
}

export default SillyCats