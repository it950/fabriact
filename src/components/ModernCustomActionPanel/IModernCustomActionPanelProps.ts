import { IModernAction } from "../../Modern.Types";

export interface IModernCustomActionPanelProps {
    isVisible?: boolean;
    language?: string;
    item?: any;
    onDismiss?: any;
    titleProperty?: string;
    descriptionProperty?: string;
    secondaryDescriptionProperty?: string;
    colorProperty?: string;
    imageProperty?: string;

    renderCustomAction: any;
    action: IModernAction;
}
