import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import * as serviceWorker from './serviceWorker';

import NavBar from './components/navbar.component';
import Index from './components/index.component';
import Lyrics from './components/lyrics.component';

import { AppProvider } from './context';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track_list: [],
      heading: 'Top 10 Tracks',
      dispatch: action => this.setState(state => this.reducer(state, action))
    };
  }

  reducer = (state, action) => {
    switch(action.type) {
      case 'SEARCH_TRACKS':
        return {
          ...state,
          track_list: action.payload,
          heading: 'Search Results'
        }
        
      default:
        return state;
    }
  }

  componentDidMount() {
    axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_API_KEY}`)
      .then(res => {
        this.setState({
          track_list: res.data.message.body.track_list
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <AppProvider value={this.state}>
      <Router>
        <React.Fragment>
          <NavBar />
          <div className="container">
            <Switch>
              <Route path="/" component={Index} exact />
              <Route path="/lyrics/track/:id" component={Lyrics} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
      </AppProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
