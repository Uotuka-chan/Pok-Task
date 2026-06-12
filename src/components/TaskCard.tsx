export type TaskCardProps = {
  task: {
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
  }
  onDelete: (id: number) => void
  onToggle: (id: number) => void
}

const pokemonImages: Record<string, string> = {
  サザンドラ: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/635.png',
  ガブリアス: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/445.png',
  ラウドボーン: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/911.png',
  ルチャブル: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/701.png',
  フシギバナ: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png',
  ミライドン: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1008.png',
  コライドン: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1007.png',
}

function getImageUrl(name?: string | null, imageUrl?: string | null) {
  if (imageUrl) return imageUrl
  if (!name) return null
  return pokemonImages[name] ?? null
}

function formatDate(dateText?: string | null) {
  if (!dateText) return '期限なし'
  const date = new Date(dateText)
  return `${date.getMonth() + 1}/${date.getDate()}`
}

function value(value?: number | null) {
  return value ?? 0
}

export function TaskCard({ task, onDelete, onToggle }: TaskCardProps) {
  const effortTotal =
    value(task.effortH) +
    value(task.effortA) +
    value(task.effortB) +
    value(task.effortC) +
    value(task.effortD) +
    value(task.effortS)

  const moves = [task.move1, task.move2, task.move3, task.move4].filter(Boolean)
  const displayImageUrl = getImageUrl(task.pokemonName, task.imageUrl)

  return (
    <article className={`rounded-xl border bg-white p-4 shadow-sm transition ${task.isCompleted ? 'opacity-60' : 'opacity-100'}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          {displayImageUrl && (
            <img
              src={displayImageUrl}
              alt={task.pokemonName || 'pokemon'}
              className="h-24 w-24 rounded-xl bg-slate-50 object-contain"
            />
          )}

          <div>
            <p className="text-xl font-bold">{task.pokemonName || '未設定'}</p>
            <p className="mt-1 text-sm text-slate-600">性格：{task.nature || '-'}</p>
            <p className="text-sm text-slate-600">とくせい：{task.ability || '-'}</p>
            <p className="text-sm text-slate-600">持ち物：{task.item || '-'}</p>

            <p className="mt-2 text-sm font-bold text-slate-700">
              努力値：H{value(task.effortH)} A{value(task.effortA)} B{value(task.effortB)} C{value(task.effortC)} D{value(task.effortD)} S{value(task.effortS)}
              <span className="ml-2 text-slate-500">合計 {effortTotal}/66</span>
            </p>

            {moves.length > 0 && (
              <div className="mt-2 grid grid-cols-2 gap-1 text-sm text-slate-700">
                {moves.map((move) => (
                  <span key={move} className="rounded bg-slate-100 px-2 py-1">
                    {move}
                  </span>
                ))}
              </div>
            )}

            {task.memo && <p className="mt-2 text-sm text-slate-500">メモ：{task.memo}</p>}

            <p className="mt-2 text-sm text-slate-500">
              期限：{formatDate(task.dueDate)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-sm font-medium ${task.isCompleted ? 'bg-slate-100 text-slate-600' : 'bg-blue-100 text-blue-700'}`}>
            {task.isCompleted ? '完了' : '未完了'}
          </span>

          <button
            onClick={() => onToggle(task.id)}
            className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 hover:bg-green-200"
          >
            {task.isCompleted ? '未完了へ' : '完了へ'}
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-200"
          >
            削除
          </button>
        </div>
      </div>
    </article>
  )
}