import { useState } from "react";

export const useForm = (initialForm = {}) => { //InitialForm es un prop, lo declara como diccionario vacio
    const [formState, setFormState] = useState( initialForm );

    const onInputChange = ({target}) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    }
}