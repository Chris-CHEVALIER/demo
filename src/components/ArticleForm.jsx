import React, { Component } from 'react';
import { Input } from 'antd';
const {TextArea} = Input;

export default class ArticleForm extends Component {
    render() {
        return (
            <form>
                <label htmlFor="title">Titre</label>
                <Input type="text" name="title" id="title" placeholder="Titre de l'article" value={this.props.title} onChange={this.props.handleChange} />
                <label htmlFor="content">Contenu</label>
                <TextArea name="content" id="content" rows="10" placeholder="Contenu de l'article" value={this.props.content} onChange={this.props.handleChange}></TextArea>
            </form>
        )
    }
}
