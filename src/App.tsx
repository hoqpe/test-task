import { useState, useEffect, useMemo } from 'react'
import * as idb from 'idb-keyval'
import { Book, Tab, TabName } from './types'
import { useQueryState } from './hooks'
import { Panel } from './components/Panel'
import { BookCard } from './components/BookCard'
import { SelectedTagsList } from './components/SelectedTagsList'
import styles from './App.module.css'

type BooksTabs = Record<Book['id'], TabName>

type QueryState = {
  tabName: BooksTab['name']
  tags: string[]
}

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

const filterByTag = (books: Book[], tags: string[]) => {
  return books.filter(book => tags.every(tag => book.tags.includes(tag)))
}

const defaultQueryState: QueryState = { tabName: 'toRead', tags: [] }

const App = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [booksTabs, setBooksTabs] = useState<BooksTabs>()

  const [{
    tabName,
    tags
  }, updateQueryState] = useQueryState<QueryState>(defaultQueryState)

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
      const tabName = booksTabs[book.id] ?? 'toRead'
      tabs[tabName].items.push(book)
    }

    return tabs
  }, [books, booksTabs])

  const tabsList = useMemo(() => Object.values(tabs), [tabs])

  const filteredBooks = useMemo(() => {
    let books = tabs[tabName].items

    if (tags.length) {
      books = filterByTag(books, tags)
    }

    return books
  }, [tabs, tabName, tags])

  const handleBookTabChange = (
    bookId: Book['id'],
    tabName: TabName
  ) => {
    const value = { ...booksTabs, [bookId]: tabName }
    setBooksTabs(value)
    idb.set('booksTabs', value)
  }

  useEffect(() => {
    Promise.all([
      fetchBooks(),
      idb.get<BooksTabs>('booksTabs')
    ]).then(([
      { items },
      booksTabs
    ]) => {
      setBooks(items)
      setBooksTabs(booksTabs)
    })
  }, [])

  return (
    <Panel
      tabs={tabsList}
      selectedTabName={tabName}
      onChangeTab={tabName => updateQueryState({ tabName })}
    >
      {!!tags.length && (
        <SelectedTagsList
          tags={tags}
          onResetTags={() => updateQueryState({ tags: [] })}
        />
      )}
      {!filteredBooks.length && (
        <div className={styles.emptyListMessage}>
          List is empty
        </div>
      )}
      {filteredBooks.map(book => (
        <BookCard
          key={book.id}
          tabName={tabName}
          onChangeTab={tabName => handleBookTabChange(book.id, tabName)}
          onSelectTag={tag => updateQueryState({ tags: [...tags, tag] })}
          {...book}
        />
      ))}
    </Panel>
  )
}

export default App
