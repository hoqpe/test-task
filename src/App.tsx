import { Panel } from './components/Panel'
import { BookCard } from './components/BookCard'

const App = () => {
  return (
    <Panel
      tabs={[
        {
          name: 'toRead',
          text: 'To read',
          items: []
        },
        {
          name: 'inProgress',
          text: 'In progress',
          items: []
        },
        {
          name: 'done',
          text: 'Donew',
          items: []
        }
      ]}
      selectedTabName="toRead"
    >
      <BookCard
        id="id-1"
        title="title"
        author="author"
        description="description"
        tags={['tag-1', 'tag-2']}
      />
    </Panel>
  )
}

export default App
