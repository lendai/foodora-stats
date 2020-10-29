const fs = require('fs')

if (!fs.existsSync('./mydata.json')) {
  console.log('Missing file: mydata.json')
  console.log(
    'Go to https://www.foodora.se/profile and download your data as json, then place the file in the same directory as this script'
  )
  process.exit()
}

const data = require('./mydata.json')
const { orders } = data

const numberOfOrders = orders.length
const restaurants = {}

// Get most popular restaurants
orders.map((order) => {
  const { restaurant_name } = order
  if (restaurants[restaurant_name]) {
    restaurants[restaurant_name]++
  } else {
    restaurants[restaurant_name] = 1
  }
})

const mostPopularRestaurants = Object.entries(restaurants)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10)

const totalOrderValue = orders.reduce((total, order) => {
  return total + order.cart.total
}, 0)

console.log('Numer of orders: ', numberOfOrders)
console.log('Total order value: ', totalOrderValue)
console.log('Oldest order: ', orders[0].created_at)
console.log('\nMost popular restaurants:')
mostPopularRestaurants.map((r) => console.log(`${r[0]}: ${r[1]} orders`))
