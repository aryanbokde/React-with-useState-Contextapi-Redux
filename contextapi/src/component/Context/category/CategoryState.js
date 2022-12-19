import React, { useState } from "react";
import CategoryContext from "./CategoryContext";
import axios from "axios";

const CategoryState = (props) => {
    const [cats, setCats] = useState([]);  
    
    const getAllCategory = async () => {
        try {            
            const res = await axios.get('/categories');
            const catsdata = await res.data;
            setCats(catsdata);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <CategoryContext.Provider value={{ cats, getAllCategory }}>
            {props.children}
        </CategoryContext.Provider>
    )

}

export default CategoryState;