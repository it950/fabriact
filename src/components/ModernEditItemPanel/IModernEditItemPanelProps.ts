import { IModernField, IModernLookup, IModernFieldGroup } from "../../Modern.Types";

export interface IModernEditItemPanelProps {
    //config?: ModernNewFormPanelConfig;

    title?: string;
    fields?: IModernField[];

    isVisible?: boolean;
    language?: string;
    item?: any;
    onDismiss?: any;
    titleProperty?: string;
    descriptionProperty?: string;
    secondaryDescriptionProperty?: string;
    colorProperty?: string;
    imageProperty?: string;

    onUpdateItem: any;
    resolveSuggestions: (fieldId) => Promise<IModernLookup[]>;
    resolveLookup: (fieldId, search) => Promise<IModernLookup[]>;

    getNewOptionFieldGroups: (fieldId) => Promise<IModernFieldGroup[]>;
    getNewOptionItem: (fieldId) => Promise<any>;
    onSaveNewOption: (item) => Promise<IModernLookup[]>;
}
