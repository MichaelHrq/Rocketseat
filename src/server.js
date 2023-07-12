import http from 'node:http'
// "type": "module" -> package.json

const users = []

const server = http.createServer((req,res)=>{
  const {method, url} = res
  return res.end('Hello')
})

server.listen(3333)