import { InputHTMLAttributes } from "react";
import { Container } from './styles'
import {IconBaseProps} from 'react-icons'
import { useField } from '@unform/core';
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useCallback } from "react";

interface Input extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
}

export const Input = ({name, icon: Icon, ...rest }: Input) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)
    const { fieldName, defaultValue, error, registerField } = useField(name);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);

            setIsFilled(!! inputRef.current?.value);
    }, [])

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        })
    }, [fieldName, registerField])

    return (
        <Container isFilled={isFilled} isFocused={isFocused}>
            {Icon && <Icon size={20}/>}
            <input 
            onFocus={() => setIsFocused(true)}
            onBlur={handleInputBlur}
            ref={inputRef} 
            {...rest} 
            />
        </Container>
    );
}
