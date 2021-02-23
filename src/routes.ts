import {Router} from 'express'
import {UserController} from './controllers/UserController'

const router = Router()

const userConstroler = new UserController()

router.post("/users", userConstroler.create)

export {router};