import {Link} from "react-router";

function SillyCat({cat}) {

    return (
        <div className={"relative bg-gray-200 rounded-t-3xl rounded-b-xl pb-10"}>
            <img className={"w-[20rem] z-1 h-[20rem] rounded-t-3xl custom-gradient object-cover"} src={cat.imgUrl} alt={"image of "+cat.name}/>
        <div className={"absolute bottom-5 left-1/2 -translate-x-1/2 w-[100%]"}>
            <h2 className={"font-bold text-[#EEEEEE] text-4xl mt-[-2rem]"}>{cat.name}</h2>
            <div className={"flex justify-center items-center w-100 gap-0"}>
                <div className={"bg-[#EEEEEE] w-[100%] h-0.5 mt-3 mb-3"}></div>
                <div className={"bg-[#EEEEEE] w-[100%] flex justify-center align-center text-[#222831] text-3xl font-bold h-min p-1 rounded mt-3 mb-3"}>{cat.displayTag}</div>
                <div className={"bg-[#EEEEEE] w-[100%] h-0.5 mt-3 mb-3"}></div>
            </div>
            <Link to={'/details/' + cat.id} >Details</Link>
        </div>
        </div>
    )
}

export default SillyCat