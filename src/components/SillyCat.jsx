import {Link} from "react-router";

function SillyCat({cat, preview}) {

    return (
        <div className={"pb-10 relative custom-shadow3 bg-gray-200 rounded-t-[3rem] rounded-b-xl " + (!preview ? "transition duration-300 ease-in-out hover:-translate-y-1.5" : "")}>
            <img className={"w-[16rem] z-1 h-[16rem] rounded-t-[2rem] custom-gradient object-cover " + (cat.imgUrl ? "visible" : "invisible")} src={cat.imgUrl} alt={cat ? `image of ${cat.name}` : ""}/>
            <div className={"absolute bottom-5 left-1/2 -translate-x-1/2 w-[100%]"}>
                <h2 className={"font-bold text-[#EEEEEE] text-3xl mt-[-2rem] custom-shadow break-words"}>{cat.name}</h2>
                <div className={"flex  justify-center items-center w-100 gap-0"}>
                    <div className={"bg-[#222831] w-[100%] custom-shadow2 z-10 h-0.5 mt-3 mb-3"}></div>
                    <div className={"bg-[#222831] w-[100%] custom-shadow2 z-5 flex justify-center align-center text-nowrap text-[#EEEEEE] text-xl font-bold pl-1 pr-1 rounded mt-3 mb-3 h-7"}>{cat.displayTag.toUpperCase()}</div>
                    <div className={"bg-[#222831] w-[100%] custom-shadow2 z-10 h-0.5 mt-3 mb-3"}></div>
                </div>
                <Link className={"text-lg text-[#76ABAE] hover:text-[#639496]"} to={'/details/' + cat.id} >Details</Link>
            </div>
        </div>
    )
}

export default SillyCat