import { IModernField } from "../../..";

export interface IModernDateEditFieldProps {
    field: IModernField;
    value: any;
    validate: any;

    onChange: any;
    errorMessage?: string;

}
