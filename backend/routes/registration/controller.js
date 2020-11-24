const validate = require('./validate');

module.exports.register = (req, res) => {
    const { username, password, email, phone, name } = req.body;
    // Mandatory Fields
    if (!username || !password || !email)
        return res.status(401).json({ error: 'Username, password, or email field are blank' });

    validate.register(email, password, (err, hash) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal error please try again' });
        }
        else {
            validate.insert(username, hash, email, phone, name, (err, completed) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: 'Internal error please try again' });
                }
                else {
                    res.status(200).json({ status: 'Successful registration' });
                }
            } )
        }
    })
}