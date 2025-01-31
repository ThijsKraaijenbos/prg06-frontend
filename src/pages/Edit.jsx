import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";

function Edit() {
    const navigate = useNavigate()

    const {id} = useParams()
    const [cat, setCat] = useState([])

    const [formData, setFormData] = useState({
        "name": '',
        "description": '',
        "displayTag": '',
        "imgUrl": ''
    })

    useEffect(() => {
        async function fetchCat() {
            try {
                const response = await fetch(`http://145.24.223.193:8080/silly-cats/${id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    }
                });
                const data = await response.json();
                setCat(data);

                setFormData({
                    "name": data.name,
                    "description": data.description,
                    "imgUrl": data.imgUrl
                })
            } catch (error) {
                console.error('Fout bij het ophalen van de kat:', error);
            }
        }

        fetchCat();
    }, []);

    async function editCat(formData) {
        try {
            const response = await fetch(`http://145.24.223.193:8080/silly-cats/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData['name'],
                    description: formData['description'],
                    displayTag: formData['displayTag'],
                    imgUrl: formData['imgUrl']
                })
            });

            if (response.ok) { // Check if the response status is OK (200-299)
                navigate('/');
            } else {
                alert(response.statusText)
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

    return (
        <>
            <form onSubmit={handleSubmit} className={"flex flex-col"}>
                <input type={"text"}
                       onChange={handleInputChange}
                       placeholder={"Name"}
                       name={"name"}
                       id={"name"}
                       value={formData.name ?? cat.name}
                />

                <input type={"text"}
                       onChange={handleInputChange}
                       placeholder={"Description"}
                       name={"description"}
                       id={"description"}
                       value={formData.description ?? cat.description}
                />

                <input type={"text"}
                       onChange={handleInputChange}
                       placeholder={"Display Tag (max 7 characters)"}
                       name={"displayTag"}
                       id={"displayTag"}
                       value={formData.displayTag ?? cat.displayTag}
                />

                <input type={"text"}
                       onChange={handleInputChange}
                       placeholder={"Image URL"}
                       name={"imgUrl"}
                       id={"imgUrl"}
                       value={formData.imgUrl ?? cat.imgUrl}

                />
                <input type={"submit"} value={`Update ${cat.name}`}/>
            </form>
        </>
    )
}

export default Edit