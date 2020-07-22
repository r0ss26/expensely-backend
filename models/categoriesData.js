import getRandomColor from '../utils/getRandomColor';

const categoriesData = [

    {
        name: "Eating Out",
        icon: "restaurant_menu",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Apparel",
        icon: "style",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Entertainment",
        icon: "library_music",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Fuel",
        icon: "local_gas_station",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Gifts",
        icon: "card_giftcard",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Holidays",
        icon: "flight_takeoff",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Grocery",
        icon: "add_shopping_cart",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Transportation",
        icon: "subway",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Sports",
        icon: "directions_bike",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Books",
        icon: "local_library",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Medical",
        icon: "local_pharmacy",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Utilities",
        icon: "flash_on",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Movies",
        icon: "local_movies",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Work-related",
        icon: "work",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Pets",
        icon: "pets",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Mobile",
        icon: "phone_iphone",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "general expenses",
        icon: "loyalty",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Salary",
        icon: "monetization_on",
        color: getRandomColor(),
        type: "income"
    },
]


export const seedCategories = (model) => {
    categoriesData.map(item => {
        model.categories.push(item)
    })
    model.save()
}
