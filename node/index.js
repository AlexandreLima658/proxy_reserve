const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

app.get('/', (req, res) =>{
    const connection = mysql.createConnection(config)
    const sql = 'INSERT INTO people(name) values ("Liana Chagas")'
    connection.query(sql)
    connection.query("SELECT * FROM people", (err, result) =>{
        if (err){
            throw err
        }
        const array = []
        for (let i=0; i < result.length; i ++){
            array.push(result[i].name)
        }
        const list =  array.join('<li></li>')
        res.send(`
            <h1>Full Cycle Rocks!</h1>
                <ul>
                    <li>${list}</li>
                </ul>
        `)
        connection.end()
    })
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})

