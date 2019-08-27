const db = require('../data/db-config.js')

module.exports = {
    find,
    findById,
    findPosts,
    add,
    update,
    remove
}


function find() {
    return db('users')
}

// resolves to a single user OR null
function findById(id) {
    return db('users').where({ id }).first()
}

function findPosts(user_id) {
    return db('posts as p')
        .join('users as u', 'u.id', 'p.user_id')
        .select('p.id', 'p.contents', 'u.username')
        .where({ user_id })
}

// resolves to a newly created user
function add(userData) {
    return db('users').insert(userData)
        .then(ids => {
            return findById(ids[0])
        })
}

// resolves to updates user
function update(changes, id) {
    return db('users').where({ id }).update(changes)
        .then(count => {
            return findById(id)
        })

}

function remove(id) {
    return db('users').where({ id }).del()
}


