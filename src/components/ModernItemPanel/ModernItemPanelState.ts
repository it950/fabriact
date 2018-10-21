import { observable, computed, action } from "mobx";
import { ImageLoadState } from "office-ui-fabric-react/lib/Image";
import ModernState from "../../utilities/ModernState";

export default class ModernItemPanelState extends ModernState {

    @observable
    item: any;

    @observable
    titleProperty: string;

    @observable
    descriptionProperty: string;

    @observable
    imageError: boolean;

    @observable
    secondaryDescriptionProperty: string;

    @observable
    colorProperty: string;

    @observable
    imageProperty: string;

    @computed
    get color() {
        if (this.item && this.colorProperty && this.item[this.colorProperty]) {
            return this.item[this.colorProperty];
        }

        return "#5f6163";
    }

    @computed
    get image() {
        if (this.item && this.imageProperty) {
            return this.item[this.imageProperty];
        }

        return null;
    }

    @computed
    get description() {
        if (this.item && this.descriptionProperty) {
            return this.item[this.descriptionProperty];
        }

        return null;
    }

    @computed
    get secondaryDescription() {
        if (this.item && this.secondaryDescriptionProperty) {
            return this.item[this.secondaryDescriptionProperty];
        }

        return null;
    }

    @computed
    get title() {
        if (this.item && this.titleProperty) {
            return this.item[this.titleProperty];
        }

        return null;
    }

    
    constructor(item, titleProperty, descriptionProperty, secondaryDescriptionProperty, colorProperty, imageProperty, language = null) {
        super(language);

        this.item = item;
        this.colorProperty = colorProperty;
        this.descriptionProperty = descriptionProperty;
        this.imageProperty = imageProperty;
        this.secondaryDescriptionProperty = secondaryDescriptionProperty;
        this.titleProperty = titleProperty;
    }


    @action
    public imageStateChanged = (newState) => {
        if (newState == ImageLoadState.error) {
            this.imageError = true;
        }
    }

  

}