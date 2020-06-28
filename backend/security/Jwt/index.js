const validator = require('validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const JWT_SECRET_KEY = config.get('JWT_SECRET_KEY');

const {
    ServerError
} = require('../../errors');

const options = {
    expiresIn: 3600
    // issuer: JWT_ISSUER,
    // subject: JWT_SUBJECT,
    // audience: JWT_AUDIENCE
};

const generateToken = async (payload) => {
    /*
     payload trebuie sa fie de forma:
     {
         userId: ,
         userRole: 
     }
    */
   try {
       const token = await jwt.sign(payload, JWT_SECRET_KEY, options);
       return token;
   } catch (err) {
       console.trace(err);
       throw new ServerError("Eroare la codificarea tokenului!", 500);
   }
};

const verifyAndDecodeData = async (token) => {
    try {
        const decoded = await jwt.verify(token, JWT_SECRET_KEY, options);
        return decoded;
    } catch (err) {
        console.trace(err);
        throw new ServerError("Eroare la decodificarea tokenului!", 500);
    }
};

const authorizeAndExtractToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new ServerError('Lipseste headerul de autorizare!', 403);
        }

        // se separa dupa " " deoarece este de forma: Bearer 1wqeiquqwe0871238712qwe
        const token = req.headers.authorization.split(" ")[1]; 

        if (!validator.isJWT(token)) {
            throw new ServerError(`Campul ${token} trebuie sa fie jwt`, 400);
        }

        const decoded = await verifyAndDecodeData(token);
        /*
         Decoded este obiectul care a fost trimis pentru criptare in functia "generateToken"
         are forma:
         {
            userId: ,
            username: 
         }
        */

        /* 
        pentru a putea folosi informatia in middleware-ul urmator retin informatia decodata in campul "state" al obiectului "req" 
        obiectul "req" va fi transmis implicit la urmatorul middleware
        */

        req.state = {
            decoded
        };

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    generateToken,
    authorizeAndExtractToken
};