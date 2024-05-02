import { Button } from 'antd'
import React from 'react'

const ButtonComponent = ({ size, stylebutton,disabled,
     styletextbutton,textbutton, ...rests }) => {
  return (
    <Button
        size={size} 
        style={{...stylebutton, 
        background: disabled ? "#ccc" : stylebutton.background}}
        {...rests}
      >
        <span style={styletextbutton}>{textbutton}</span>
      </Button>
  )
}

export default ButtonComponent