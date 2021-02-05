const express = require('express')
const cors = require('cors')
const app = express()
const mysql = require('mysql')


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: '',
    database: "node_react"
})

app.use(cors())
app.use(express.json())


app.get('/api/get', (req, res) => {
    const sqlInsert = "SELECT * FROM movie_reviews"
    db.query(sqlInsert,(err, result) => {
        res.send(result)
    })
})

app.post('/api/insert', (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const sqlInsert = "INSERT INTO movie_reviews(movieName,movieReview) values (?,?)"
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        res.send("success")
    })
})

app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM movie_reviews WHERE id=?"
    db.query(sql, [id], (err, result) => {
        console.log("success")
    })
})

app.listen(3001, () => {
    console.log('running')
})

