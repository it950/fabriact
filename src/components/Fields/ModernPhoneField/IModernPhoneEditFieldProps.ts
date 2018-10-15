import { IModernField } from "../../../Modern.Types";

export interface IModernPhoneEditFieldProps {
    field: IModernField;
    value: any;
    onChange: any;
    validate: any;
    errorMessage?: string;
}
