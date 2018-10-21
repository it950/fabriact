import { IModernField, IModernLookup } from "../../..";

export interface IModernEditFieldProps {
    field: IModernField;
    value: any;
    onChange: any;
    validate: any;
    errorMessage: string;
    language?: string;

    resolveSuggestions: (fieldId) => Promise<IModernLookup[]>;
    resolveLookup: (fieldId, search) => Promise<IModernLookup[]>;

    onNewOption: any;
}
