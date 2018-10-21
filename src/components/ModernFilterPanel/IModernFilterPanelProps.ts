import { IModernFieldGroup, IModernLookup, IModernField } from "../..";

export interface IModernFilterPanelProps {
    //config?: ModernNewFormPanelConfig;

    field: IModernField;
    currentFilters: any[];
    isVisible?: boolean;
    onApply?: any;
    language?: string;
    onDismiss?: any;
    getFilterOptions: any;

}
