// app.js
// require packages used in the project
const express = require('express')
const app = express()
const port = 3000


// require handlebars in the project
const exphbs =  require('express-handlebars')
// require resturaunt json
const resturauntData = require('./restaurant.json').results

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set ('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
    res.render('index',{restaurant:resturauntData})
})
// app.get('/:params',(req,res)=>{
//     console.log("params:",req.params)
//     res.render('show',{show:resturauntData})
// })
// app.get('/:id',(req,res)=>{
//     console.log("id",req.params)
//     res.render('show',{show:resturauntData})
// })
// start and listen on the Express server
// search
// app.get('/search', (req, res) => {
//     const keyword = req.query.keyword
//     const restaurant = resturauntData.filter(resturants=>{
//         return resturants.name.includes(keyword)
//     })
//     console.log(keyword)
//     res.render('index', { restaurant,keyword })
//   })
app.get('/search', (req, res) => {
    if (!req.query.keywords) {
        return res.redirect('/')
    }

    const keywords = req.query.keywords
    const keyword = req.query.keywords.trim().toLowerCase()

    const filterRestaurantsData = resturauntData.filter(
        data =>
            data.name.toLowerCase().includes(keyword) ||
            data.category.toLowerCase().includes(keyword)
    )

    res.render('index', { restaurant: filterRestaurantsData, keywords })
})

app.get('/:id',(req,res)=>{
    // const restaurant = resturauntData.find(restaurant => restaurant.id.toString() === req.params.id);
    const restaurant = resturauntData.find(restaurant => restaurant.id.toString()=== req.params.id);
        res.render('show', { restaurant })
})



app.listen(port, () =>{
    console.log(`Express is listening on http://localhost:${port}`)
})
// res.render('index', { restaurant: restaurantData.results })
// restaurant存著restaurantData.results的變量，給模板使用