'use client'

import { FormEvent, useEffect, useState } from 'react'
import { StateMessage } from '@/components/StateMessage'
import { Task, TaskList } from '@/components/TaskList'

function toNumber(value: string) {
  const number = Number(value)
  if (Number.isNaN(number)) return 0
  return Math.max(0, Math.min(32, number))
}

const pokemonNameOptions = [
  'サザンドラ',
  'ガブリアス',
  'ラウドボーン',
  'ルチャブル',
  'フシギバナ',
  'ミライドン',
  'コライドン',
]

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [searchText, setSearchText] = useState('')

  const [pokemonName, setPokemonName] = useState('')
  const [nature, setNature] = useState('')
  const [ability, setAbility] = useState('')
  const [effortH, setEffortH] = useState('')
  const [effortA, setEffortA] = useState('')
  const [effortB, setEffortB] = useState('')
  const [effortC, setEffortC] = useState('')
  const [effortD, setEffortD] = useState('')
  const [effortS, setEffortS] = useState('')
  const [item, setItem] = useState('')
  const [move1, setMove1] = useState('')
  const [move2, setMove2] = useState('')
  const [move3, setMove3] = useState('')
  const [move4, setMove4] = useState('')
  const [memo, setMemo] = useState('')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const effortTotal =
    toNumber(effortH) +
    toNumber(effortA) +
    toNumber(effortB) +
    toNumber(effortC) +
    toNumber(effortD) +
    toNumber(effortS)

  const isEffortOver = effortTotal > 66

  const filteredTasks = tasks.filter((task) =>
    (task.pokemonName ?? '').toLowerCase().includes(searchText.toLowerCase())
  )

  async function loadTasks() {
    try {
      const response = await fetch('/api/tasks')
      if (!response.ok) throw new Error('APIエラーが発生しました')
      const data: Task[] = await response.json()
      setTasks(data)
    } catch (e) {
      console.error(e)
      setError('データの取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  async function handleAddTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!pokemonName.trim()) return
    if (isEffortOver) {
      alert('努力値の合計は66以下にしてください')
      return
    }

    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pokemonName,
        nature,
        ability,
        effortH: toNumber(effortH),
        effortA: toNumber(effortA),
        effortB: toNumber(effortB),
        effortC: toNumber(effortC),
        effortD: toNumber(effortD),
        effortS: toNumber(effortS),
        item,
        move1,
        move2,
        move3,
        move4,
        memo,
      }),
    })

    if (response.ok) {
      setPokemonName('')
      setNature('')
      setAbility('')
      setEffortH('')
      setEffortA('')
      setEffortB('')
      setEffortC('')
      setEffortD('')
      setEffortS('')
      setItem('')
      setMove1('')
      setMove2('')
      setMove3('')
      setMove4('')
      setMemo('')
      await loadTasks()
    }
  }

  async function handleDeleteTask(id: number) {
    const ok = confirm('この育成論を削除しますか？')
    if (!ok) return

    const response = await fetch(`/api/tasks?id=${id}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      await loadTasks()
    }
  }

  async function handleToggleTask(id: number) {
    const response = await fetch('/api/tasks', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })

    if (response.ok) {
      await loadTasks()
    }
  }

  const total = tasks.length
  const completed = tasks.filter((task) => task.isCompleted).length

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-10">
      <header className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">
        <p className="text-sm font-medium text-blue-200">ポケモン育成・対戦ツール</p>
        <h1 className="mt-2 text-3xl font-bold">PokéTask</h1>
        <p className="mt-3 text-sm leading-6 text-slate-200">
          ポケモンの育成論をリスト化したり、対戦中のダメージ計算が使えるお役立ちアプリです。
        </p>
      </header>

      <form onSubmit={handleAddTask} className="mt-5 rounded-xl bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-2">
          <input
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
            placeholder="ポケモン名 例：サザンドラ"
            list="pokemon-name-options"
            className="rounded-lg border px-3 py-2"
          />

          <datalist id="pokemon-name-options">
            {pokemonNameOptions.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>

          <input
            value={nature}
            onChange={(e) => setNature(e.target.value)}
            placeholder="性格 例：おくびょう"
            className="rounded-lg border px-3 py-2"
          />

          <input
            value={ability}
            onChange={(e) => setAbility(e.target.value)}
            placeholder="とくせい 例：ふゆう"
            className="rounded-lg border px-3 py-2"
          />

          <input
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="持ち物 例：こだわりスカーフ"
            className="rounded-lg border px-3 py-2"
          />

          <div className="rounded-lg border p-3 md:col-span-2">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-bold text-slate-700">努力値</p>
              <p className={`text-sm font-bold ${isEffortOver ? 'text-red-600' : 'text-slate-600'}`}>
                合計：{effortTotal} / 66
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
              {[
                ['H', effortH, setEffortH],
                ['A', effortA, setEffortA],
                ['B', effortB, setEffortB],
                ['C', effortC, setEffortC],
                ['D', effortD, setEffortD],
                ['S', effortS, setEffortS],
              ].map(([label, value, setter]) => (
                <label key={label as string} className="text-sm">
                  <span className="font-bold">{label as string}</span>
                  <input
                    type="number"
                    min="0"
                    max="32"
                    value={value as string}
                    onChange={(event) => (setter as (value: string) => void)(event.target.value)}
                    className="mt-1 w-full rounded-lg border px-2 py-2"
                  />
                </label>
              ))}
            </div>

            {isEffortOver && (
              <p className="mt-2 text-sm font-bold text-red-600">
                合計が66を超えています。
              </p>
            )}
          </div>

          <input value={move1} onChange={(e) => setMove1(e.target.value)} placeholder="技1" className="rounded-lg border px-3 py-2" />
          <input value={move2} onChange={(e) => setMove2(e.target.value)} placeholder="技2" className="rounded-lg border px-3 py-2" />
          <input value={move3} onChange={(e) => setMove3(e.target.value)} placeholder="技3" className="rounded-lg border px-3 py-2" />
          <input value={move4} onChange={(e) => setMove4(e.target.value)} placeholder="技4" className="rounded-lg border px-3 py-2" />

          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="メモ 例：特殊アタッカー、最速"
            className="min-h-20 rounded-lg border px-3 py-2 md:col-span-2"
          />
        </div>

        <button
          disabled={isEffortOver}
          className={`mt-3 w-full rounded-lg px-4 py-2 font-medium text-white ${
            isEffortOver ? 'bg-slate-400' : 'bg-slate-900 hover:bg-slate-700'
          }`}
        >
          育成論を追加
        </button>
      </form>

      <div className="mt-5 rounded-xl bg-white p-4 shadow-sm">
        <input
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="ポケモン名で検索 例：サザンドラ"
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>

      <section className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">総育成論数</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{total}</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">育成済み</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{completed}</p>
        </div>
      </section>

      {loading && <StateMessage title="読み込み中..." description="APIから育成論を取得しています。" />}
      {error && <StateMessage title="データの取得に失敗しました" description={error} />}
      {!loading && !error && filteredTasks.length === 0 && (
        <StateMessage title="該当する育成論はありません" description="検索条件を変えるか、新しく追加してください。" />
      )}

      {!loading && !error && filteredTasks.length > 0 && (
        <TaskList
          tasks={filteredTasks}
          onDelete={handleDeleteTask}
          onToggle={handleToggleTask}
        />
      )}
    </main>
  )
}