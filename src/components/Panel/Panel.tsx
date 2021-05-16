import React from 'react'
import cx from 'classnames'
import { Tab } from '../../types'
import styles from './Panel.module.css'

export interface PanelProps {
  tabs: Tab[]
  selectedTabName: Tab['name']
  className?: string,
  children: React.ReactNode
  onChangeTab: (tabName: Tab['name']) => void
}

export const Panel = ({
  tabs,
  selectedTabName,
  className,
  children,
  onChangeTab
}: PanelProps) => (
  <div className={cx(styles.root, className)}>
    <div className={styles.tabs}>
      {tabs.map(tab => (
        <button
          key={tab.name}
          className={cx(
            styles.tab,
            tab.name === selectedTabName && styles.active
          )}
          type="button"
          onClick={() => onChangeTab(tab.name)}
        >
          {tab.text} ({tab.items.length})
        </button>
      ))}
    </div>
    <div className={styles.content}>
      {children}
    </div>
  </div>
)
