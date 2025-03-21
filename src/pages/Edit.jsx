import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {IoClose} from "react-icons/io5";
import SillyCat from "../components/SillyCat.jsx";

function Edit() {
    const navigate = useNavigate()

    const {id} = useParams()
    const [cat, setCat] = useState([])

    const [errors, setErrors] = useState([])

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        displayTag: '',
        imgUrl: '',
        furColor: '',
        birthDate: '',
        gender: '',
    })

    useEffect(() => {
        async function fetchCat() {
            try {
                const response = await fetch(`${import.meta.env.VITE_APP_URL}/silly-cats/${id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    }
                });
                const data = await response.json();
                setCat(data);

                if (data.birthDate) {
                    data.birthDate = new Date(data.birthDate).toISOString().split('T')[0]
                } else {
                    data.birthDate = ''
                }

                setFormData({
                    name: data.name,
                    description: data.description,
                    displayTag: data.displayTag,
                    imgUrl: data.imgUrl,
                    furColor: data.furColor,
                    birthDate: data.birthDate,
                    gender: data.gender,
                })
            } catch (error) {
                console.error('Fout bij het ophalen van de kat:', error);
            }
        }

        fetchCat();
    }, []);

    async function editCat(formData) {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_URL}/silly-cats/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData['name'],
                    description: formData['description'],
                    displayTag: formData['displayTag'],
                    imgUrl: formData['imgUrl'],
                    furColor: formData['furColor'],
                    birthDate: formData['birthDate'],
                    gender: formData['gender'],
                })
            });

            const data = await response.json();

            if (response.ok) { // Check if the response status is OK (200-299)
                navigate('/');
                // console.log(formData)
            } else {
                // alert()
                const errorArray = Object.values(data.errors)
                setErrors(errorArray)
                console.log(errors)
                // console.error('Server responded with an error:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Er is een fout opgetreden:', error);
        }
    }

    // Generieke handler voor het bijwerken van de state
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            await editCat(formData);

            console.log('Formulier verzonden:', JSON.stringify(formData));

        } catch(error) {
            console.log("error handling submit" + error)
        }
    };

    const closeErrorHandler = (event) => {
        const parent = event.target.closest("div")
        parent.classList.add("animation-custom2")

        parent.addEventListener('animationend', () => {
            parent.classList.remove("animation-custom2")
            setErrors({})
        });

    }

    return (
        <div className={"flex justify-center relative"}>
            {errors.length > 0 ?
                <div className={"animation-custom1 absolute bg-[#31363F] z-10 p-8 left-24 rounded-lg"}>
                    <IoClose className={"h-8 w-8 absolute right-0 top-0"} color={"salmon"}
                             onClick={(event) => closeErrorHandler(event)}></IoClose>

                    <ul className={"list-disc text-left"}>
                        {errors.map((error) =>
                            <li className={"list-disc text-xl"}>{error.message}</li>
                        )}
                    </ul>
                </div>
                : ""
            }
            <div className={"relative flex flex-row gap-16 justify-center items-center"}>
                <form onSubmit={handleSubmit} className={"flex flex-col gap-6 w-[20rem] relative"}>
                    <div className={"flex flex-col"}>
                        <label htmlFor={"name"} className={"text-2xl font-bold"}>Name <span
                            className={"text-red-800"}>*</span></label>
                        <input type={"text"}
                               onChange={handleInputChange}
                               placeholder={"Name"}
                               name={"name"}
                               id={"name"}
                               value={formData.name}
                               className={"rounded-lg p-1"}
                        />
                    </div>

                    <div className={"flex flex-col"}>
                        <label htmlFor={"description"} className={"text-2xl min-w-[20rem] font-bold"}>Description <span
                            className={"text-red-800"}>*</span></label>
                        <input type={"text"}
                               onChange={handleInputChange}
                               placeholder={"Description"}
                               name={"description"}
                               id={"description"}
                               value={formData.description}
                               className={"rounded-lg p-1"}
                        />
                    </div>


                    <div className={"relative flex flex-row w-max gap-5"}>
                        <div className={"flex flex-col"}>
                            <label htmlFor={"imgUrl"} className={"text-2xl min-w-[20rem] font-bold"}>Image URL <span
                                className={"text-red-800"}>*</span></label>
                            <input type={"text"}
                                   onChange={handleInputChange}
                                   placeholder={"Image URL"}
                                   name={"imgUrl"}
                                   id={"imgUrl"}
                                   value={formData.imgUrl}
                                   className={"rounded-lg p-1"}
                            />
                        </div>
                    </div>

                    <div className={"flex flex-col"}>
                        <label htmlFor={"displayTag"} className={"text-2xl min-w-[20rem] font-bold"}>Display Tag</label>
                        <input type={"text"}
                               onChange={handleInputChange}
                               placeholder={"Display Tag (max 7 characters)"}
                               name={"displayTag"}
                               id={"displayTag"}
                               value={formData.displayTag}
                               maxLength={7}
                               className={"rounded-lg p-1"}
                        />
                    </div>

                    <div className={"flex flex-row gap-[10%] "}>
                        <div className={"flex flex-col w-[45%]"}>
                            <label htmlFor={"furColor"} className={"text-2xl font-bold"}>Fur Color</label>
                            <input type={"text"}
                                   onChange={handleInputChange}
                                   placeholder={"Fur Color"}
                                   name={"furColor"}
                                   id={"furColor"}
                                   value={formData.furColor}
                                   className={"rounded-lg p-1"}
                            />
                        </div>

                        <div className={"flex flex-col w-[45%]"}>
                            <label htmlFor={"gender"} className={"text-2xl font-bold"}>Gender</label>
                            <select
                                onChange={handleInputChange}
                                name={"gender"}
                                id={"gender"}
                                className={"rounded-lg p-1"}
                                value={formData.gender ?? "unknown"}
                            >
                                <option value={"male"}>Male</option>
                                <option value={"female"}>Female</option>
                                <option value={"unknown"}>Unknown</option>
                            </select>
                        </div>
                    </div>

                    <div className={"flex flex-col min-w-[20rem]"}>
                        <label htmlFor={"birthDate"} className={"text-2xl font-bold"}>Birth Date</label>
                        <input type={"date"}
                               onChange={handleInputChange}
                               name={"birthDate"}
                               id={"birthDate"}
                               value={formData.birthDate ?? cat.birthDate}
                               className={"rounded-lg p-1"}
                        />
                    </div>


                    <input className={"font-bold text-2xl bg-[#76ABAE] hover:bg-[#639496] p-1 rounded"} type={"submit"} value={`Update ${cat.name}`}/>

                    <h3 className={"text-sm"}><span className={"text-red-800 absolute top-0 right-0"}>* Required</span>
                    </h3>
                </form>
                <div className={"flex flex-col"}>
                    <h2 className={"font-bold text-3xl"}>Preview</h2>
                    <SillyCat preview={true} cat={formData}></SillyCat>
                </div>
            </div>
        </div>
    )
}

export default Edit