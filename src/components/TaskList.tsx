import { TaskCard } from './TaskCard'

export type Task = {
  id: number
  pokemonName?: string | null
  nature?: string | null
  ability?: string | null
  effortH?: number | null
  effortA?: number | null
  effortB?: number | null
  effortC?: number | null
  effortD?: number | null
  effortS?: number | null
  item?: string | null
  move1?: string | null
  move2?: string | null
  move3?: string | null
  move4?: string | null
  memo?: string | null
  imageUrl?: string | null
  isCompleted: boolean
  dueDate?: string | null
  createdAt?: string
}

export function TaskList({
  tasks,
  onDelete,
  onToggle,
}: {
  tasks: Task[]
  onDelete: (id: number) => void
  onToggle: (id: number) => void
}) {
  return (
    <section className="mt-6 grid gap-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </section>
  )
}