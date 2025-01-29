import {TbChevronLeft, TbChevronLeftPipe, TbChevronRight, TbChevronRightPipe} from "react-icons/tb";

function Pagination({page, totalPages, previousPage, setPage, nextPage, onLimitInput, totalItems}) {

    return (
    <>
        <form onSubmit={onLimitInput} className={"flex flex-col mb-5 w-[50%]"}>
            <label htmlFor={"limit"}>Amount of items to load per page</label>
            <input type={"number"} name={"limit"} min={1} max={totalItems}/>
            <input type={"submit"} value={"Submit"} name={"Submit"}/>
        </form>

        <div className={"pagination flex flex-row items-center justify-center"}>
            <TbChevronLeftPipe
                className={"h-16 w-16"}
                disabled={!previousPage}
                onClick={() => page && setPage(1)}></TbChevronLeftPipe>

            <TbChevronLeft
                className={"h-16 w-16"}
                disabled={!previousPage}
                onClick={() => previousPage && setPage(previousPage)}>Previous</TbChevronLeft>

            <h2>Page {page}</h2>

            <TbChevronRight
                className={"h-16 w-16"}
                disabled={!nextPage}
                onClick={() => nextPage && setPage(nextPage)}>Next</TbChevronRight>

            <TbChevronRightPipe
                className={"h-16 w-16"}
                disabled={!nextPage}
                onClick={() => totalPages && setPage(totalPages)}></TbChevronRightPipe>
        </div>
    </>
    )
}

export default Pagination