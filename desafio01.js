const express = require('express');
const app = express();

const projects = [];
let count = 0;

app.use(express.json());

app.listen(3000);

function checkIdExists(req, res, next) {
	const id = parseInt(req.params.id, 10);

	const project = projects.find((item) => item.id === id);

	if(!project) {
		return res.status(400).json({error: 'Não existe um projeto com o ID informado'});
	}

	return next();
};

function countRequests({next}) {
	count++;

	console.log(count);

	return next();
};

app.use(countRequests);

app.post('/projects', (req, res) => {
	const { id, title } = req.body;
	const tasks = req.body.tasks ? req.body.tasks : [];

	projects.push({id, title, tasks});

	return res.json(projects);
});

app.get('/projects', (req, res) => {
	return res.json(projects);
});

app.put('/projects/:id', checkIdExists, (req, res) => {
	const id = parseInt(req.params.id, 10);
	const { title } = req.body;

	const project = projects.find((project) => project.id === id);
	
	project.title = title;
	
	return res.json(projects);
});

app.delete('/projects/:id', checkIdExists, (req, res) => {
	const id = parseInt(req.params.id, 10);
	const index = projects.findIndex((project) => project.id === id);

	projects.splice(index, 1);
		
	return res.json(projects);
});

app.post('/projects/:id/tasks', checkIdExists, (req, res) => {
	const { title } = req.body;
	const id = parseInt(req.params.id, 10);

	const project = projects.find((project) => project.id === id);

	if (project.tasks) {
		project.tasks.push(title)
	} else {
		project.tasks = [title];
	}

	return res.json(project);
});