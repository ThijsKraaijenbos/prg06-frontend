import {Link, Outlet} from "react-router";

function Layout() {

    return (
        <div className={"w-[100vw]"}>
            <header className={"flex items-center mb-5 gap-16 p-6"}>
                <h2>Silly Cats 3.0</h2>
                <nav className={"flex"}>
                    <ul className={"flex gap-8"}>
                        <Link className={"text-[#76ABAE] hover:text-[#639496]"} to={`/`}>Home</Link>
                        <Link className={"text-[#76ABAE] hover:text-[#639496]"} to={`/create`}>Create</Link>
                    </ul>
                </nav>
            </header>
            <main>
                <div>
                <Outlet/>
                </div>
            </main>
        </div>
    )
}
export default Layout