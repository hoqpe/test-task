export interface Book {
  id: string
  author: string
  title: string
  description: string
  tags: string[]
}

export type TabName = 'toRead' | 'inProgress' | 'done'

export interface Tab {
  name: TabName
  text: string
  items: Book[]
}
