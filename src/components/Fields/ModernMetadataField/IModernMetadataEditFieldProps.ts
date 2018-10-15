import { IModernField } from "../../../Modern.Types";

export interface IModernMetadataEditFieldProps {
    field: IModernField;
    value: any;
    onChange: any;
    validate: any;
    errorMessage?: string;
    icon?: string;
}
