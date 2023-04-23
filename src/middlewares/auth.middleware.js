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

        const token = req.headers.authorization.split(' ')[1];

        const tokenPayload = jwt.verify(token)

        if (!tokenPayload) throw new Error('Invalid authorization')

        const UserId = tokenPayload.id

        const UserFound = await getUserById(UserId)

        if (!UserFound) throw new Error('Invalid authorization')

        const { role = "user" } = UserFound;
        console.log(`The user with id ${UserId} has a role ${role}`)

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
