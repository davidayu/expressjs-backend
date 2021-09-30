const cors = require('cors');
const express = require('express');
const app = express()
const port = 5000;
app.use(cors());
app.use(express.json());

const users = {
    users_list :
    [
       {
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123',
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222',
          name: 'Mac',
          job: 'Professor',
       },
       {
          id: 'yat999',
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555',
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined) {
        if (job != undefined) {
            let result = findUserByNameAndJob(name, job);
            result = {users_list: result};
            res.send(result);
        } else {
            let result = findUserByName(name);
            result = {users_list: result};
            res.send(result);
        }

    } else if (job != undefined) {
        let result = findUserByJob(job);
        result = {users_list: result};
        res.send(result);
    }
    else {
        res.send(users);
    }
});

const findUserByName = (name) => {
    return users['users_list'].filter( (user) => user['name'] === name);
}

const findUserByJob = (job) => {
    return users['users_list'].filter( (user) => user['job'] === job);
}

const findUserByNameAndJob = (name, job) => {
    return users['users_list'].filter( (user) => user['name'] === name && user['job'] === job);
}

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(201).end();
});

function addUser(user){
    var randomChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    do {
        result = '';
        for ( var i = 0; i < 6; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
    } while (users['users_list'].filter( (user) => user['id'] === result).size > 0);
    user.id = result;
    users['users_list'].push(user);
}

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    let user = findUserById(id);
    if (user === undefined || user.length == 0)
        res.status(404).send('User not found.');
    else {
        removeUser(user);
        res.status(204).end();
    }
});

function removeUser(user){
    const index = users['users_list'].indexOf(user);
    users['users_list'].splice(index, 1);
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});