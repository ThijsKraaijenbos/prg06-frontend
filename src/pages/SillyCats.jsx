import {useEffect, useState} from "react";
import SillyCat from "../components/SillyCat.jsx";
import Pagination from "../components/Pagination.jsx";

function SillyCats() {
    const [loading, setLoading] = useState(true)

    const [searchFilter, setSearchFilter] = useState()
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



    // Update the limit of items to load once the limit is changed, Check <Pagination>
    // component for extra info
    function onLimitInput(event) {
        event.preventDefault()
        setLimit(event.target.value)

        let nameFilter = document.getElementById("nameFilter")
        let genderFilter = document.getElementById("genderFilter");
        let furColorFilter = document.getElementById("furColorFilter");
        nameFilter.value = ""
        genderFilter.value = "select"
        furColorFilter.value = ""

        setSearchFilter()

    }


    // Feature to go back to heighest page number if you switch the limit while you're on a page
    // number that doesn't exist anymore
    // (For example: Go to page 6 while limit is 5, then switch limit to 25, page would be 2/2 instead of 1/2)
    useEffect(() => {
        if (page > totalPages) {
            setPage(totalPages)
        }
    }, [totalPages]);


    //Very ugly filter code but it sorta works fine enough, tried making it better for like 3 hours but
    //didn't work :(
    const filter = (clear) => {
        let nameFilter = document.getElementById("nameFilter")
        let genderFilter = document.getElementById("genderFilter");
        let furColorFilter = document.getElementById("furColorFilter");

        if (clear === true) {
            nameFilter.value = ""
            genderFilter.value = "select"
            furColorFilter.value = ""

            setSearchFilter()
        } else {
            if (genderFilter.value !== "select") {
                console.log("FUR COLOR = " + furColorFilter.value)

                const filterValues = cats.filter(
                    cat => cat.name.toLowerCase().includes(nameFilter.value)
                        && cat.gender === genderFilter.value
                        && cat.furColor.toLowerCase().includes(furColorFilter.value))

                setSearchFilter(filterValues)
            } else {
                console.log("FUR COLOR = " + furColorFilter.value)

                const filterValues = cats.filter(
                    cat => cat.name.toLowerCase().includes(nameFilter.value)
                        && cat.furColor?.toLowerCase().includes(furColorFilter.value))

                setSearchFilter(filterValues)
            }
        }
    }

    return (
    loading ? (
        <div className={"flex justify-center items-center w-[100vw]"}>
            <p>Loading cats...</p>
        </div>
            ) : (
            <>
                <form className={"flex flex-col absolute left-5 gap-4 justify-start"}>
                    <div className={"flex flex-col w-[15rem]"}>
                        <label htmlFor={"nameFilter"}>Name</label>
                        <input className={"rounded-lg p-1"} type={"text"} id={"nameFilter"} name={"nameFilter"}
                               onChange={filter}/>
                    </div>
                    <div className={"flex flex-col w-[15rem]"}>
                        <label htmlFor={"furColorFilter"}>Fur Color</label>
                        <input className={"rounded-lg p-1"} type={"text"} id={"furColorFilter"} name={"furColorFilter"}
                               onChange={filter}/>
                    </div>
                    <div className={"flex flex-col w-[15rem]"}>
                        <label htmlFor={"genderFilter"}>Gender</label>
                        <select
                            onChange={filter}
                            name={"genderFilter"}
                            id={"genderFilter"}
                            className={"rounded-lg p-1"}
                            defaultValue={"select"}
                        >
                            <option disabled value={"select"}>Select Gender</option>
                            <option value={"male"}>Male</option>
                            <option value={"female"}>Female</option>
                            <option value={"unknown"}>Unknown</option>
                        </select>
                    </div>
                    <button onClick={(event) => {
                        event.preventDefault();
                        filter(true);
                    }}>Clear Filters
                    </button>
                </form>
                <div className={"flex justify-center items-center w-[100vw]"}>
                    <div className={"flex flex-col justify-center items-center w-max"}>
                        <h2>There are a total of {totalItems} cats </h2>

                        <Pagination page={page} totalPages={totalPages} previousPage={previousPage} setPage={setPage}
                                    nextPage={nextPage} onLimitInput={onLimitInput} totalItems={totalItems}
                                    limit={limit}
                        ></Pagination>

                        <div className={"grid custom-grid items-center justify-center gap-4 w-[60vw]"}>
                            {!searchFilter ?
                                cats.map((cat) =>
                                    <SillyCat preview={false} key={cat.id} cat={cat}/>
                                ) :
                                searchFilter.map((cat) =>
                                    <SillyCat preview={false} key={cat.id} cat={cat}/>
                                )

                            }
                        </div>
                    </div>
                </div>
            </>
        )
    )
}
    export default SillyCats