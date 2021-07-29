const express = require('express')
const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'desafio2'
}
const mysql = require('mysql')
const connection = mysql.createConnection(config)

app.get('/:name', async  (req, res) => {
  const sql = `INSERT INTO people(name) values('João Lanari')`
  connection.query(sql, (err) => {
    if (err) res.status(500).send('Erro interno dos servidor')

    connection.query('SELECT * FROM people', (error, results, fields) => {
      if (error) res.status(500).send('Erro interno dos servidor')

      const data = results
      const body = `<h1>Full Cycle</h1>${data.map(peolpe => `${peolpe.name}</br>`)}`
      res.send(body.replace(/,/g, ''))
    })
  })
  
  connection.end()
})

app.listen(port, () => {
  console.log('Rodando na porta: ' + port)
})