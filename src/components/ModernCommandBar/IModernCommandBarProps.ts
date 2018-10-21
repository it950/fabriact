import { IModernView, IModernLookup, IModernFieldGroup } from "../../Modern.Types";

export interface IModernCommandBarProps {
   
    hideSearch?: boolean;
    hideNew?: boolean;
    language?: string;
    hideDelete?: boolean;
    views?: IModernView[];
    searchValue?: string;
    selectedViewId?: string;
    selectedItemCount: number;
    onActionClicked?: (actionId) => void;
    onViewClicked?: (viewId) => Promise<void>;
    onViewTypeSwitch?: (viewType) => void;
   // onNewClicked?: () => void;
    onDeleteConfirmed?: () => void;
    onSearch?: (newValue) => void;
    onSearchCleared?: () => void;
    onViewOffsetChanged?: any;
    onExport?: any;

    resolveSuggestions?: (fieldId) => Promise<IModernLookup[]>;
    resolveLookup?: (fieldId, search) => Promise<IModernLookup[]>;
    newItemTitle?: string;
    newItemGroups?: IModernFieldGroup[];
    onNewItem?: () => Promise<any>;
    onSaveNewItem?: (newItem) => Promise<void>;

    getNewOptionFieldGroups: (fieldId) => Promise<IModernFieldGroup[]>;
    getNewOptionItem: (fieldId) => Promise<any>;
    onSaveNewOption: (item) => Promise<IModernLookup[]>;

    getNewActionFieldGroups: (fieldId) => Promise<IModernFieldGroup[]>;
    getNewActionItem: (fieldId) => Promise<any>;
    onSaveNewAction: (item) => Promise<any>;


}
