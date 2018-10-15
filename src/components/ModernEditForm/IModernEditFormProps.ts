import { IModernField } from "../..";

export interface IModernEditFormProps {
    fields: IModernField[];
    item: any;
    forceValidation?: boolean;
    language?: string;
    onValidated: any;
}
