import getRandomColor from '../utils/getRandomColor';

const categoriesData = [

    {
        name: "Eating Out",
        icon: "fas fa-utensils",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Apparel",
        icon: "fas fa-tshirt",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Entertainment",
        icon: "fas fa-tablet-alt",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Fuel",
        icon: "fas fa-gas-pump",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Gifts",
        icon: "fas fa-gift",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Holidays",
        icon: "fas fa-luggage-cart",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Grocery",
        icon: "fas fa-shopping-basket",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Transportation",
        icon: "fas fa-bus",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Sports",
        icon: "fas fa-running",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Books",
        icon: "fas fa-book-open",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Medical",
        icon: "fas fa-notes-medical",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Utilities",
        icon: "fas fa-bolt",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Utilities",
        icon: "fas fa-tags",
        color: getRandomColor(),
        type: "expense"
    },
    {
        name: "Salary",
        icon: "fas fa-dollar-sign",
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
