import React, { Component } from 'react';
import { AppConsumer } from '../context';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

library.add(faMusic)

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackTitle: ''
    };
  }

  handleChange = (e) => {
    this.setState({ 'trackTitle': e.target.value });
  }

  searchTrack = (dispatch, e) => {
    e.preventDefault();
    axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_API_KEY}`)
    .then(res => {
      dispatch({
        type: 'SEARCH_TRACKS',
        payload: res.data.message.body.track_list
      });

      this.setState({trackTitle: ''});
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <AppConsumer>
      {context => {
        const { dispatch } = context;
        return (
        <div className="card card-body mb-4 p-4">
          <h1 className="display-4 text-center">
            <FontAwesomeIcon icon="music" />
             Search For a Song
          </h1>

          <p className="lead text-center">
            Get the lyrics for any song.
          </p>

          <form onSubmit={this.searchTrack.bind(this, dispatch)}>
            <div className="form-group">
              <input 
              type="text" 
              className="form-control form-control-lg" 
              placeholder="Song title..." 
              name="track-title" 
              value={this.state.trackTitle} 
              onChange={this.handleChange}/>
            </div>

            <button className="btn-primary btn-lg btn-block mb-5">
            Get Track Lyrics
            </button>
          </form>
        </div>
      )}
    }
      </AppConsumer>
    )
  }
}

export default Search;