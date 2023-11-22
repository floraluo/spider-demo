
const https = require('https');
const http = require('http');
const fs = require('fs');
const fsPro = require('fs').promises;
const xiaoshu = [
    {
        "id": "1537359452488105985",
        "libraryName": "Busy chinese new year",
        "libraryPhoto": "https://oss-test.qu-in.ltd/pictureManagement/pictureList/1655370069815/%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_16553699087125_1655370070038.png"
    },
    {
        "id": "1537359452500688898",
        "libraryName": "Toes,Ears&Nose",
        "libraryPhoto": "https://oss-test.qu-in.ltd/pictureManagement/pictureList/1655370090807/%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_16553699302982_1655370091008.png"
    },
    {
        "id": "1537359452513271809",
        "libraryName": "How Does Baby Feel?",
        "libraryPhoto": "https://oss-test.qu-in.ltd/pictureManagement/pictureList/1655370098214/%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_16553699566355_1655370098383.png"
    },
    {
        "id": "1554336992798572551",
        "seriesPhoto": "https://oss.qu-in.ltd/pictureExtension/seriesMangement%E5%8E%9F%E5%A3%B0%E8%A7%A6%E6%91%B8%E5%8F%91%E5%A3%B0%E4%B9%A6_1663138284514.jpg",
        "seriesName": "听，什么声音",
        "seriesNumber": 6
    },
    {
        "id": "1554336992798572550",
        "seriesPhoto": "https://oss.qu-in.ltd/pictureExtension/seriesMangement%E5%B0%8F%E9%B8%A1%E7%90%83%E7%90%83_1663138150257.jpg",
        "seriesName": "小鸡球球",
        "seriesNumber": 14
    },
    {
        "id": 12,
        "seriesPhoto": "https://oss.qu-in.ltd/pictureExtension/seriesMangementjollybaby_1663206690357.jpg",
        "seriesName": "Jollybaby布书",
        "seriesNumber": 11
    }
]
let counter = 0;

getContent();
function getContent() {
    const item = xiaoshu[counter];
    if (!item) return;
    if (!item.libraryName){
        counter++
        getContent();
        return;
    }

    // 1569581111488196609 小黄豆妈妈
    // 1569581628352278530 十一爸爸讲英文绘本
    // 1569581453374304257 book mom
    // 1569581112536772609 西瓜妈妈说
    // 1569581080920109058 吉祥
    const options = {
        hostname: 'api.qu-in.ltd',
        port: 443,
        path: `/pictureBook/v1/contentDetails?authorId=1569581393102155777&bookId=${item.id}`,
        methods: 'get',
        headers: {
            "Authorization": "BearereyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDA0MDI0MTg4MTc5MDcwOTc2IiwiZXhwIjoxNjc1MTY1NTM0LCJpYXQiOjE2NzUxNTgzMzR9.Lsru87SiKBuHhQvGPxESZe8QYSjq1HVvl7mgovWjsTwLTnDPFz4IQ8mhzGWUaP6_VNqkiPCwM4mBTRs5hoke4Q",
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Accept-Encoding": "gzip",
            "versionName": "mrin",
            "Accept": "*/*",
            "versionCode": "4.16.2",
            "lang": "zh-cn",
            "ua": "22042B6D-81E0-4BC9-BF56-A2734113B026",
            "User-Agent": "QPrinter/1 CFNetwork/1390 Darwin/22.0.0",
            "device": "iOS",
            "Connection": "keep-alive",
            "systemType": "iOS 16.0.2"
        },
        key: fs.readFileSync("/Users/flora/Downloads/privatekey.pem"),
        cert: fs.readFileSync("/Users/flora/Downloads/certificate.pem"),
        rejectUnauthorized: false,
    }
    const req = https.request(options, (res) => {
        console.log(`状态码: ${res.statusCode}`);
        console.log(`响应头: ${JSON.stringify(res.headers)}`);
        const chunks = []
        res.on('data', (chunk) => {
            chunks.push(chunk)
            // chunkStr = chunk
            console.log(`响应主体: ${chunk}`);
        })
        res.on("end", async() => {
            try {
                const contents = JSON.parse(Buffer.from(Buffer.concat(chunks)).toString()).data.contents;
                const txts = [];
                contents.forEach(page => {
                    txts.push(page.pageDisplay);
                    txts.push(page.contentEnglish);
                    txts.push('\n');
                })
                await fsPro.writeFile(`/Users/flora/Downloads/经典单本带读文稿/${item.libraryName}(Mandy是曼曼啊).txt`, txts.join('\n'), {
                        encoding: 'utf8'
                    })
                    // .then(() => {
                    //     counter++;
                    //     console.log(`${item.libraryName}: Done`);
                    //     setTimeout(() => {
                    //         getContent();
                    //     }, 2000)
                        
                    // });
                counter++;
                console.log(`${counter}===${item.libraryName}: Done`);
                getContent();
                // setTimeout(() => {
                // }, 2000)
            } catch (e) {
                console.log(e);
            }
            console.log(item.libraryName + ': 结束')
        })
    })
    req.on("error", (e) => {
        console.log(`${item.libraryName}==>获取数据失败: ${e.message}`)
    })
    req.end()
}
