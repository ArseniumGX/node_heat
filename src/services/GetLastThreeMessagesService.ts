import prisma from '../prisma'

class GetLastThreeMessagesService{
    async execute(){
        const messages = await prisma.message.findMany({
            take: 3,
            orderBy: {
                createAt: "desc"
            },
            include: {
                user: true
            }
        })

        return messages
    }
}

export { GetLastThreeMessagesService }