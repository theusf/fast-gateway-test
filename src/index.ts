const express = require('express')
import gateway = require('fast-gateway')

import { Request, Response } from 'express';

const app  = express()

gateway({
  server: app,

  routes: [{
    prefix: '/users',
    target: 'http://localhost:3000/',
    hooks: {
      async onRequest (req: Request, res: Response) {
        console.log(req.path)
      }
    }
  },
  {
    prefix: '/admin',
    target: 'http://localhost:3001',
    hooks: {
      async onRequest (req: Request, res: Response) {
        console.log(req.path)
      }
    }
  },
  {
    prefix: '/',
    target: 'http://localhost:3000/',
    hooks: {
      async onRequest (req: Request, res: Response) {
        console.log(req.path)
      }
    }
  }
]
})

const port = 8080;

app.listen(port, () => {
  console.log(`API Gateway escutando na porta ${port}`)
})


const user_service = require('restana')()
user_service.get('/get', (req, res) => res.send('Serviço de usuário!!'))

user_service.start(3000)


const admin_service = require('restana')()
admin_service.get('/get', (req, res) => res.send('Serviço de ADMIN'))

admin_service.start(3001)

