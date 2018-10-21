import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernUserDisplayFieldProps } from './IModernUserDisplayFieldProps';
import { PersonaSize, Persona } from 'office-ui-fabric-react/lib/Persona';
import { Facepile, IFacepilePersona, IFacepileProps } from 'office-ui-fabric-react/lib/Facepile';

@observer
export class ModernUserDisplayField extends React.Component<IModernUserDisplayFieldProps, any> {


    constructor(props: IModernUserDisplayFieldProps) {
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


        let html = <span></span>;

        if (this.props.value) {
            if (this.props.value.constructor === Array) {

                var users = this.props.value.map(t => {
                    return {
                        personaName: t.title,
                        imageUrl: t.image
                    };
                });

                html = <Facepile personas={users} personaSize={PersonaSize.size32} />;

            }
            else {
                html = <Persona
                    text={this.props.value.title}
                    secondaryText={this.props.value.description}
                    showSecondaryText={this.props.value.description != null}
                    imageUrl={this.props.value.image}
                    size={PersonaSize.size32}
                />
            }

      
        }

        return (
            <span>{html}</span>
        );
    }
}