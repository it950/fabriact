import { IModernField } from "../..";
import { Selection, IColumn, ColumnActionsMode } from "office-ui-fabric-react/lib/DetailsList";
import { IModernFilter, IModernLookup, IModernFieldGroup, IModernAction } from "../../Modern.Types";

export interface IModernDetailsListProps {
    items?: any[];
    fields?: IModernField[];
    viewItemGroups?: IModernFieldGroup[];

    onSelectionChanged?: (items) => void;
    onNextPage?: any;
    viewName?: string;
    language?: string;
    hasNextPage?: boolean;
    onGetFieldValue: any;

    idProperty: string;
    selection: Selection;
    onSortChanged: any;
    getFilterOptions: (fieldId: string) => Promise<IModernLookup[]>;
    onFilterChanged: (filters: IModernFilter[]) => Promise<any[]>;

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

    onUpdateItem: any;
    onDeleteItem: any;

    currentViewItem: any;

    getNewOptionFieldGroups: (fieldId) => Promise<IModernFieldGroup[]>;
    getNewOptionItem: (fieldId) => Promise<any>;
    onSaveNewOption: (item) => Promise<IModernLookup[]>;

    onGetItem?: (item) => Promise<any>;
    onActionClicked?: (id) => Promise<void>;

    resolveSuggestions?: (fieldId) => Promise<IModernLookup[]>;
    resolveLookup?: (fieldId, search) => Promise<IModernLookup[]>;

    viewItemActions?: IModernAction[];

    getNewActionFieldGroups: (fieldId) => Promise<IModernFieldGroup[]>;
    getNewActionItem: (fieldId) => Promise<any>;
    onSaveNewAction: (item) => Promise<any>;


}
