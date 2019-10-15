const express = require('express');
const server = express();

server.use(express.json());

const users = ['Alexandre', 'Ariane', 'Dougas,', 'Maria', 'Mariela'];

server.use((req, res, next) => {
	next();
});

function checkUserExists(req, res, next) {
	if (!req.body.name) {
		return res.status(400).json({
			error: 'Usuário não encontro no body'
		})
	}

	return next();
}

function checkUserInArray(req, res, next) {
	const { index } = req.params;
	const user = users[index];

	if (!user) {
		return res.status(400).json({
			error: 'Usuário não existe'
		});
	}

	req.user = user;

	return next();
}

server.get('/users', ({res}) => {
    res.json(users);
});

server.get('/users/:index', checkUserInArray, (req, res) => {    
    res.json(req.user);
});

server.post('/users', checkUserExists, (req, res) => {
    const { name } = req.body;
   
    users.push(name);

    res.json(users);
});

server.put('/users/:index', checkUserInArray, checkUserExists, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;
    
    users[index] = name;

    res.json(users);
});

server.delete('/users/:index', checkUserInArray, (req, res) => {
    const { index } = req.params;
    
    users.splice(index, 1);

    res.json(users);
});

server.listen(3000);