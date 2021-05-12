import express from 'express'
const app = express()

const PORT = process.env.PORT || 8000
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(PORT, error => {
    if (error) console.log(error)

    console.log(`Server is running at http://localhost:${PORT}`)

})