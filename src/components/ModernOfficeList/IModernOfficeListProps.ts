import { IModernFieldGroup, IModernAction, IModernView, IModernLookup } from "../..";

export interface IModernOfficeListProps {
    views?: IModernView[];
  
    newItemGroups?: IModernFieldGroup[];
    viewItemGroups?: IModernFieldGroup[];

    viewItemActions?: IModernAction[];
    items?: any[];
    hasNextPage?: boolean;
    defaultView?: string;
    language?: string;
    hideDelete?: boolean;
    hideNew?: boolean;

    newItemTitle?: string;

    itemTitleProperty?: string;
    itemDescriptionProperty?: string;
    itemColorProperty?: string;
    itemSecondaryDescriptionProperty?: string;
    itemImageProperty?: string;
    itemAuthorProperty?: string;
    itemEditorProperty?: string;
    itemCreatedProperty?: string;
    itemModifiedProperty?: string;
    itemIdProperty?: string;

    onViewOffsetChange?: (key) => Promise<any[]>;
    onViewChange?: (key) => Promise<any[]>;
    onNextPage?: (page) => Promise<any[]>;
    onSearch?: (search) => Promise<any[]>;
    getFilterOptions?: (field) => Promise<any[]>;
    onSortChanged?: (column, ascending) => Promise<any[]>;
    onFilterChanged?: (column, ascending) => Promise<any[]>;
    onGetItem?: (item) => Promise<any>;
    onSaveNewItem?: (newItem) => Promise<void>;
    onActionClicked?: (id) => Promise<void>;
    onExport?: () => Promise<any[]>;
    onNewItem?: () => Promise<any>;
    onUpdateItem?: (item) => Promise<void>;
    onDeleteItem?: (item) => Promise<void>;
    onGetFieldValue?: (fieldId, item) => Promise<any>;

    getNewOptionFieldGroups: (fieldId) => Promise<IModernFieldGroup[]>;
    getNewOptionItem: (fieldId) => Promise<any>;
    onSaveNewOption: (item) => Promise<IModernLookup[]>;

    getNewActionFieldGroups: (fieldId) => Promise<IModernFieldGroup[]>;
    getNewActionItem: (fieldId) => Promise<any>;
    onSaveNewAction: (item) => Promise<any>;


    resolveSuggestions?: (fieldId) => Promise<IModernLookup[]>;
    resolveLookup?: (fieldId, search) => Promise<IModernLookup[]>;
}
