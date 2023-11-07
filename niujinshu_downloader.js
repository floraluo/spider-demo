const list = [
  {
    "isbn_id": "43648",
    "bookname": "The Broken Roof Level 7",
    "isbn": "9781408590355",
    "book_img_thumb": "https://oss.xiaobien.com/book_image/cover/202011/9781408590355.png?x-oss-process=image/resize,m_pad,h_240,w_240,color_FFFFFF/format,jpg"
  },
  {
    "isbn_id": "43647",
    "bookname": "Lost in the Jungle Level 7",
    "isbn": "9781408590362",
    "book_img_thumb": "https://oss.xiaobien.com/book_image/cover/202011/9781408590362.png?x-oss-process=image/resize,m_pad,h_240,w_240,color_FFFFFF/format,jpg"
  },
  {
    "isbn_id": "43646",
    "bookname": "Red Planet Level 7",
    "isbn": "9781408590379",
    "book_img_thumb": "https://oss.xiaobien.com/book_image/cover/202011/9781408590379.png?x-oss-process=image/resize,m_pad,h_240,w_240,color_FFFFFF/format,jpg"
  },
  {
    "isbn_id": "43651",
    "bookname": "Submarine Adventure Level 7",
    "isbn": "9781408590386",
    "book_img_thumb": "https://oss.xiaobien.com/book_image/cover/202011/9781408590386.png?x-oss-process=image/resize,m_pad,h_240,w_240,color_FFFFFF/format,jpg"
  },
  {
    "isbn_id": "43650",
    "bookname": "The Willow Pattern Plot Level 7",
    "isbn": "9781408590393",
    "book_img_thumb": "https://oss.xiaobien.com/book_image/cover/202011/9781408590393.png?x-oss-process=image/resize,m_pad,h_240,w_240,color_FFFFFF/format,jpg"
  },
  {
    "isbn_id": "43654",
    "bookname": "The Hunt for Gold Level 7",
    "isbn": "9781408590409",
    "book_img_thumb": "https://oss.xiaobien.com/book_image/cover/202011/9781408590409.png?x-oss-process=image/resize,m_pad,h_240,w_240,color_FFFFFF/format,jpg"
  },
  {
    "isbn_id": "43656",
    "bookname": "The Jigsaw Puzzle Level 7",
    "isbn": "9781408590416",
    "book_img_thumb": "https://oss.xiaobien.com/book_image/cover/202011/9781408590416.png?x-oss-process=image/resize,m_pad,h_240,w_240,color_FFFFFF/format,jpg"
  },
  {
    "isbn_id": "43652",
    "bookname": "The Motorway Level 7",
    "isbn": "9781408590423",
    "book_img_thumb": "https://oss.xiaobien.com/book_image/cover/202011/9781408590423.png?x-oss-process=image/resize,m_pad,h_240,w_240,color_FFFFFF/format,jpg"
  },
  {
    "isbn_id": "43655",
    "bookname": "Roman Adventure Level 7",
    "isbn": "9781408590430",
    "book_img_thumb": "https://oss.xiaobien.com/book_image/cover/202011/9781408590430.png?x-oss-process=image/resize,m_pad,h_240,w_240,color_FFFFFF/format,jpg"
  },
  {
    "isbn_id": "43653",
    "bookname": "The Bully Level 7",
    "isbn": "9781408590447",
    "book_img_thumb": "https://oss.xiaobien.com/book_image/cover/202011/9781408590447.png?x-oss-process=image/resize,m_pad,h_240,w_240,color_FFFFFF/format,jpg"
  },
  {
    "isbn_id": "43658",
    "bookname": "Australian Adventure Level 7",
    "isbn": "9781408590454",
    "book_img_thumb": "https://oss.xiaobien.com/book_image/cover/202011/9781408590454.png?x-oss-process=image/resize,m_pad,h_240,w_240,color_FFFFFF/format,jpg"
  },
  {
    "isbn_id": "43662",
    "bookname": "The Big Breakfast Level 7",
    "isbn": "9781408590461",
    "book_img_thumb": "https://oss.xiaobien.com/book_image/cover/202011/9781408590461.png?x-oss-process=image/resize,m_pad,h_240,w_240,color_FFFFFF/format,jpg"
  },
  {
    "isbn_id": "43657",
    "bookname": "The Power Cut Level 7",
    "isbn": "9781408590478",
    "book_img_thumb": "https://oss.xiaobien.com/book_image/cover/202011/9781408590478.png?x-oss-process=image/resize,m_pad,h_240,w_240,color_FFFFFF/format,jpg"
  },
  {
    "isbn_id": "43659",
    "bookname": "The Riddle Stone Part 1 Level 7",
    "isbn": "9781408590485",
    "book_img_thumb": "https://oss.xiaobien.com/book_image/cover/202011/9781408590485.png?x-oss-process=image/resize,m_pad,h_240,w_240,color_FFFFFF/format,jpg"
  },
  {
    "isbn_id": "43660",
    "bookname": "The Riddle Stone Part 2 Level 7",
    "isbn": "9781408590492",
    "book_img_thumb": "https://oss.xiaobien.com/book_image/cover/202011/9781408590492.png?x-oss-process=image/resize,m_pad,h_240,w_240,color_FFFFFF/format,jpg"
  }
]
let books;
// https://api.baobaobooks.com/bookshelf/v1/goods/12393/isbn/list?page=1&per_page=15
// https://api.baobaobooks.com/bookshelf/v1/books/audios/12393?isbn=9781408590355
// https://v.baobaobooks.net/audio/resources/201711/151062583914024.mp3
const https = require('https');
const fs = require('fs');

