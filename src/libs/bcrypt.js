import bcrypt from 'bcrypt'

const saltRounds = 10

const hash = async (password) => {
    const hash = await bcrypt.hash(password, saltRounds) 
    return hash
    }

const compare = async (password, hash) => {
    const result = await bcrypt.compare(password, hash)
    return result
}

export default {
    hash,
    compare
}