import React from 'react'

const Summary = (props) => {
    const IngredientSummary = props.ingredients.map(item => {
        return(
            <li key={item.type}>
                <span  style={{textTransform:"capitalize"}}>{item.type}</span>:
                <span>{item.amount}</span>
                </li>
        )
    })
    return (
        <div>
            <h1>{IngredientSummary}</h1>
        </div>
    )
}

export default Summary
