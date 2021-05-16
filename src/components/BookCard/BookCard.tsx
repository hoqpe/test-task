import { Book, TabName } from '../../types'
import { Tag } from '../Tag'
import styles from './BookCard.module.css'

export type BookCardProps = Book & {
  tabName: TabName
  onChangeTab: (tabName: TabName) => void
  onSelectTag: (tag: string) => void
}

export const BookCard = ({
  author,
  title,
  description,
  tags,
  tabName,
  onChangeTab,
  onSelectTag
}: BookCardProps) => (
  <div className={styles.root}>
    <div>
      {author}
    </div>
    <h2 className={styles.title}>
      {title}
    </h2>
    {tabName === 'toRead' ? (
      <button
        className={styles.changeTabBtn}
        type="button"
        onClick={() => onChangeTab('inProgress')}
      >
        <span className={styles.btnText}>
          start reading
        </span>
        →
      </button>
    ) : tabName === 'inProgress' ? (
      <button
        className={styles.changeTabBtn}
        type="button"
        onClick={() => onChangeTab('done')}
      >
        <span className={styles.btnText}>
          finish reading
        </span>
        →
      </button>
    ) : (
      <button
        className={styles.changeTabBtn}
        type="button"
        onClick={() => onChangeTab('toRead')}
      >
        <span className={styles.btnText}>
          return in «to read»
        </span>
        ↲
      </button>
    )}
    <div className={styles.description}>
      {description}
    </div>
    <ul className={styles.tags}>
      {tags.map(tag => (
        <li key={tag}>
          <Tag name={tag} onClick={() => onSelectTag(tag)} />
        </li>
      ))}
    </ul>
  </div>
)
