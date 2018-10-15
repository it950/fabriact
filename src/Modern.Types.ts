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

export interface IModernAction {
    key: string;
    name?: string;
    icon?: string;
}

export interface IModernField {
    type: ModernFieldType;
    key: string;
    name?: string;
    isArray?: boolean;
    errorMessage?: string;
    description?: string;
    icon?: string;
    required?: boolean;
    sortable?: boolean;
    filterable?: boolean;
    options?: IModernLookup[];
}

export interface IModernLookup {
    id: string;
    title: string;
}

export interface IModernFieldGroup {
    fields: IModernField[];
}

export interface IModernView {
    fields: IModernField[];
    key: string;
    name?: string;
    isDynamicView?: boolean;
}
