import React, { useEffect, useRef, useState } from 'react'
import styles from './Login.module.css'

interface MaterialTextFieldProps {
  icon: string
  labelText: string
  type: string
  inputRef: React.RefObject<HTMLInputElement>
}

const MaterialTextField: React.FC<MaterialTextFieldProps> = ({
  icon,
  labelText,
  type,
  inputRef,
}) => {
  return (
    <div className={styles.materialTextField}>
      <i className={styles.materialIcon}>
        <img className={styles.icon} alt="" src={icon} />
      </i>
      <input
        placeholder=" "
        type={type}
        ref={inputRef}
      />
      <label>{labelText}</label>
    </div>
  )
}

export default MaterialTextField
