import { IModernField } from "../../../Modern.Types";

export interface IModernEmailEditFieldProps {
    field: IModernField;
    value: any;
    onChange: any;
    validate: any;
    errorMessage?: string;
}
