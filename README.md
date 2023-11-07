# 怎样扒数据技术分享

## 需求背景

给小朋友买书籍大多有配音频。但是各个出版社都有自己播放音频的地方（h5网页、小程序、各自的app）。想要给熏听某个音频，找不到位置。作为技术出身，岂能被这个给难住。。。

绘本太贵，文字太少。学会给小朋友读绘本也是一个能力。找到有带读绘本的资源，每次给读绘本就打开app不方便，而且也没有全部展示一本书的文稿。又来一个需求

## 技术分析

1.需要抓包工具抓到h5页面、小程序和移动端app的数据请求；

2.分析请求，找到自己想要的数据；

3.请求这个接口，拿到对应数据，写代码处理；

### 抓包工具

网络抓包原理及常用抓包工具

抓包工具的原理就是监控客户端与服务器之间交互的网络节点，监控其中任意一个网络节点，获取所有经过此网络节点的数据，然后对这些数据按照网络协议进行解析。

我们一般常用的抓包工具监控的网络节点就是我们本机的网卡。

当然，这个网络节点也可以是路由器，或者是中间的其他网络跳点。这些层面的数据监控不是我们凡人能轻易操作的。
![image](https://github.com/floraluo/spider-demo/assets/11729393/8ba77e01-d693-4d3b-b67a-a91ff0b40129)

![image](https://github.com/floraluo/spider-demo/assets/11729393/0f0c67c1-c4ce-42b9-9a05-9632c9232fc9)

### 为什么抓包需要安装证书

HTTPS中间人攻击原理 https://zhuanlan.zhihu.com/p/412540663?utm_id=0

了解这个问题之前，需要了解一下https的实现原理


### https的实现原理

 HTTPS 协议之所以是安全的是因为 HTTPS 协议会对传输的数据进行加密，而加密过程是使用了非对称加密实现。但其实：HTTPS 在内容传输的加密上使用的是对称加密，非对称加密只作用在证书验证阶段。

HTTPS的整体过程分为证书验证和数据传输阶段，具体的交互过程如下：
![image](https://github.com/floraluo/spider-demo/assets/11729393/286df557-c3a1-41ea-8b3a-b8a68bbe1f40)

![image](https://github.com/floraluo/spider-demo/assets/11729393/b98dc7e9-c78e-46b0-ae3a-9cd46e85cca1)


### 对称加密&非对称加密

对称加密：对称加密中用到的密钥叫做私钥，客户端和服务器用一个密钥加密和解密，效率高。代码层面看就是encrypt decrypt方法。常用的对称加密算法：DES、3DES、DESX、Blowfish、IDEA、RC4、RC5、RC6、AES。由于对称加密的算法是公开的，所以一旦私钥被泄露，那么密文就很容易被破解，所以对称加密的缺点是密钥安全管理困难。
![image](https://github.com/floraluo/spider-demo/assets/11729393/1ab4c6c8-f371-49ab-ab51-dfdb80b49c7c)

非对称加密：非对称加密使用一对密钥，即公钥和私钥，且二者成对出现。私钥被自己保存，不能对外泄露。公钥指的是公共的密钥，任何人都可以获得该密钥。用公钥或私钥中的任何一个进行加密，用另一个进行解密。将公钥公布于众，客户端拿公钥加密，服务器拿自己的私钥解密，这样即使数据被截获，别人也解密不出明文内容，效率低，耗时。

被公钥加密过的密文只能被私钥解密，过程如下：

明文 + 加密算法 + 公钥 => 密文， 密文 + 解密算法 + 私钥 => 明文
![image](https://github.com/floraluo/spider-demo/assets/11729393/c54c2423-22d4-4034-898a-3ce904689f85)

#### 什么是证书？

内置在系统中的叫根证书。服务端下发的叫数字证书。

数字证书就是互联网中的CA(Certificate Authority，证书授权)机构给网站颁发的一个盖上自己签名的“身份证”。这个签名就叫数字签名（CA对申请者的信息打包并进行hash计算，得到一个hash值HASH1，再用自己的私钥加密就生成了数字签名）

网站申请数字证书就需要向CA机构提交自己的信息资料，

1）颁发机构信息；

2）公钥；

3）公司信息；

4）域名；

5）有效期；

6）指纹；

7）......

比如百度的：
![image](https://github.com/floraluo/spider-demo/assets/11729393/18fc56ce-5049-4157-84c4-4f7a160bcd14)

浏览器和操作系统内置了各大CA机构的证书。收到网站下发的数字证书之后，同样对网站的数字证书里的信息打包进行hash计算得到值HASH2，再用CA机构的证书公钥解密得到签名时的hash值HASH1进行比对来验证网站证书的合法性。  浏览器如何验证HTTPS证书的合法性？

总结：所以，为什么需要安装抓包工具的证书呢？抓包工具需要客户端和服务器都信任自己。所以我们需要手动的安装抓包工具的证书，让它被信任。这样才能抓取到数据。
![image](https://github.com/floraluo/spider-demo/assets/11729393/4deca2fe-a79c-4467-96f5-456906379b68)

问题：

开启了抓包工具，浏览器访问网站时，是显示网站的证书，还是抓包工具的？

浏览器解密的公钥是从哪里来的？

//2. 提前内置在浏览器或者系统中的证书

浏览器如何验证证书的真伪？

//拿到证书后，用证书颁发者的公钥解密证书的数字签名得到证书信息的hash值。然后再对证书的信息进行hash计算。对比两个hash值

不信任证书颁发者会发生什么情况？

// 其他问题也能导致同样的情况发生：第一是客户端问题（浏览器、计算机、操作系统），第二是网站上的证书存在实际问题（过期、错误的域），不受组织信任。

5. https用的是对称加密还剩非对称加密？

### 代码示例

```
function getList() { 
  https.get(
    `https://api.xxx/list?page=1&per_page=40`,
    {
      headers: {
        "X-HB-Client-Type": 'xxx',
        "authorization": 	'xxx'
      }
    }, (res) => {
    let chunks = []
    res.on('data', (chunk)=> {
      chunks.push(chunk);
    })
    res.on('end', () => {
      books = JSON.parse(Buffer.from(Buffer.concat(chunks)).toString()).books;
      getAudioInfo()
    })
  })
}

function getAudioInfo() {
  if (!books) return;
  const book = books[counter];
  https.get(`https://api.xxx/12393?isbn=${book.isbn}`,
  {
    headers: {
      "X-HB-Client-Type": 'xxx',
      "authorization": 	'xxx'
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
          const dir = '/Users/mac/Downloads/7-9阶故事拓展-共40册'
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
          }
          fs.promises
          .writeFile(`${dir}/${resource_name}.mp3`, Buffer.concat(audioChunks)).then(() => {
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
```
## 讨论：说说你知道的防爬虫方案！

温馨提示：爬虫爬得欢，监狱要坐穿；数据玩的溜，牢饭吃个够
