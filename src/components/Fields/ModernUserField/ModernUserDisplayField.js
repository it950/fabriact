"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var mobx_react_1 = require("mobx-react");
var Persona_1 = require("office-ui-fabric-react/lib/Persona");
var Facepile_1 = require("office-ui-fabric-react/lib/Facepile");
var ModernUserDisplayField = /** @class */ (function (_super) {
    __extends(ModernUserDisplayField, _super);
    function ModernUserDisplayField(props) {
        return _super.call(this, props) || this;
    }
    ModernUserDisplayField.prototype.render = function () {
        var _this = this;
        var html = React.createElement("span", null);
        if (this.props.value) {
            if (this.props.value.constructor === Array) {
                var users = this.props.value.map(function (t) {
                    return {
                        personaName: t.title,
                        imageUrl: t.image ? t.image : _this.props.placeholderImage
                    };
                });
                html = React.createElement(Facepile_1.Facepile, { personas: users, personaSize: Persona_1.PersonaSize.size32 });
            }
            else {
                var image = this.props.value.image ? this.props.value.image : this.props.placeholderImage;
                html = React.createElement(Persona_1.Persona, { text: this.props.value.title, secondaryText: this.props.value.description, showSecondaryText: this.props.value.description != null, imageUrl: image, size: Persona_1.PersonaSize.size32 });
            }
        }
        return (React.createElement("span", null, html));
    };
    ModernUserDisplayField = __decorate([
        mobx_react_1.observer
    ], ModernUserDisplayField);
    return ModernUserDisplayField;
}(React.Component));
exports.ModernUserDisplayField = ModernUserDisplayField;
//# sourceMappingURL=ModernUserDisplayField.js.map