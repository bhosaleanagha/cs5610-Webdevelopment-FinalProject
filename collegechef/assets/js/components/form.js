import React from 'react';

const Form = (props) => ( 
    <form onSubmit={props.getRecipeWithIngredients}>
        <input text="text" name="ingredientName"/>
        <button> Search </button>
    </form>
)

export default Form;