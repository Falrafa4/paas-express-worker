import { httpServerHandler } from 'cloudflare:node';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
	res.json({
		message: 'Hello Express on Cloudflare Worker',
	});
});

app.get('/api/status', (req, res) => {
	res.json({
		status: 'ok',
		subject: 'PaaS',
		week: 5,
		platform: 'Cloudflare Workers',
	});
});

app.get('/api/info', (req, res) => {
	res.json({
		framework: 'Express',
		runtime: 'Cloudflare Workers',
		course: 'Platform as a Service',
	});
});

app.get('/api/log-test', (req, res) => {
	console.log('Endpoint /api/log-test dipanggil');

	res.json({
		logged: true,
	});
});

app.get('/api/time', (req, res) => {
	const now = new Date();
	
	const formatter = new Intl.DateTimeFormat('id-ID', {
		timeZone: 'Asia/Jakarta',
		dateStyle: 'full',
		timeStyle: 'medium'
	})

	const timeFormatter = new Intl.DateTimeFormat('id-ID', {
		timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
	})

	res.json({
		formatted: formatter.format(now),
		timeOnly: timeFormatter.format(now),
		timestamp: now.toISOString()
	})
})

app.listen(3000);

export default httpServerHandler({ port: 3000 });
