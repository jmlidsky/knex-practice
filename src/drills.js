require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
})


// Get all items that contain text
function searchByItemName(searchTerm) {
    knexInstance
        .select('*')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
        })
}

searchByItemName('burger')


// Get all items paginated
function paginateItems(pageNumber) {
    const itemsPerPage = 6
    const offset = itemsPerPage * (pageNumber - 1)
    knexInstance
        .select('*')
        .from('shopping_list')
        .limit(itemsPerPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
}

paginateItems(2)


// Get all items added after date
function itemsAddedAfterDate(daysAgo) {
    knexInstance
        .select('*')
        .from('shopping_list')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days':: INTERVAL`, daysAgo)
        )
        .then(result => {
            console.log(result)
        })
}

itemsAddedAfterDate(5)


// Get the total cost for each category
function costPerCategory() {
    knexInstance
        .select('category')
        .from('shopping_list')
        .sum('price')
        .groupBy('category')
        .then(result => {
            console.log(result)
        })
}

costPerCategory()