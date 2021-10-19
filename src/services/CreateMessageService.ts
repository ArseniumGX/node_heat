import prisma from '../prisma'
import { io } from '../app'


class CreateMessageService{
    async execute(text: string, user_id: string){
        const message = await prisma.message.create({
            data: {
                text,
                userId: user_id
            },
            include: {
                user: true
            }
        })

        const infoWS = {
            text: message.text,
            user_id: message.userId,
            createdAt: message.createAt,
            user: {
                name: message.user.name,
                avatar_url: message.user.avatar_url
            }
        }

        io.emit("new_message", infoWS)

        return message
    }
}

export { CreateMessageService }