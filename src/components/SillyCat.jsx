import {Link} from "react-router";

function SillyCat({cat}) {

    return (
        <div className={"bg-zinc-700 border-2 rounded p-5"}>
            <img src={cat.imgUrl} alt={"image of"+cat.name}/>
        <p>{cat.name}</p>
            <Link to={'/details/' + cat.id} >Details</Link>
        </div>
    )
}

export default SillyCat