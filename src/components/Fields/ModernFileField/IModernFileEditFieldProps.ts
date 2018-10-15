import { IModernField } from "../../../Modern.Types";

export interface IModernFileEditFieldProps {
    field: IModernField;
    value: any;
    onChange: any;
    validate: any;
    errorMessage?: string;
    domain: string;
}
