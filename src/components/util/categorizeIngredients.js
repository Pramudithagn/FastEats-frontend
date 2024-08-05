export const categorizeIngredients = (ingredients) => {
    return ingredients.reduce((acc, ingredient) => {
        const { ingredientCategory } = ingredient;
        
        if(!acc[ingredientCategory.name]){
            acc[ingredientCategory.name] = [];
        }

        acc[ingredientCategory.name].push(ingredient)
        return acc;
    }, {})
}

