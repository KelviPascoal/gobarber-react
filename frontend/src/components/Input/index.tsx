import { InputHTMLAttributes, useEffect, useRef } from "react";
import { Container, Error } from './styles'
import {IconBaseProps} from 'react-icons'
import { useState } from "react";
import { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";
import { useCallback } from "react";
import { FiAlertCircle } from 'react-icons/fi'

interface Input extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
    register: UseFormRegister<any>;
    validation?: RegisterOptions;
    errors?: FieldErrors<any>;
}

export const Input = ({name, icon: Icon, register, errors, validation , ...rest }: Input) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);

            setIsFilled(!! inputRef.current?.value);
    }, [])

    console.log(errors);
    


    return (
        <Container isErrored={!! errors} isFilled={isFilled} isFocused={isFocused}>
            {Icon && <Icon size={20}/>}
            <input 
            {...register(name, validation)}
            
            onFocus={() => setIsFocused(true)}
            onBlur={handleInputBlur}
            {...rest} 
            ref={inputRef}
            />
            {errors && <Error title={errors.message}>
                <FiAlertCircle color="#c53030" size={20}/>
            </Error>
            }

        </Container>
    );
}
