const Clarifai = require('clarifai')

const app = new Clarifai.App({  
      apiKey: '913aa82b5ded4a6ca9736707e94cc4e2'
     });

const handleAPICall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input).then(data => {
        res.json(data)
    }).catch(err => res.status(400).json('unable to work with API'))
}
const handleImage = (req, res, db) => {
    const { id } = req.body
    // let found = false
    // database.users.forEach(user => {
    //     if (user.id === id) {
    //         found = true
    //         user.entries++
    //         return res.json(user.entries)
    //     }
    // })
    // if(!found) {
    //     res.status(400).json('no such user')
    // }
    db('users').where('id', '=', id).increment('entries', 1).returning('entries').then(entries => {
        res.json(entries[0])
    }).catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleAPICall: handleAPICall
}