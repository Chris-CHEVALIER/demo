import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import ArticleForm from './ArticleForm';
import Fire from '../Fire';

export default class ArticleModal extends Component {
    constructor(props) {
        super();
        this.state = {
            title: props.article ? props.article.title : "",
            content: props.article ? props.article.content : "",
            error: null
        }
    }

    handleChange = (e) => {
        switch (e.target.name) {
            case "title":
                this.setState({ title: e.target.value });
                break;
            case "content":
                this.setState({ content: e.target.value });
                break;
            default:
                break;
        }
    }

    handleSubmit = () => {
        //alert("Titre : " + this.state.title + "\nContenu : " + this.state.content);
        const firebase = new Fire(err => {
            if (err) {
                this.setState({ error: err });
            } else {
                const newArticle = {
                    title: this.state.title,
                    content: this.state.content,
                    created_at: new Date(),
                    comments: []
                }
                if (this.props.article) {
                    let updatedArticle = this.props.article;
                    updatedArticle.title = this.state.title;
                    updatedArticle.content = this.state.content;
                    updatedArticle.created_at = new Date();
                    firebase.updateArticle(updatedArticle);
                } else {
                    firebase.addArticle(newArticle);
                }
            }
        });
        this.props.handleCancel();
    }

    render() {
        return (
            <Modal title="Ajouter un article" visible={this.props.isVisible} footer={<Button type="primary" onClick={this.handleSubmit}>Valider</Button>} onCancel={this.props.handleCancel} >
                <ArticleForm title={this.state.title} content={this.state.content} handleChange={this.handleChange} />
            </Modal>
        )
    }
}
