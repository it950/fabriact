import { IModernOfficeListConfig } from "./IModernOfficeListConfig";
import ModernCommandBarConfig from "../ModernCommandBar/ModernCommandBarConfig";
import { observable } from "mobx";

export default class ModernOfficeListConfig {

    commandBarConfig: ModernCommandBarConfig;

    constructor(config: IModernOfficeListConfig) {
        this.views = config.views;

        this.commandBarConfig = new ModernCommandBarConfig({
            views: this.views,
            actions: config.actions
        });

    }

    @observable
    views: any[];
 

}