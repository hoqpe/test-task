import { Tag } from '../Tag'
import styles from './SelectedTagsList.module.css'

export type SelectedTagsListProps = {
  tags: string[],
  onResetTags: () => void
}

export const SelectedTagsList = (props: SelectedTagsListProps) => (
  <div className={styles.root}>
    Filtered by tags:
    <div className={styles.tagsList}>
      {props.tags.map(tag => <Tag name={tag} disabled />)}
    </div>
    <button
      className={styles.resetTagsBtn}
      type="button"
      onClick={props.onResetTags}
    >
      (clear)
    </button>
  </div>
)
