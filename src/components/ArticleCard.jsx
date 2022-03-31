import { Button, Card } from 'antd'
import React, { Component } from 'react'

export default class ArticleCard extends Component {
    render() {
        return (
            <Card
                title={this.props.article.title}
                extra={<Button onClick={this.props.openModal}>Modifer</Button>}
                style={{ width: 300 }}
            >
                <p>{this.props.article.content}</p>
            </Card>
        )
    }
}
