import React from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'

import { useForm } from '../Form'
import Icon from '../Icon'

const CommentForm = (props) => {
    const _p = { 
        resize: 'vertical',
        ...props,

        inputProps: {
            as: 'textarea',
            rows: 2,
            maxLength: 255,
            placeholder: 'Type your a message...',
            ...props.inputProps
        },
        buttonProps: {
            variant: 'primary',
            ...props.buttonProps
        },
        buttonIconProps: {
            name: 'send',
            ...props.buttonIconProps
        },
    };

    const form = useForm(_p);
  
    return <>
        <Form
            onSubmit={form.submit}
        >
            <InputGroup>
                <Form.Control 
                    {..._p.inputProps}
                    style={{ resize: _p.resize }}
                />

                <Button {..._p.buttonProps} type='submit'>
                    <Icon {..._p.buttonIconProps} />
                </Button>
            </InputGroup>
        </Form>
    </>
}

export { CommentForm }