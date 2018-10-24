import { IModernFieldGroup } from "../..";
import { IModernAction, IModernLookup } from "../../Modern.Types";

export interface IModernViewItemPanelProps {
    //config?: ModernNewFormPanelConfig;

    groups?: IModernFieldGroup[];
    actions?: IModernAction[];
    titleProperty?: string;
    descriptionProperty?: string;
    secondaryDescriptionProperty?: string;
    colorProperty?: string;
    imageProperty?: string;
    authorProperty?: string;
    editorProperty?: string;
    createdProperty?: string;
    modifiedProperty?: string;
    isVisible?: boolean;
    language?: string;
    item?: any;
    hideDelete?: boolean;
    onDismiss?: any;
    onActionClick?: any;
    onGetFieldValue: any;

    resolveLookup: any;
    resolveSuggestions: any;
    onUpdateItem: any;
    onDeleteItem: any;
    onGetItem: any;
    
    getNewOptionFieldGroups: (fieldId) => Promise<IModernFieldGroup[]>;
    getNewOptionItem: (fieldId) => Promise<any>;
    onSaveNewOption: (item) => Promise<IModernLookup[]>;

    getNewActionFieldGroups: (fieldId, items) => Promise<IModernFieldGroup[]>;
    getNewActionItem: (fieldId, items) => Promise<any>;
    onSaveNewAction: (item) => Promise<any>;

    placeholderImage?: string;
}
