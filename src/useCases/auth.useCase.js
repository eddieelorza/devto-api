import bcrypt from '../libs/bcrypt.js'
import jwt from '../libs/jwt.js'
import { User } from '../models/user.module.js'


const login = async (email, password) => {

    const userFound = await User.findOne({ email })

    if (!userFound) throw new Error('Invalid credentials')

    const isPasswordValid = await bcrypt.compare(password, userFound.password)

    if (!isPasswordValid) throw new Error('Invalid credentials')

    const token = jwt.sign({ id: userFound._id })

    return token
}

export { login}
