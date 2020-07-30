import getRandomColor from '../utils/getRandomColor';

const categoriesData = [

    {
        name: "Eating Out",
        icon: "fas fa-utensils",
        color: getRandomColor(),
        transactionType: "expense"
    },
    {
        name: "Apparel",
        icon: "fas fa-tshirt",
        color: getRandomColor(),
        transactionType: "expense"
    },
    {
        name: "Entertainment",
        icon: "fas fa-tablet-alt",
        color: getRandomColor(),
        transactionType: "expense"
    },
    {
        name: "Fuel",
        icon: "fas fa-gas-pump",
        color: getRandomColor(),
        transactionType: "expense"
    },
    {
        name: "Gifts",
        icon: "fas fa-gift",
        color: getRandomColor(),
        transactionType: "expense"
    },
    {
        name: "Holidays",
        icon: "fas fa-luggage-cart",
        color: getRandomColor(),
        transactionType: "expense"
    },
    {
        name: "Grocery",
        icon: "fas fa-shopping-basket",
        color: getRandomColor(),
        transactionType: "expense"
    },
    {
        name: "Transportation",
        icon: "fas fa-bus",
        color: getRandomColor(),
        transactionType: "expense"
    },
    {
        name: "Sports",
        icon: "directions_bike",
        color: getRandomColor(),
        transactionType: "expense"
    },
    {
        name: "Books",
        icon: "fas fa-book-open",
        color: getRandomColor(),
        transactionType: "expense"
    },
    {
        name: "Medical",
        icon: "fas fa-notes-medical",
        color: getRandomColor(),
        transactionType: "expense"
    },
    {
        name: "Utilities",
        icon: "fas fa-bolt",
        color: getRandomColor(),
        transactionType: "expense"
    },
    {
        name: "Movies",
        icon: 'fas fa-film',
        color: getRandomColor(),
        transactionType: "expense"
    },
    {
        name: "Work-related",
        icon: "fas fa-briefcase",
        color: getRandomColor(),
        transactionType: "expense"
    },
    {
        name: "Pets",
        icon: "fas fa-paw",
        color: getRandomColor(),
        transactionType: "expense"
    },
    {
        name: "Mobile",
        icon: "fas fa-mobile-alt",
        color: getRandomColor(),
        transactionType: "expense"
    },
    {
        name: "general expenses",
        icon: "fas fa-tags",
        color: getRandomColor(),
        transactionType: "expense"
    },
    {
        name: "Salary",
        icon: "fas fa-money-bill-wave",
        color: getRandomColor(),
        transactionType: "income"
    },
]


export const seedCategories = async (model) => {
    categoriesData.map(item => {
        model.categories.push(item)
    })
    await model.save()
}
