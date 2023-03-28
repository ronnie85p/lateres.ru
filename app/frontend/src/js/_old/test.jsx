import React from 'react'
import Button from 'react-bootstrap/Button'

export default (props) => <>
    <div className="test">
        <Button variant={'primary'} onClick={props.addToCart}>Button1</Button>
    </div>
</>;