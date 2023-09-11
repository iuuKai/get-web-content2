<!--
 * @Author: iuukai
 * @Date: 2023-09-11 23:28:25
 * @LastEditors: iuukai
 * @LastEditTime: 2023-09-11 23:28:40
 * @FilePath: \node\cheerio\README.md
 * @Description: 
 * @QQ/微信: 790331286
-->
# get-web-content2

express + axios + cheerio 根据网址获取网站 title、icon 等数据

可以部署到 Render、Vercel 等平台...

```bash
# npm
npm install

# node
node index.js
```

```js
axios({
    url: 'http://localhost:5555/',
    method: 'post',
    data: {
        url: 'https://www.baidu.com/'
    }
}).then(res => console.log(res.data))
```
