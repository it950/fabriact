import { IModernFieldGroup, IModernLookup } from "../..";

export interface IModernNewItemPanelProps {
    //config?: ModernNewFormPanelConfig;

    groups?: IModernFieldGroup[];
    title?: string;
    isVisible?: boolean;
    onSaveNewItem?: (item) => Promise<void>;
    onItemSaved?: any;
    language?: string;
    item?: any;
    onDismiss?: any;


    resolveSuggestions: (fieldId) => Promise<IModernLookup[]>;
    resolveLookup: (fieldId, search) => Promise<IModernLookup[]>;

    getNewOptionFieldGroups: (fieldId) => Promise<IModernFieldGroup[]>;
    getNewOptionItem: (fieldId) => Promise<any>;
    onSaveNewOption?: (item) => Promise<IModernLookup[]>;
}
