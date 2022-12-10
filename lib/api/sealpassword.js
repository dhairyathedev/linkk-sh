import Iron from '@hapi/iron'

export async function Seal(pass){
    const password = process.env.ENCRYPTION_KEY
    const obj = {
        password: pass
    }
    return await Iron.seal(obj, password, Iron.defaults)
}