import { useState, useEffect } from "react";

export const useFetchOw = (key) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)

    const findCharacters = async () => {
        try {
            setLoading(true)
            if (key === false) {
                const response = await fetch(`https://overfast-api.tekrop.fr/heroes`);
                if (!response.ok) {
                    throw new Error('Error al obtener datos de los personajes');
                }
                const fullData = await response.json();
                setData(fullData);
            } else {
                const response = await fetch(`https://overfast-api.tekrop.fr/heroes/${key}`);
                if (!response.ok) {
                    throw new Error('Error al obtener datos del personaje');
                }
                const fullData = await response.json();
                setData(fullData);
            }
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        findCharacters();
    }, [key]);

    return { data, loading };
}
