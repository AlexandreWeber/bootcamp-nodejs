const express = require('express');
const server = express();

server.use(express.json());

const users = ['Alexandre', 'Ariane', 'Dougas,', 'Maria', 'Mariela'];

server.get('/users', ({res}) => {
    res.json(users);
});

server.get('/users/:index', (req, res) => {
    const { index } = req.params;
    
    res.json(users[index]);
});

server.post('/users', (req, res) => {
    const { name } = req.body;
   
    users.push(name);

    res.json(users);
});

server.put('/users/:index', (req, res) => {
    const { index } = req.params;
    const { name } = req.body;
    
    users[index] = name;

    res.json(users);
});

server.delete('/users/:index', (req, res) => {
    const { index } = req.params;
    
    users.splice(index, 1);

    res.json(users);
});

server.listen(3000);