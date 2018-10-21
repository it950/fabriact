import { IModernField, IModernLookup } from "../../../Modern.Types";

export interface IModernLookupEditFieldProps {
    field: IModernField;
    value: any;
    onChange: any;
    validate: any;
    errorMessage?: string;
    resolveSuggestions: () => Promise<IModernLookup[]>;
    resolveLookup: (search) => Promise<IModernLookup[]>;
}
