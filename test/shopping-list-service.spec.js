const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe(`Shopping list service object`, function () {
    let db
    let testItems = [
        {
            id: 1,
            name: 'First test item!',
            date_added: new Date('2029-01-22T16:28:32.615Z'),
            price: '12.00',
            checked: false,
            category: 'Main'
        },
        {
            id: 2,
            name: 'Second test item!',
            date_added: new Date('2100-05-22T16:28:32.615Z'),
            price: '21.00',
            checked: false,
            category: 'Snack'
        },
        {
            id: 3,
            name: 'Third test item!',
            date_added: new Date('1919-12-22T16:28:32.615Z'),
            price: '3.00',
            checked: false,
            category: 'Lunch'
        },
    ];

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.SHOPPING_LIST_TEST_DB_URL,
        })
    })

    before(() => db('shopping_list').truncate())

    afterEach(() => db('shopping_list').truncate())

    after(() => db.destroy())

    context(`Given 'shopping_list' has data`, () => {
        beforeEach(() => {
            return db
                .into('shopping_list')
                .insert(testItems)
        })

        it(`getAllItemss() resolves all items from 'shopping_list' table`, () => {
            // test that ShoppingListService.getAllItems gets data from table
            return ShoppingListService.getAllItems(db)
                .then(actual => {
                    expect(actual).to.eql(testItems)
                })
        })

        it(`getById() resolves an item by id from 'shopping_list' table`, () => {
            const thirdId = 3
            const thirdTestItem = testItems[thirdId - 1]
            return ShoppingListService.getById(db, thirdId)
                .then(actual => {
                    expect(actual).to.eql({
                        id: thirdId,
                        name: thirdTestItem.name,
                        date_added: thirdTestItem.date_added,
                        price: thirdTestItem.price,
                        checked: thirdTestItem.checked,
                        category: thirdTestItem.category,
                    })
                })
        })

        it(`deleteItem() removes an item by id from 'shopping_list' table`, () => {
            const itemId = 3
            return ShoppingListService.deleteItem(db, itemId)
                .then(() => ShoppingListService.getAllItems(db))
                .then(allItems => {
                    // copy the test items array without the "deleted" item
                    const expected = testItems.filter(item => item.id !== itemId)
                    expect(allItems).to.eql(expected)
                })
        })

        it(`updateItem() updates an item from the 'shopping_list' table`, () => {
            const idOfItemToUpdate = 3
            const newItemData = {
                name: 'Updated name',
                date_added: new Date(),
                price: '25.00',
                checked: true,
                category: 'Breakfast'
            }
            return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
                .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
                .then(item => {
                    expect(item).to.eql({
                        id: idOfItemToUpdate,
                        ...newItemData,
                    })
                })
        })
    })

    context(`Given 'shopping_list' has no data`, () => {
        it(`getAllItems() resolves an empty array`, () => {
            return ShoppingListService.getAllItems(db)
                .then(actual => {
                    expect(actual).to.eql([])
                })
        })

        it(`insertItem() inserts a new item and resolves the new item with an 'id'`, () => {
            const newItem = {
                name: 'Test new name',
                date_added: new Date('2020-01-01T00:00:00.000Z'),
                price: '15.00',
                checked: false,
                category: 'Snack'
            }
            return ShoppingListService.insertItem(db, newItem)
                .then(actual => {
                    expect(actual).to.eql({
                        id: 1,
                        name: newItem.name,
                        date_added: newItem.date_added,
                        price: newItem.price,
                        checked: newItem.checked,
                        category: newItem.category,
                    })
                })
        })
    })
})