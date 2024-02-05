import { useState } from 'react'
import styles from './CardSelect.module.css'

function CardSelect({ onChange, label, required, options, autocomplete, placeholder }) {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
        onChange(event)
    };
    return (
        <label className={styles.label}>
            <p className={styles.label_text}>
                {label} {required && <span style={{ color: 'red' }}>*</span>}
            </p>
            <div className={styles.blockInput}>
                <select
                    value={value}
                    onChange={handleChange}
                    className={styles.select}
                    autoComplete={autocomplete ? 'on' : 'off'}>
                    {!autocomplete && <option value="" disabled>{placeholder}</option>}
                    {
                        options?.map((e, id) => {
                            return (
                                <option value={e} key={id}>{e}</option>
                            )
                        })
                    }
                </select>
            </div>
        </label>
    )
}

export default CardSelect
