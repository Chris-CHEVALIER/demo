import React from 'react';
import logo from './logo.png';
import './App.css';
import AddButton from './components/AddButton';
import { EditOutlined } from '@ant-design/icons';
import ArticleModal from './components/ArticleModal';
import Fire from './Fire';
import { Spin } from 'antd';
import ArticleCard from './components/ArticleCard';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isModalVisible: false,
      articles: [],
      loading: true,
      error: null,
      selectedArticle: null
    }
  }

  componentDidMount() {
    const firebase = new Fire(err => {
      if (err) {
        this.setState({ error: err });
      } else {
        firebase.getArticles(articles => {
          this.setState({
            articles: articles,
            loading: false
          });
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Bienvenue sur Coding News</p>

          {this.state.loading && <Spin />}
          <div style={{ display: "flex" }}>
            {this.state.articles.map(article => (
              <ArticleCard article={article} openModal={() => this.setState({ isModalVisible: true, selectedArticle: article })} />
            ))}
          </div>
          <AddButton
            content="Rédiger un article"
            handleClick={() => this.setState({ isModalVisible: true })}
            size="large"
            shape="round"
            icon={<EditOutlined />}
            tooltip="Publier un article"
          />
          {this.state.isModalVisible && (
            <ArticleModal
              isVisible={this.state.isModalVisible}
              handleOk={() => this.setState({ isModalVisible: false })}
              handleCancel={() => this.setState({ isModalVisible: false })}
              article={this.state.selectedArticle}
            />
          )}
        </header>
      </div>
    );
  }
}