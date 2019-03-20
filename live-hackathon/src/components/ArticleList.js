import React from "react";
import MyList from "./List"

class MyArticleList extends React.Component {
    state = {
        articles: [],
        query: null
    }

    handleChange = (event) => {
        this.setState({
            query: event.target.value
        });
    } 

    componentDidMount() {
        /* fetch('murl', {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
            body: {
                param1: "myvalue1"
            }
        })
        .then((response) => response.json())
        .then(data => this.setState({articles: data.articles}));*/
        setTimeout(() => this.setState({articles: [
            {title: "Ton Article 1"},
            {title: "Mon Article 2"},
            {title: "Mes Article 3"},
            {title: "Mon Article 4"},
        ]}), 2000);
    }

    componentDidUpdate() {
        /* fetch('murl?query='+this.state.query, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
            body: {
                param1: "myvalue1"
            }
        })
        .then((response) => response.json())
        .then(data => this.setState({articles: data.articles}));*/
        //setTimeout(() => this.setState({articles: [
        //    {title: "Ton Article 1"},
        //    {title: "Mon Article 2"},
        //    {title: "Mes Article 3"},
        //    {title: "Mon Article 4"},
        //].filter(article => 
        //    this.state.query ? 
        //    article.title.startsWith(this.state.query)
        //    : true
        //    )}), 2000);
    }

    render() {
        return <React.Fragment>
                <input onChange={this.handleChange} />
                <MyList data={this.state.articles.filter(article => 
            this.state.query ? 
            article.title.startsWith(this.state.query)
            : true
            )} text="title"/>
            </React.Fragment>;
    }
}

export default MyArticleList;