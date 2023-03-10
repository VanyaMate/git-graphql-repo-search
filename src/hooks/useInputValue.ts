import {useEffect, useState} from "react";

export interface IUseInputValue {
    value: string;
    onChange: (s: string) => void;
    valid: boolean;
}

export const useInputValue = function ( defaultValue: string, validator?: (s: string) => boolean ): IUseInputValue {
    const [value, setValue] = useState<string>(defaultValue);
    const [valid, setValid] = useState<boolean>(validator ? validator(defaultValue) : true);

    useEffect(() => {
        setValid(validator ? validator(value) : true);
    }, [value])

    return { value, onChange: setValue, valid };
}