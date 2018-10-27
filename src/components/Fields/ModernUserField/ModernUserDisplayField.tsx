import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernUserDisplayFieldProps } from './IModernUserDisplayFieldProps';
import { PersonaSize, Persona } from 'office-ui-fabric-react/lib/Persona';
import { Facepile } from 'office-ui-fabric-react/lib/Facepile';

@observer
export class ModernUserDisplayField extends React.Component<IModernUserDisplayFieldProps, any> {


    constructor(props: IModernUserDisplayFieldProps) {
        super(props);
    }

    render() {
        
        let html = <span></span>;

        if (this.props.value) {
            if (this.props.value.constructor === Array) {

                var users = this.props.value.map(t => {
                    return {
                        personaName: t.title,
                        imageUrl: t.image ? t.image : this.props.placeholderImage
                    };
                });

                html = <Facepile personas={users} personaSize={PersonaSize.size32} />;

            }
            else {
                const image = this.props.value.image ? this.props.value.image : this.props.placeholderImage;

                html = <Persona
                    text={this.props.value.title}
                    secondaryText={this.props.value.description}
                    showSecondaryText={this.props.value.description != null}
                    imageUrl={image}
                    size={PersonaSize.size32}
                />
            }

      
        }

        return (
            <span>{html}</span>
        );
    }
}