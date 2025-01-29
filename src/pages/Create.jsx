import {useEffect, useState} from "react";
import {useNavigate} from "react-router";

function Create() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        description: '',
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
                    imgUrl: formData['imgUrl']
                })
            });
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
            navigate('/')

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