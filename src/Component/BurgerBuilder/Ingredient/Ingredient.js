import React from 'react'
import bottom from '../../../assets/images/bottom.png'
import cheese from '../../../assets/images/cheese.png'
import meat from '../../../assets/images/meat.png'
import salad from '../../../assets/images/salad.png'
import top from '../../../assets/images/top.png'
import './Ingredient.css'
const Ingredient = (props) => {
    let Ingredient =null;
    switch(props.type){
        case "bottom":
            Ingredient =<div><img src={bottom} alt=""/></div>
            break;

            case "cheese":
            Ingredient =<div><img src={cheese} alt=""/></div>
            break;

            case "meat":
            Ingredient =<div><img src={meat} alt=""/></div>
            break;

            case "top":
            Ingredient =<div><img src={top} alt=""/></div>
            break;


            case "salad":
            Ingredient =<div><img src={salad} alt=""/></div>
            break;


            default:
                Ingredient= null;
    }
    return (
        <div className="Ingredient">
            {Ingredient}
        </div>
    )
}

export default Ingredient
