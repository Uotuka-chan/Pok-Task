import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.task.deleteMany()
  await prisma.user.deleteMany()

  await prisma.user.create({
    data: {
      email: 'demo@example.com',
      name: 'Demo User',
      tasks: {
        create: [
          { title: 'SPECを確認する', isCompleted: true, dueDate: new Date('2026-06-03') },
          { title: 'READMEとREPORTを整備する', isCompleted: false, dueDate: new Date('2026-06-04') },
          { title: 'Demo Dayで動作確認する', isCompleted: false, dueDate: new Date('2026-06-05') },
        ],
      },
    },
  })

  console.log('Seed完了: Demo User とタスク3件を作成しました')
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
