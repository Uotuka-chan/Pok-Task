import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TaskScope',
  description: 'SPEC駆動で作成したタスク確認アプリ',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
