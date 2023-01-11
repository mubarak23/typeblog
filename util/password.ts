import * as bcrypt from 'bcryptjs'

class Password {
    private saltRounds: number

    constructor (saltRounds: number) {
        this.saltRounds = saltRounds
    }

    public async hashPassword (password: string): Promise<string> {
        const hashPassword = await bcrypt.hash(password, this.saltRounds)
        return hashPassword
    }

    public async compare( password: string, hash: string){
        const isMatch = await bcrypt.compare(password, hash)
        return isMatch
    }
}

export default Password