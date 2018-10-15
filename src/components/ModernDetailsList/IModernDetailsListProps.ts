import { IModernField } from "../..";

export interface IModernDetailsListProps {
    items?: any[];
    fields?: IModernField[];

    onSelectionChanged?: (items) => void;
}
