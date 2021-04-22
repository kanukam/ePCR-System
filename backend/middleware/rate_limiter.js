// This will limit login attempts

const db = require('../sql/database');

// 10 Attempts are allowed over a period of 1 hour
const MAX_LOGIN_ATTEMPTS = process.env.MAX_LOGIN_ATTEMPTS || 12;
const HOURS_TIL_EXPIRY = process.env.HOURS_TIL_EXPIRY || 1;

module.exports = (req, res, next) => {
    const { ip } = req;
    let now = new Date();
    let expiry = new Date(now.getTime() + (HOURS_TIL_EXPIRY*60*60*1000));

    db.query(`SELECT * from ratelimiters where ip='${ip}'`, (err, dbRes) => {
        if(err)
            return res.status(500).send(err);
            
        if(dbRes.length <= 0){ // IP doesn't exist
            db.query(`UPDATE ratelimiters SET expiry=${expiry}, hits=1 WHERE ip='${ip}'`)
            return next();
        }

        let newhits = dbRes[0].hits || 0;
        if(dbRes[0].expiry){ // IP exists, has logged expiry
            let c = new Date(dbRes[0].expiry);

            if(now.getTime() >= c.getTime()){ // Expired time has passed
                db.query(`UPDATE ratelimiters SET expiry=${expiry}, hits=${newhits + 1} WHERE ip='${ip}'`)
            }
            else{
                db.query(`UPDATE ratelimiters SET hits=${newhits + 1} WHERE ip='${ip}'`)
            }
        }
        else{ // IP exists, no expiry
            db.query(`UPDATE ratelimiters SET expiry=${expiry}, hits=${newhits + 1} WHERE ip='${ip}'`)
        }

        if(newhits + 1 > MAX_LOGIN_ATTEMPTS)
            return res.status(400).send('Access denied');
        else {
            next();
        }
    })
}