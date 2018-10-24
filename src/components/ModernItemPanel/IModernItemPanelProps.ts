import { IModernAction } from "../../Modern.Types";

export interface IModernItemPanelProps {

  //  title: string;
    image?: string;
  //  secondaryDescription?: string;
  //  description?: string;
    item: any;
    descriptionProperty?: string;
    secondaryDescriptionProperty?: string;
    imageProperty?: string;
    titleProperty?: string;
    colorProperty?: string;
    isVisible?: boolean;
    onDismiss?: any;
    actions?: IModernAction[];
    language?: string;
    renderFooter?: any;
    onActionClick?: any;
    placeholderImage?: string;

  //  onRenderFooterContent: any;

}
