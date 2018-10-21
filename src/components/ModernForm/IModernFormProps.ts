import { IModernField, IModernLookup, IModernFieldGroup } from "../..";
import ModernFormValidator from "./ModernFormValidator";

export interface IModernFormProps {
    fields: IModernField[];
    item: any;
   // forceValidation?: boolean;
    language?: string;
    //onValidated: any;
    validator: ModernFormValidator;

    resolveSuggestions: (fieldId) => Promise<IModernLookup[]>;
    resolveLookup: (fieldId, search) => Promise<IModernLookup[]>;

    getNewOptionFieldGroups: (fieldId) => Promise<IModernFieldGroup[]>;
    getNewOptionItem: (fieldId) => Promise<any>;
    onSaveNewOption: (item) => Promise<IModernLookup[]>;

}
