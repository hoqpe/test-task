import styles from './Tag.module.css'

export interface TagProps {
  name: string
  disabled?: boolean
  onClick?: () => void
}

export const Tag = ({ name, disabled, onClick }: TagProps) => (
  <button
    className={styles.root}
    type="button"
    disabled={disabled}
    onClick={onClick}
  >
    #{name}
  </button>
)
