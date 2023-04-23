import jwt from '../libs/jwt.js'

const isAuth =(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token);
        console.log(decodedToken)
        if(!decodedToken) {
            throw 'Invalid user ID';
        }
        else {
            next();
        }
    }
    catch (error) {
        res.status(401).json({
            message: error.message
            
        });
    }
};

const isAdmin = async (request, response, next) => {
    try {

        const authorization = request.headers.authorization || ''

        const token = authorization.replace('Bearer ', '')

        const tokenPayload = jwt.verify(token)

        if (!tokenPayload) throw new Error('Invalid authorization')

        const koderId = tokenPayload.id

        const koderFound = await getKoderById(koderId)

        if (!koderFound) throw new Error('Invalid authorization')

        const { role = "user" } = koderFound;
        console.log(`The user with id ${koderId} has a role ${role}`)

        if (role === "admin") {
            next()
        }
        else {
            response
                .status(401)
                .json({
                    success: false,
                    message: "Unauthorized"
                })
        }

    } catch (error) {
        response
            .status(401)
            .json({
                success: false,
                message: error.message
            })
    }
}


export { isAuth, isAdmin }
