import ModernNewFormPanelConfig from "./ModernNewFormPanelConfig";
import { IModernFieldGroup } from "../..";

export interface IModernNewFormPanelProps {
    //config?: ModernNewFormPanelConfig;

    groups?: IModernFieldGroup[];
    title?: string;
    isVisible?: boolean;
    onSaveNewItem?: (item) => Promise<void>;
    onItemSaved?: any;
    language?: string;
    item?: any;
    onDismiss?: any;
}
