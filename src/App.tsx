import { useState, useEffect, useMemo } from 'react'
import { Book, Tab, TabName } from './types'
import { Panel } from './components/Panel'
import { BookCard } from './components/BookCard'

type BooksTabs = Record<Book['id'], TabName>

class BooksTab implements Tab {
  items: Book[] = []

  constructor (
    public name: TabName,
    public text: string,
  ) {}
}

const booksUrl = 'https://raw.githubusercontent.com/lastw/test-task/master/data/10-items.json'

const fetchBooks = async (): Promise<{ items: Book[] }> => {
  const res = await window.fetch(booksUrl)
  return await res.json()
}

const App = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [booksTabs] = useState<BooksTabs>()

  const tabs = useMemo(() => {
    const tabs = {
      toRead: new BooksTab('toRead', 'To read'),
      inProgress: new BooksTab('inProgress', 'In progress'),
      done: new BooksTab('done', 'Done')
    }

    if (!booksTabs) {
      tabs.toRead.items = books
      return tabs
    }

    for (const book of books) {
      const bookStatus = booksTabs[book.id] ?? 'toRead'
      tabs[bookStatus].items.push(book)
    }

    return tabs
  }, [books, booksTabs])

  const tabsList = useMemo(() => Object.values(tabs), [tabs])

  useEffect(() => {
    fetchBooks().then(({ items }) => setBooks(items))
  }, [])

  return (
    <Panel
      tabs={tabsList}
      selectedTabName="toRead"
    >
      {books.map(book => (
        <BookCard key={book.id} {...book} />
      ))}
    </Panel>
  )
}

export default App
