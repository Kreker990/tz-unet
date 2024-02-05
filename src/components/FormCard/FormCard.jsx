import { useState } from 'react'
import styles from './FormCard.module.css'

function FormCard({ title, inputs, content, price }) {
  return (
    <div className={styles.container}>
      <div className={styles.form_group}>
        <div className={styles.content_label}></div>
        <h3 className={styles.title}>{title ?? 'not Found'}</h3>
      </div>
      {inputs}
      {content && <div className={styles.form_group}>
        <div className={styles.content_label}></div>
        <div className={styles.content}>{content}</div>
      </div>}
    </div>
  )
}

export default FormCard