let counter = 0;
function getAudioInfo() {
  console.log('books222 :>> ', books);
  if (!books) return;
  const book = books[counter];
  https.get(`https://api.baobaobooks.com/bookshelf/v1/books/audios/12393?isbn=${book.isbn}`,
  {
    headers: {
      "X-HB-Client-Type": 'audio-miniprogram',
      "authorization": 	'HBAPI MzI3NTQyNTpicmhqcWN0anBhNDQydjB2MWoxa2liZWVjNA=='
    }
  },   (res) => {
    const chunks = []
    res.on('data', (chunk) => {
      chunks.push(chunk)
    })
    res.on('end', () => {
      const audioInfo = JSON.parse(Buffer.from(Buffer.concat(chunks)).toString())[0];
      const { resource_name, audio_url } = audioInfo || {};
      https.get(audio_url, (res) => {
        const audioChunks = []
        res.on('data', (chunk) => {
          audioChunks.push(chunk)
        })
        res.on('end', () => {
          console.log('audioChunks :>> ', audioChunks);
          const dir = '/Users/mac/Downloads/7-9阶故事拓展-共40册'
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
          }
        //   fs.writeFile(`${dir}/${resource_name}.mp3`, Buffer.concat(audioChunks)), function(err) {
        //     if (err) {
        //         return console.error(err);
        //     }
        //     console.log(`done :>> ${resource_name}`);
        //     counter++
        //     setTimeout(() => {
        //       getAudioInfo();
        //     }, 300)
        //  })
          fs.promises.writeFile(`${dir}/${resource_name}.mp3`, Buffer.concat(audioChunks)).then(() => {
            console.log(`done :>> ${resource_name}`);
            counter++
            setTimeout(() => {
              getAudioInfo();
            }, 300)
          })
        })
      })

    })
  })
}
function getList() { 
  https.get(
    `https://api.baobaobooks.com/bookshelf/v1/goods/12393/isbn/list?page=1&per_page=40`,
    {
      headers: {
        "X-HB-Client-Type": 'audio-miniprogram',
        "authorization": 	'HBAPI MzI3NTQyNTpicmhqcWN0anBhNDQydjB2MWoxa2liZWVjNA=='
      }
    }, (res) => {
    let chunks = []
    res.on('data', (chunk)=> {
      chunks.push(chunk);
    })
    res.on('end', () => {
      books = JSON.parse(Buffer.from(Buffer.concat(chunks)).toString()).books;
      // console.log('books :>> ', books);
      getAudioInfo()
    })
  })
}

getList()
