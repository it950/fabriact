import { SelectionMode } from "office-ui-fabric-react/lib/DetailsList";

export enum ModernFieldType {
    text = 0,
    url = 1,
    email = 2,
    lookup = 3,
    boolean = 4,
    integer = 5,
    user = 6,
    dateTime = 7,
    number = 8,
    image = 9,
    phone = 10,
    multiLine = 11,
    choice = 12,
    percent = 13,
    currency = 14,
    managedMetadata = 15,
    calculated = 16,
    file = 17,
    color = 18,
    login = 19
}

export enum ModernActionType {
    form = 0,
    custom = 1
}

export interface IModernAction {
    key: string;
    type: ModernActionType;
    selectionMode?: SelectionMode;
    name?: string;
    icon?: string;
    redirectUrl?: string;
}

export interface IModernField {
    type: ModernFieldType;
    key: string;
    name?: string;
    multiSelect?: boolean;
    errorMessage?: string;
    description?: string;
    icon?: string;
    domain?: string;
    asyncValue?: boolean;
    required?: boolean;
    sortable?: boolean;
    readOnly?: boolean;
    hideInViewForm?: boolean;
    editGroupTrigger?: boolean;
    asTimeAgo?: boolean;
    newOptionItems?: boolean;
    filterable?: boolean;
    options?: IModernLookup[];
    embeddedFields?: IModernField[];
    action?: IModernAction;
}

export interface IModernLookup {
    id: string;
    title: string;
    description?: string;
}

export interface IModernFile {
    id: string;
    title: string;
    link?: string;
    // base64?: string;
    file?: File;
}

export interface IModernFilter {
    field: string;
    values: any[];
}

export interface IModernSort {
    field: string;
    ascending: boolean;
}

export interface IModernFieldGroup {
    fields: IModernField[];
    id: string;
    description: string;
}

export interface IModernView {
    actions?: IModernAction[];
    fields: IModernField[];
    key: string;
    name?: string;
    isDynamicView?: boolean;
}


export interface IModernLookup {
    id: string;
    title: string;
    image?: string;
    secondaryText?: string;
}
