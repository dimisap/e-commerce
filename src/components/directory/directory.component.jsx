import React from "react";
import './directory.styles.scss'
import CategoryItem from "../category-item/category-item.component";

const Directory = (props) => {



    return(
        <div className="categories-container">    
            
            {props.categories.map((category) => {
            return(           
                <CategoryItem
                    key={category.id}
                    category={category}            
                />
            )
            })}
        </div>
    )

}

export default Directory