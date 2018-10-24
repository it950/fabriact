import { IModernField } from "../../..";

export interface IModernDisplayFieldProps {
    field: IModernField;
//    value: any;
    item: any;
    onGetFieldValue?: any;
    language?: string;
    placeholderImage?: string;
}
