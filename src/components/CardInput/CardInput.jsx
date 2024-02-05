import { useState } from 'react'
import styles from './CardInput.module.css'

function CardInput({ value, onChange, label, required, type, placeholderText }) {
    return (
        <label className={styles.label}>
            <p className={styles.label_text}>
                {label} {required && <span style={{ color: 'red' }}>*</span>}
            </p>
            <div className={styles.blockInput}>
                <input
                    type={type ?? 'text'}
                    required={Boolean(required)}
                    value={value}
                    onChange={onChange}
                    className={styles.input}
                    placeholder={placeholderText ?? "text"}
                />
            </div>
        </label>
    )
}

export default CardInput
