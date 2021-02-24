import {Router} from 'express'
import { SurveysController } from './controllers/SurveysController'
import {UserController} from './controllers/UserController'

const router = Router()

const userConstroller = new UserController()
const surveyController  = new SurveysController()

router.post('/users', userConstroller.create)
router.post('/surveys', surveyController.create)
router.get('/surveys', surveyController.show)

export {router}