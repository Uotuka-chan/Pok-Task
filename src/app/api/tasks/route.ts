import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      pokemonName: true,
      nature: true,
      ability: true,
      effortH: true,
      effortA: true,
      effortB: true,
      effortC: true,
      effortD: true,
      effortS: true,
      item: true,
      move1: true,
      move2: true,
      move3: true,
      move4: true,
      memo: true,
      imageUrl: true,
      isCompleted: true,
      dueDate: true,
      createdAt: true,
    },
  })

  return NextResponse.json(tasks)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const pokemonName = String(body.pokemonName ?? '').trim()
  const nature = String(body.nature ?? '').trim()
  const ability = String(body.ability ?? '').trim()
  const item = String(body.item ?? '').trim()
  const move1 = String(body.move1 ?? '').trim()
  const move2 = String(body.move2 ?? '').trim()
  const move3 = String(body.move3 ?? '').trim()
  const move4 = String(body.move4 ?? '').trim()
  const memo = String(body.memo ?? '').trim()

  const effortH = Number(body.effortH ?? 0)
  const effortA = Number(body.effortA ?? 0)
  const effortB = Number(body.effortB ?? 0)
  const effortC = Number(body.effortC ?? 0)
  const effortD = Number(body.effortD ?? 0)
  const effortS = Number(body.effortS ?? 0)

  if (!pokemonName) {
    return NextResponse.json(
      { message: 'ポケモン名を入力してください' },
      { status: 400 }
    )
  }

  const user = await prisma.user.findFirst()

  if (!user) {
    return NextResponse.json(
      { message: 'ユーザーが存在しません' },
      { status: 500 }
    )
  }

  const task = await prisma.task.create({
    data: {
      pokemonName,
      nature,
      ability,
      item,
      effortH,
      effortA,
      effortB,
      effortC,
      effortD,
      effortS,
      move1,
      move2,
      move3,
      move4,
      memo,
      isCompleted: false,
      userId: user.id,
    },
  })

  return NextResponse.json(task, { status: 201 })
}

export async function PATCH(request: NextRequest) {
  const body = await request.json()
  const id = Number(body.id)

  const task = await prisma.task.findUnique({
    where: { id },
  })

  if (!task) {
    return NextResponse.json(
      { message: 'Task not found' },
      { status: 404 }
    )
  }

  const updatedTask = await prisma.task.update({
    where: { id },
    data: {
      isCompleted: !task.isCompleted,
    },
  })

  return NextResponse.json(updatedTask)
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = Number(searchParams.get('id'))

  if (!id) {
    return NextResponse.json(
      { message: 'idが必要です' },
      { status: 400 }
    )
  }

  await prisma.task.delete({
    where: { id },
  })

  return NextResponse.json({ message: '削除しました' })
}