import { Request, Response, Router } from 'express'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateMessageController } from './controllers/CreateMessageController'
import { GetLastThreeMessagesController } from './controllers/GetLastThreeMessagesController'
import { ProfileUserController } from './controllers/ProfileUserController'
import { ensureAuthenticate } from './middleware/ensureAuthenticated'

const router = Router()

router.get('/github', (req: Request, res: Response) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

router.get('/signin/callback', (req: Request, res: Response) => {
    const { code } = req.query

    return res.json(code)
})

router.post('/authenticate', new AuthenticateUserController().handle)
router.post('/messages', ensureAuthenticate, new CreateMessageController().handle)
router.get('/messages/last3', new GetLastThreeMessagesController().handle)
router.get('/profile', ensureAuthenticate, new ProfileUserController().handle)

export default router