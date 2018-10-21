import { IModernField } from "../../..";

export interface IModernBooleanEditFieldProps {
    field: IModernField;
    value: boolean;
    validate: any;

    onChange: any;
    errorMessage?: string;

}
