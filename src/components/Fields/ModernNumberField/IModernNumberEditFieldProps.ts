import { IModernField } from "../../..";

export interface IModernNumberEditFieldProps {
    field: IModernField;
    value: any;
    validate: any;

    onChange: any;
    errorMessage?: string;

}
