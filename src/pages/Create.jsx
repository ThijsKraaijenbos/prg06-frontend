import {useState} from "react";
import {useNavigate} from "react-router";

function Create() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        displayTag: '',
        imgUrl: ''
    })

    async function createCat(formData) {
        try {
            const response = await fetch('http://145.24.223.193:8080/silly-cats', {
                method: 'POST',
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
                console.error('Server responded with an error:', response.status, response.statusText);
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

            await createCat(formData);

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
                       value={formData.name}
                />

                <input type={"text"}
                       onChange={handleInputChange}
                       placeholder={"Description"}
                       name={"description"}
                       id={"description"}
                       value={formData.description}
                />

                <input type={"text"}
                       onChange={handleInputChange}
                       placeholder={"Display Tag (max 5 characters)"}
                       name={"displayTag"}
                       id={"displayTag"}
                       value={formData.displayTag}
                />

                <input type={"text"}
                       onChange={handleInputChange}
                       placeholder={"Image URL"}
                       name={"imgUrl"}
                       id={"imgUrl"}
                       value={formData.imgUrl}

                />
                <input type={"submit"} value={"Create Cat"}/>
            </form>
        </>
    )
}

export default Create