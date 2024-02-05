import { useState } from 'react'
import styles from './CardTextArea.module.css'

function CardTextArea({ value, onChange, label, required, type, placeholderText, rows }) {
    return (
        <label className={styles.label}>
            <p className={styles.label_text}>
                {label} {required && <span style={{color: 'red'}}>*</span>}
            </p>
            <div className={styles.blockInput}>
            <textarea
                type={type ?? 'text'}
                required={Boolean(required)}
                value={value}
                onChange={onChange}
                className={styles.input}
                placeholder={placeholderText ?? "text"}
                rows={rows ?? 2}
            />
            </div>
        </label>
    )
}

export default CardTextArea
