const { Users } = require("../data/index.js");
const { ServerError } = require('../errors');
const { generateToken } = require('../security/Jwt');
const { hash, compare } = require('../security/Password');
const { Tokens } = require("../data/index.js");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const config = require('config');
const NODEMAILER_USERNAME = config.get('NODEMAILER_USERNAME');
const NODEMAILER_PASSWORD = config.get('NODEMAILER_PASSWORD');
//const imageMimeTypes = ['images/jpeg', 'images/jpn', 'images/png'];

const addUser = async (username, firstName, lastName, email, password) => {
 
    // verific daca exista deja un membru cu acel username
    let user = await Users.findOne({ username });
    if (user) {
        throw new ServerError(`Exista deja un membru cu username-ul ${username} in sistem!`, 404);
    }
 
    // verific daca exista deja un member cu acel email
    user = await Users.findOne({ email });
    if (user) {
        throw new ServerError(`Exista deja un membru cu email-ul ${email} in sistem!`, 404);
    }

    const hashedPassword = await hash(password);
 
    // adauga informatiile in baza de date
    user = new Users({
        username,
        firstName,
        lastName,
        email,
        password: hashedPassword
    });
 
    try {
        await user.save();

        const token = new Tokens({
            _userId: user._id,
            token: crypto.randomBytes(16).toString('hex')
        });

        token.save()

        // Send the email
        const transporter = nodemailer.createTransport({
            host: 'smtp.mail.gmail.com',
            port: 465,
            service: 'gmail',
            secure: false,
            auth: { user: NODEMAILER_USERNAME, pass: NODEMAILER_PASSWORD },
            tls: {
                rejectUnauthorized: false
            },
            debug: false,
            logger: true
        });

        const mailOptions = {
            to: user.email,
            subject: 'Verificare email',
            html: `<div>
                    <header>Buna ${user.firstName},</header>
                    <section>
                        <div>Mai ai un pas</div>
                        <div>Apasa click pe urmatorul click pentru a-ti valida contul </div>
                        <a href="http://localhost:5000/movieflex/users/checkToken?token=${token.token}">Validare cont</a>
                    </section>
                </div>`
        };

        transporter.sendMail(mailOptions, function (err) {
            if (err) {
                Users.deleteOne(user);
                console.log(err.name)
                throw new ServerError(`Nu a putut fi trimis email de verificare catre ${user.email}`);
            }
        });
    } catch (error) {
        throw new ServerError(`Membrul ${username} nu a putut fi adaugat`, 404);
    }
};

const loginUser = async (userLoginInformation, password, isUsingEmail) => {

    let user;

    // verific daca se logheaza folosind email sau username
    if (isUsingEmail) {
        user = await Users.findOne({ email: { $eq: userLoginInformation } });
    } else {
        user = await Users.findOne({ username: { $eq: userLoginInformation } });
    }

    if (user === null) {
        throw new ServerError(`Nu exista acest Utilizator`, 404);
    }

    if (!user.isVerified) {
        throw new ServerError(`Utilizatorul nu a fost validat`, 403)
    }
    
    if (await compare(password, user.password)) {
        return await generateToken({
            userId: user._id,
            userRole: user.role
        });
    }
    throw new ServerError("Combinatia de username si parola nu este buna!", 404);
};

const checkToken = async (token) => {
    const response = await Tokens.findOne({ token });
    if (response == null) {
        throw new ServerError('Acest token nu exista');
    }
    const user = await Users.findOne({ _id: response._userId });
    if (user == null) {
        throw new ServerError('Acest token nu exista');
    }
    if (user.isVerified) {
        throw new ServerError(`Userul ${user.username} a fost deja confirmat`);
    }

    await Users.update(
        {
            email: user.email
        },
        {
            $set:
            {
                isVerified: true
            }
        });

    await Tokens.deleteOne({ _id: response._id });

    const html = `<header>Bun venit ${user.firstName}</header>
        <section>
            <div>Contul tau a fost confirmat. Acum te poti loga</div>
            <a href="http://localhost:3000/login">login</a>
        </section>`

    return html;
}

const getProfile = async (userId) => {

    try {
        const user = await Users.findOne({ _id: userId })
        return user;
    } catch (error) {
        throw new ServerError("Porfilul nu a putut fi afisat", 500);
    }
}

// const saveProfileImage = async ( userId, imageEncoded ) => {

//     const user = await Users.findOne({ _id: userId })

//     try {
//         const image = await JSON.parse(imageEncoded);

//         if ( image != null && imageMimeTypes.includes(image.type)) {
//             user.profileImage = new Buffer.from(image.data, 'base64');
//             user.profileImageType = image.type;
//         }
//     } catch (error) {
//         throw new ServerError("Imaginea nu a putut fi uploadata", 500);
//     }
// }

const updateProfile = async (userId, firstName, lastName, email) => {

    try {
        const user = await Users.findOne({ _id: userId });

        if (firstName == null) {
            firstName = user.firstName;
        }
        if (lastName == null) {
            lastName = user.lastName;
        }
        if (email == null) {
            email = user.email;
        }

        await Users.updateOne(
            {
                _id: userId,
            },
            {
                $set:
                {
                    firstName: firstName, 
                    lastName: lastName, 
                    email: email
                }
            }
        )
    } catch (error) {
        throw new ServerError("Profilul nu a putut fi updatat", 500);
    }
}

module.exports = {
    addUser,
    loginUser,
    checkToken,
    getProfile,
    updateProfile
}