import {TbChevronLeft, TbChevronLeftPipe, TbChevronRight, TbChevronRightPipe} from "react-icons/tb";

function Pagination({page, totalPages, previousPage, setPage, nextPage, totalItems, onLimitInput}) {

    return (
        <div className={"relative mb-5 w-[100%]"}>
            <div className={"relative -translate-x-1/2 left-1/2 items-center justify-center"}>
                <div className={"pagination flex flex-row items-center justify-center"}>
                    <TbChevronLeftPipe color={!previousPage ? "lightslategray" : "white"}
                                       className={"h-10 w-10"}
                                       disabled={!previousPage}
                                       onClick={() => page && setPage(1)}></TbChevronLeftPipe>

                    <TbChevronLeft color={!previousPage ? "lightslategray" : "white"}
                                   className={"h-10 w-10"}
                                   disabled={!previousPage}
                                   onClick={() => previousPage && setPage(previousPage)}>Previous</TbChevronLeft>

                    <h2 className={"font-semibold select-none"}>Page {page}/{totalPages}</h2>

                    <TbChevronRight color={!nextPage ? "lightslategray" : "white"}
                                    className={"h-10 w-10"}
                                    disabled={!nextPage}
                                    onClick={() => nextPage && setPage(nextPage)}>Next</TbChevronRight>

                    <TbChevronRightPipe color={!nextPage ? "lightslategray" : "white"}
                                        className={"h-10 w-10"}
                                        disabled={!nextPage}
                                        onClick={() => totalPages && setPage(totalPages)}></TbChevronRightPipe>
                </div>
            </div>
            <form className={"absolute top-1/2 -translate-y-1/2 right-[65%] flex flex-col mb-5 w-max"}>
                <label className={"font-semibold select-none"} htmlFor={"limit"}>Cats per page</label>
                <select onChange={(event) => onLimitInput(event)}
                        name={"limit"}
                        id={"limit"}
                        className={"rounded"}
                        defaultValue={"10"}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value={totalItems}>all</option>
                </select>
            </form>
        </div>
)
}


export default Pagination