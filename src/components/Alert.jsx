import React from 'react'

export default function Alert(props) {
  return (
    <div>
      <div className={`alert alert-${props.alert.type} text-center`} role='alert'>
        {props.alert.message}
      </div>
    </div>
  )
}
