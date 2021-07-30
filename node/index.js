const express = require('express')
const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'desafio2'
}
const mysql = require('mysql2')
const connection = mysql.createConnection(config)

function saveNameAndSendResponse(res, name) {
  const sql = `INSERT INTO people(name) values('${name}')`
  connection.query(sql, (error) => {
    if (error) throw new Error(error.message)

    connection.query('SELECT * FROM people', (error, results, fields) => {
      if (error) {
        console.log(error)
        throw new Error(error.message)
      }

      const data = results
      const body = `<h1>Full Cycle</h1>${data.map(peolpe => `${peolpe.name}</br>`)}`
      res.send(body.replace(/,/g, ''))
    })
  })
}

app.get('/', async (req, res) => {
  try {
    const name = 'João Lanari'
    saveNameAndSendResponse(res, name)
  } catch (error) {
    console.log(error)
    res.send('Erro Interno do Servidor')
  }
})

app.get('/:name', async (req, res) => {
  try {
    const name = req.params.name || 'João Lanari'
    saveNameAndSendResponse(res, name)
  } catch (error) {
    console.log(error)
    res.send('Erro Interno do Servidor')
  }
})

app.listen(port, () => {
  console.log('Rodando na porta: ' + port)
})