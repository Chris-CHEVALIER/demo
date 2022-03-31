import React from "react";
import { Button, Tooltip } from 'antd';

export default class AddButton extends React.Component {
    render() {
        return (
            <Tooltip title={this.props.tooltip}>
                <Button
                    onClick={this.props.handleClick}
                    type="primary"
                    size={this.props.size}
                    shape={this.props.shape}
                    icon={this.props.icon}
                >
                    {this.props.content}
                </Button>
            </Tooltip>
        );
    }
}