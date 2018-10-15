import { IModernFieldGroup, IModernAction, IModernView } from "../..";

export interface IModernOfficeListProps {
    views?: IModernView[];
    actions?: IModernAction[];
    newItemGroups?: IModernFieldGroup[];
    viewItemGroups?: IModernFieldGroup[];
    items?: any[];
    totalPages?: number;
    defaultView?: string;
    language?: string;
    hideDelete?: boolean;
    hideNew?: boolean;

    newItemTitle?: string;

    onViewChange?: (key) => Promise<any[]>;
    onSearch?: (search) => Promise<any[]>;
    onSaveNewItem?: (newItem) => Promise<void>;
    onNewItem?: () => Promise<any>;
    onDeleteItem?: (item) => Promise<void>;
}
