import crypto from 'crypto'

class FDevHelper {
  public base64URLEncode(str: any) {
    return str.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
  }

  public sha256(buffer: Buffer) {
    return crypto.createHash('sha256').update(buffer).digest()
  }
}

export default new FDevHelper()
