// Streams -> ideia de carregar aos poucos

// process.stdin
//   .pipe(process.stdout)

// Parte teorica, os modulos internos do node ja possuem

import {Readable, Writable, Transform} from 'node:stream'

class One2Hundred extends Readable {
  index = 1
  _read(){
    const i = this.index++
    setTimeout(()=>{
      if(i>100) {
        this.push(null)
      } else {
        const buff = Buffer.from(String(i))
        this.push(buff)
      }
    },1000)
  }
}

class MultiplyByTen extends Writable {
  _write(chunk, encoding, callback){
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

class InverseNumber extends Transform {
  _transform(chunk,encoding,callback){
    const transformed = Number(chunk.toString()) * -1
    callback(null, Buffer.from(String(transformed)))
  }
}

new One2Hundred()
  .pipe( new InverseNumber() )
  .pipe( new MultiplyByTen() )