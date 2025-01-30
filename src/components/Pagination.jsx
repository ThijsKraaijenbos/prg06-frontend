import {TbChevronLeft, TbChevronLeftPipe, TbChevronRight, TbChevronRightPipe} from "react-icons/tb";

function Pagination({page, totalPages, previousPage, setPage, nextPage, totalItems, limit, onLimitInput}) {

    return (
        <div className={"flex items-center justify-center"}>
            <div className={"pagination flex flex-row items-center justify-center"}>
                <TbChevronLeftPipe color={!previousPage ? "gray" : "white"}
                    className={"h-16 w-16"}
                    disabled={!previousPage}
                    onClick={() => page && setPage(1)}></TbChevronLeftPipe>

                <TbChevronLeft color={!previousPage ? "gray" : "white"}
                    className={"h-16 w-16"}
                    disabled={!previousPage}
                    onClick={() => previousPage && setPage(previousPage)}>Previous</TbChevronLeft>

                <h2>Page {page}/{totalPages}</h2>

                <TbChevronRight color={!nextPage ? "gray" : "white"}
                    className={"h-16 w-16"}
                    disabled={!nextPage}
                    onClick={() => nextPage && setPage(nextPage)}>Next</TbChevronRight>

                <TbChevronRightPipe color={!nextPage ? "gray" : "white"}
                    className={"h-16 w-16"}
                    disabled={!nextPage}
                    onClick={() => totalPages && setPage(totalPages)}></TbChevronRightPipe>
            </div>
            <form className={"flex flex-col mb-5 w-max"}>
                <label htmlFor={"limit"}>Cats per page</label>
                <select onChange={(event) => onLimitInput(event)} name={"limit"} id="limit">
                    <option value="5" >5</option>
                    <option value="10" >10</option>
                    <option value="25" >25</option>
                    <option value={totalItems}>all</option>
                </select>
            </form>
        </div>
    )
}


export default Pagination