import { Book } from '../../types'
import { Tag } from '../Tag'
import styles from './BookCard.module.css'

export type BookCardProps = Book

export const BookCard = ({
  author,
  title,
  description,
  tags
}: BookCardProps) => (
  <div className={styles.root}>
    <div>
      {author}
    </div>
    <h2 className={styles.title}>
      {title}
    </h2>
    <button
      className={styles.changeStatusBtn}
      type="button"
    >
      <span className={styles.btnText}>
        start reading
      </span>
      →
    </button>
    <div className={styles.description}>
      {description}
    </div>
    <ul className={styles.tags}>
      {tags.map(tag => (
        <li key={tag}>
          <Tag name={tag} />
        </li>
      ))}
    </ul>
  </div>
)
