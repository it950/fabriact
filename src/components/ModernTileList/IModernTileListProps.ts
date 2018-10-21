import { IModernField } from "../..";

export interface IModernTileListProps {
    items?: any[];
    fields?: IModernField[];

    onSelectionChanged?: (items) => void;
    onNextPage: any;
}
