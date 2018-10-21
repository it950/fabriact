import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernDateDisplayFieldProps } from './IModernDateDisplayFieldProps';
import * as moment from 'moment';

@observer
export class ModernDateDisplayField extends React.Component<IModernDateDisplayFieldProps, any> {


    constructor(props: IModernDateDisplayFieldProps) {
        super(props);

        if (this.props.language == "nl-NL") {
            moment.locale('nl');
        }
    }

    render() {

        var result = <span></span>;

        if (this.props.value) {
            let tooltip = moment(this.props.value).format("ddd D MMM YYYY");

            if (this.props.asTimeAgo) {
             //   result = <TimeAgo date={new Date(this.props.value)} title={tooltip} />;
                result = <span>{moment(this.props.value).fromNow()}</span>;
            }
            else {
                result = <span>{moment(this.props.value).format("ddd D MMM YYYY")}</span>;
               
            }
        }

        return (
            <span>{result}</span>
        );
    }
}