import { IModernField } from "../../Modern.Types";

export interface IModernViewGroupProps {
    id: string;
    fields: IModernField[];
    item: any;
    onGetFieldValue: any;
    onEditClicked: any;
    onMoreClicked: any;
    onActionClicked: any;
    language: string;
}