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

app.get('/hello/:name', (req, res) => {
	const name = req.params.name;

	res.json({
		success: true,
		message: `Hello, ${name}. Welcome to Express!`
	})
})

app.get('/home', (req, res) => {
	res.send(`
		<!doctype html>
		<html lang="id">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>PaaS Express Deployment</title>
				<style>
					* {
						font-family: 'Arial';
						padding: 0;
						margin: 0;
						box-sizing: border-box;
					}
		
					body {
						background-color: #fafafa;
						display: flex;
						flex-direction: column;
						padding-top: 4rem;
						height: 100dvh;
						text-align: center;
					}
		
					main p {
						margin: 1rem 0;
					}
				</style>
			</head>
			<body>
				<main>
					<h1>Hello, Express!</h1>
					<p>Website ini dideploy dari GitHub ke Cloudflare Workers.</p>
				</main>
			</body>
		</html>
		`)
})

app.listen(3000);

export default httpServerHandler({ port: 3000 });
