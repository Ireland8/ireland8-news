import React from 'react';
import ReactDOM from 'react-dom';
import Masonry from 'react-masonry-component';
import $ from 'jquery';

var masonryOptions = {
    transitionDuration: 0
};

export class ItemList extends React.Component{
  constructor(props) {
      super(props);
      this.state = {loading: true, error: null, data: null}
  }

  componentDidMount() {
    this.props.promise.then(
      value => this.setState({loading: false, data: value}),
      error => this.setState({loading: false, error: error}));
  }
  
  render() {
    if (this.state.loading) {
      return (
        <div className="loader">
            <div className="loader-inner ball-grid-pulse">
                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
        </div>
      );
    }
    else if (this.state.error !== null) {
      return <span className="error">Error: {this.state.error.message}</span>;
    }
    else {
      let items = this.state.data.articles;
      var itemList = items.map(function (item) {
        return (
        <div className="news" key={item._id}>
            <a href={item.url} target="_self">
                <div className="news-img">
                    <img src={item.thumb_url} width="220px"/>
                </div>
                <div className="news-title">
                    <span className="title">{item.title}</span>
                </div>
                <div className="news-date">
                    <span className="date">{item.update_time}</span>
                </div>
            </a>
        </div>
        );
      });
      
      return (
        <Masonry
                className={'list'} // default ''
                elementType={'div'} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
        >
          {itemList}
        </Masonry>
      );
    }
  }
}

ReactDOM.render(
  <ItemList promise={$.getJSON('https://api.ireland8.com/news?page=0&perpage=500')}/>,
  document.getElementById('news-grid')
);