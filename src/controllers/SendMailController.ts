import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class SendMailController {

    async execute(request: Request, response: Response) {

        const { email, survey_id} = request.body

        const usersRepository = getCustomRepository(UserRepository)
        const survesRepository = getCustomRepository(SurveysRepository)
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const userAlreadyExists = await usersRepository.findOne({email})

        if(!userAlreadyExists){
            return response.status(400).json({
                error: 'User does not exists'
            })
        }

        const surveyAlreadyExists = await survesRepository.findOne({id: survey_id})

        if(!surveyAlreadyExists){
            return response.status(400).json({
                error: 'Survey does not exists'
            })
        }

        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id: survey_id
        })

        await surveysUsersRepository.save(surveyUser)

        return response.json(surveyUser)
    }
}

export { SendMailController }