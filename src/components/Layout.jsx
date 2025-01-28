import {Link, Outlet} from "react-router";

function Layout() {

    return (
        <div className={"w-[100vw]"}>
            <header className={"flex items-center mb-5 gap-16 p-6"}>
                <h2>Silly Cats 3.0</h2>
                <nav className={"flex"}>
                    <ul className={"flex gap-8"}>
                        <Link to={`/`}>Home</Link>
                        <Link to={`/create`}>Create</Link>
                    </ul>
                </nav>
            </header>
            <main className={"flex justify-center w-[100vw]"}>
                <div>
                <Outlet/>
                </div>
            </main>
        </div>
    )
}
export default Layout