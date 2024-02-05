import { useState } from 'react'
import styles from './ChooseBlockForm.module.css'

function ChooseBlockForm({ arr, currency, placeholder, onchange, onchangeInput }) {
    return (
        <div className={styles.container}>
            <div className={styles.label}>

            </div>
            <div className={styles.block}>
                {arr?.map((e, id) => {
                    return (
                        <div
                            key={id}
                            className={styles.selectedPrice}
                            onClick={() => onchange(currency, e)}
                        >{e} USD</div>
                    )
                })}
                <input
                    placeholder={placeholder}
                    onChange={(e) => onchangeInput(currency, e)}
                    className={styles.input}
                />
            </div>
        </div>
    )
}

export default ChooseBlockForm
