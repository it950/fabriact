"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const DetailsList_1 = require("office-ui-fabric-react/lib/DetailsList");
class ModernDetailsListConfig {
    constructor(items = null) {
        this.onSelectChanged = () => {
            this.selectedItems = this.selection.getSelection();
        };
        this.items = items;
        this.selection = new DetailsList_1.Selection({ onSelectionChanged: this.onSelectChanged });
    }
    get selectedItemCount() {
        if (this.selectedItems) {
            return this.selectedItems.length;
        }
        return 0;
    }
}
__decorate([
    mobx_1.observable
], ModernDetailsListConfig.prototype, "selectedItems", void 0);
__decorate([
    mobx_1.observable
], ModernDetailsListConfig.prototype, "items", void 0);
__decorate([
    mobx_1.observable
], ModernDetailsListConfig.prototype, "pages", void 0);
__decorate([
    mobx_1.action
], ModernDetailsListConfig.prototype, "onSelectChanged", void 0);
__decorate([
    mobx_1.computed
], ModernDetailsListConfig.prototype, "selectedItemCount", null);
exports.default = ModernDetailsListConfig;
//# sourceMappingURL=ModernDetailsListConfig.js.map