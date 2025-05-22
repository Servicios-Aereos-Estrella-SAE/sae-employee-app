import { useState } from 'react'

const TextInputController = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  return {
    passwordVisible,
    togglePasswordVisibility
  }
}

export default TextInputController
