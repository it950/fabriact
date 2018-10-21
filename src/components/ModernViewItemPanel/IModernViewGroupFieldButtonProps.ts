import { IModernField } from "../../Modern.Types";

export interface IModernViewGroupFieldButtonProps {
    field: IModernField; 
    onEditClicked: any;
    onMoreClicked: any;
    onActionClicked: any;
    language?: string;

}