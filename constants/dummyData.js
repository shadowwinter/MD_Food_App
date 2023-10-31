import { IMAGES } from "./images.js"
import { ICONS } from "./icons.js"

const trendingRecipes = [
    {
        id: 1,
        name: "Fried Rice with Chicken Cutlet",
        image: IMAGES.rice,
        duration: "45 mins",
        serving: 1,
        isBookmarked: false,
        category: "Local",
    },
    {
        id: 2,
        name: "Wagyu Beef Steak",
        image: IMAGES.steak,
        duration: "1 hour",
        serving: 10,
        isBookmarked: false,
        category: "Western",
    },
    {
        id: 3,
        name: "Double Cheese Burger",
        image: IMAGES.burger,
        duration: "30 mins",
        serving: 1,
        isBookmarked: false,
        category: "Western",

    },
    {
        id: 4,
        name: "Carbonara",
        image: IMAGES.pasta,
        duration: "20 mins",
        serving: 10,
        isBookmarked: false,
        category: "Pasta",

    },

]

const categories = trendingRecipes

const ingredients = [
    {id:1, image:ICONS.Banana, name:'Banana'},
    {id:2, image:ICONS.Broccoli, name:'Broccoli'},
    {id:3, image:ICONS.Cheese, name:'Cheese'},
    {id:4, image:ICONS.Chicken, name:'Chicken'},
    {id:5, image:ICONS.Chilli, name:'Chilli'},
    {id:6, image:ICONS.Corn, name:'Corn'},
    {id:7, image:ICONS.Egg, name:'Egg'},
    {id:8, image:ICONS.Fish, name:'Fish'},
    {id:9, image:ICONS.Lemon, name:'Lemon'},
    {id:10, image:ICONS.Lobster, name:'Lobster'},
    {id:11, image:ICONS.Potatoes, name:'Potatoes'},
    {id:12, image:ICONS.Pumpkins, name:'Pumpkin'},
    {id:13, image:ICONS.Sausage, name:'Sausage'},
    {id:14, image:ICONS.Steak, name:'Steak'},
    {id:15, image:ICONS.Tomato, name:'Tomato'},
]

const mealtype = [
    {id:1, image:ICONS.appetizer, name:'Appetizers'},
    {id:2, image:ICONS.beverage, name:'Beverages'},
    {id:3, image:ICONS.bread, name:'Bread'},
    {id:4, image:ICONS.breakfast, name:'Breakfast'},
    {id:5, image:ICONS.dessert, name:'Dessert'},
    {id:6, image:ICONS.mains, name:'Mains'},
    {id:7, image:ICONS.marinade, name:'Marinade'},
    {id:8, image:ICONS.salad, name:'Salad'},
    {id:9, image:ICONS.sauce, name:'Sauce'},
    {id:11, image:ICONS.snack, name:'Snacks'},
    {id:12, image:ICONS.soups, name:'Soup'},
]


const dishtype = [
    {id:1, image:ICONS.cake, name:'Cake'},
    {id:2, image:ICONS.cocktail, name:'Cocktail'},
    {id:3, image:ICONS.cupcake, name:'Cupcake'},
    {id:4, image:ICONS.donut, name:'Donut'},
    {id:5, image:ICONS.noodles, name:'Noodles'},
    {id:6, image:ICONS.pastries, name:'Pastries'},
    {id:7, image:ICONS.pie, name:'Pie'},
    {id:8, image:ICONS.pizza, name:'Pizza'},
    {id:9, image:ICONS.roast, name:'Roast'},
    {id:10, image:ICONS.sandwich, name:'Sandwich'},
    {id:11, image:ICONS.seafood, name:'Seafood'},
    {id:12, image:ICONS.skewers, name:'Skewers'},
    {id:13, image:ICONS.soup, name:'Soup'},
    {id:14, image:ICONS.sushi, name:'Sushi'},
]

const intolerancetype = [
    {id:1, image:ICONS.dairy, name:'Dairy'},
    {id:2, image:ICONS.Egg, name:'Egg'},
    {id:3, image:ICONS.gluten, name:'Gluten'},
    {id:4, image:ICONS.grain, name:'Wheat'},
    {id:5, image:ICONS.nuts, name:'Nut'},
    {id:6, image:ICONS.Fish, name:'Seafood'},
    {id:7, image:ICONS.seafood, name:'Shellfish'},
]


const preptype = [
    {id:1, image:ICONS.airFryer, name:'Air Fryer'},
    {id:2, image:ICONS.bbq, name:'Barbecue'},
    {id:3, image:ICONS.grill, name:'Grill'},
    {id:4, image:ICONS.kettle, name:'Fast Meals'},
    {id:5, image:ICONS.microwave, name:'Microwave'},
    {id:6, image:ICONS.oven, name:'Oven'},
    {id:7, image:ICONS.panFry, name:'Pan Fry'},
    {id:8, image:ICONS.pot, name:'Boil'},
    {id:9, image:ICONS.stew, name:'Stew'},
    {id:10, image:ICONS.stirFry, name:'Stir Fry'},
]

export const DUMMYDATA = {
    trendingRecipes,
    categories,
    ingredients,
    mealtype,
    dishtype,
    intolerancetype,
    preptype,
}