import { IModernField } from "../../../Modern.Types";

export interface IModernMultiLineEditFieldProps {
    field: IModernField;
    value: any;
    onChange: any;
    validate: any;
    errorMessage?: string;
    icon?: string;
}
