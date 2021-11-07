const handleRegister = (req, res, db, bcrypt) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).json('incorrect form submission')
    }
    const hash = bcrypt.hashSync(password)
    // bcrypt.hash(password, null, null, function(err,hash) {
    //     console.log(hash)
    // })
    // database.users.push({
    //     id: '125',
    //     name,
    //     email,
    //     entries: 0,
    //     joined: new Date()
    // })
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        }).into('login').returning('email').then(loginemail => {
            return trx('users').returning('*').insert({
                email: loginemail[0],
                name: name,
                joined: new Date()
            }).then(user => {
                // res.json(database.users[database.users.length - 1])
                res.json(user[0])
        })
    }).then(trx.commit).catch(trx.rollback)
    }).catch(err => res.status(400).json('unable to register'))
}

module.exports = {
    handleRegister: handleRegister
}