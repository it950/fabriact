import { IModernField } from "../../../Modern.Types";

export interface IModernChoiceEditFieldProps {
    field: IModernField;
    value: any;
    onChange: any;
    validate: any;
    errorMessage?: string;
    icon?: string;
}
