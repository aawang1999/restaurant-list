const express = require('express')
const exphbs = require('express-handlebars')
const restaurants = require('./restaurant.json')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurants.results })
})

app.get('/search', (req, res) => {
  const input = restaurants.results.filter((results) => {
    const keyword = req.query.keyword.trim().toLowerCase()
    return results.name.toLowerCase().includes(keyword) || results.category.toLowerCase().includes(keyword)
  })
  if (input.length > 0) {
    res.render('index', { restaurants: input, keyword: req.query.keyword.trim() })
  } else {
    res.render('index', { keyword: req.query.keyword, noResults: `<h3>沒有 "${req.query.keyword}" 的搜尋結果</h3>` })
  }
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurants.results.find((restaurant) => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})