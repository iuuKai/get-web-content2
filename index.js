/*
 * @Author: iuukai
 * @Date: 2023-09-11 16:50:33
 * @LastEditors: iuukai
 * @LastEditTime: 2023-09-11 22:53:53
 * @FilePath: \node\cheerio\index.js
 * @Description:
 * @QQ/微信: 790331286
 */
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()
const port = Number(process.env.PORT || '5555')
const host = process.env.HOST || ''

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
	res.set({
		'Access-Control-Allow-Credentials': true,
		'Access-Control-Allow-Origin': req.headers.origin || '*',
		'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
		'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
		'Content-Type': 'application/json; charset=utf-8'
	})
	req.method === 'OPTIONS' ? res.status(204).end() : next()
})

app.post('/', async (req, res, next) => {
	const { url } = Object.assign({}, req.query, req.body, req.files)

	try {
		const { data } = await axios.get(url, {
			withCredentials: true,
			headers: {
				'User-Agent': req.headers['user-agent']
			}
		})

		const $ = cheerio.load(data)
		const title = $('title').text() || ''
		const icon = $('link[rel~="icon"]').attr('href') || ''
		const description = $('meta[name="description"]').attr('content') || ''
		res.send({ code: 200, data: { url, title, icon, description }, msg: null })
	} catch (error) {
		res.send({
			code: 500,
			data: null,
			msg: error.message
		})
	}
})

app.listen(port, function () {
	console.log(`app is listening at port ${port}`)
	console.log(`server running @ http://${host ? host : 'localhost'}:${port}`)
})
