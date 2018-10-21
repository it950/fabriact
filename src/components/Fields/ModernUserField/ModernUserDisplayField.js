"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const Persona_1 = require("office-ui-fabric-react/lib/Persona");
const Facepile_1 = require("office-ui-fabric-react/lib/Facepile");
let ModernUserDisplayField = class ModernUserDisplayField extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        //if (props.value != null) {
        //    if (props.isArray) {
        //        if (props.value.length > 0) {
        //            let users = props.value.map(a => {
        //                return {
        //                    personaName: a.PsaTitle,
        //                    imageUrl: a.PsaImage
        //                };
        //            });
        //            return (
        //                <Label>
        //                    <Facepile personas={users} personaSize={PersonaSize.size32} />
        //                </Label>
        //            );
        //        }
        //    }
        //    else {
        //        return (
        //            <Label>
        //                <Persona
        //                    text={props.value.PsaTitle}
        //                    secondaryText={props.value.PsaDescription}
        //                    showSecondaryText={props.value.PsaDescription != null}
        //                    imageUrl={props.value.PsaImage}
        //                    size={PersonaSize.size32}
        //                />
        //            </Label>
        //        );
        //    }
        //}
        let html = React.createElement("span", null);
        if (this.props.value) {
            if (this.props.value.constructor === Array) {
                var users = this.props.value.map(t => {
                    return {
                        personaName: t.title,
                        imageUrl: t.image
                    };
                });
                html = React.createElement(Facepile_1.Facepile, { personas: users, personaSize: Persona_1.PersonaSize.size32 });
            }
            else {
                html = React.createElement(Persona_1.Persona, { text: this.props.value.title, secondaryText: this.props.value.description, showSecondaryText: this.props.value.description != null, imageUrl: this.props.value.image, size: Persona_1.PersonaSize.size32 });
            }
        }
        return (React.createElement("span", null, html));
    }
};
ModernUserDisplayField = __decorate([
    mobx_react_1.observer
], ModernUserDisplayField);
exports.ModernUserDisplayField = ModernUserDisplayField;
//# sourceMappingURL=ModernUserDisplayField.js.map