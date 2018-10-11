
export interface IModernCommandBarConfig {
    actions: any[];
    hideSearch?: boolean;
    hideNew?: boolean;
    hideDelete?: boolean;
    views?: any[];
    searchPlaceholder?: string;
    searchValue?: string;

    onActionClicked?: (actionId) => void;
    onViewClicked?: (viewId) => void;
    onViewTypeSwitch?: (viewType) => void;
    onNewClicked?: () => void;
    onDeleteClicked?: () => void;
    onSearch?: (newValue) => void;
    onSearchCleared?: () => void;

}
