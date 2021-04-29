import React from 'react'
import Ingredient from '../Ingredient/Ingredient'
import './Burger.css'
const Burger = (props) => {
    let ingredientArr= props.ingredients.map(item => {
            let amountArray =[...Array(item.amount).keys()]
            return amountArray.map(_ => {
                return <Ingredient type={item.type} key={Math.random()} />
            })
    })

    .reduce((arr, element) => {
        return arr.concat(element);
    }, []);

if (ingredientArr.length === 0) {
    ingredientArr = <p>Please add some ingredients!</p>;
}
    return (
        <div className="Burger">
            <Ingredient type="top" />
            {ingredientArr}
           <Ingredient type="bottom" />
           
        </div>
    )
}

export default Burger
