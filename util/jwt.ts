import * as jwt from 'jsonwebtoken'

class Token {
    private secret : string

    constructor(secret: string){
        this.secret = secret
    }

    public generate(payload: any): string {
        const token = jwt.sign(payload, this.secret)
        return token
    }

    public verify(token: string): any{
        const payload = jwt.verify(token, this.secret)
        return payload 
    }
}

const secretKey = process.env.JWT_SECRET || 'verhcehf587kr'
const jwtToken = new Token(secretKey)

export default jwtToken