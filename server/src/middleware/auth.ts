import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      userId: string
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  console.log(req?.headers?.cookie)

  // Split the string into key-value pairs
  const keyValuePairs = req?.headers?.cookie?.toString().split('; ')

  // Create an object to store the results
  const resultObject:any = {}

  // Iterate over key-value pairs and split them further
  keyValuePairs?.forEach(pair => {
    const [key, value] = pair.split('=')
    resultObject[key] = value
  })
  
  const token = resultObject['auth_token']

  if (!token) {
    return res.status(401).json({ message: 'unauthorized' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
    req.userId = (decoded as JwtPayload).userId
    next()
  } catch (error) {
    return res.status(401).json({ message: 'unauthorized' })
  }
}

export default verifyToken
