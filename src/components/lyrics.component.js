import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../components/spinner.component';
import Moment from 'react-moment';

class Lyrics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track: {},
      lyrics: {}
    }
  }
  componentDidMount() {
    axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_API_KEY}`)
    .then((res) => {
      console.log('Lyrics: ', res.data.message.body);
      this.setState((state, props) => ({
        lyrics: res.data.message.body.lyrics
      }));

      return axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_API_KEY}`);
    })
    .then((res) => {
      console.log('Track: ', res.data);
      this.setState({
        track: res.data.message.body.track
      });
    })
    .catch(err => console.log(err));
  }

  render() {
    const { track, lyrics } = this.state;

    if (track === undefined || 
        lyrics === undefined || 
        Object.keys(lyrics).length === 0 ||
        Object.keys(track).length === 0) {
          console.log('no data');
          return (
            <div>
            <h5 className="text-center">Loading...</h5>
            <Spinner />
            </div>
          )
    } else {
      let genre;

      if(track.primary_genres.music_genre_list.length > 0) {
        genre = <li className="list-group-item"><strong>Genre: </strong>{track.primary_genres.music_genre_list[0].music_genre.music_genre_name}</li>;
      } else {
        genre = <li className="list-group-item"><strong>Genre: </strong>No Genre</li>;
      }

      return (
        <React.Fragment>
          <Link to='/' className="btn btn-dark btn-sm mb-4">Go back</Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name}: by <span className="text-secondary">{track.artist_name}</span>
            </h5>
            <div className="card-body">
              <p className="card-text">{lyrics.lyrics_body}</p>
            </div>
          </div>

          <ul className="list-group mt-3">
            <li className="list-group-item"><strong>Album ID: </strong> {track.album_id}</li>
            {genre}
            <li className="list-group-item"><strong>Explicit: </strong> {track.explicit === 0 ? 'No' : 'Yes'}</li>
            <li className="list-group-item"><strong>Release Date: </strong> <Moment format="MM/DD/YYYY">{track.first_release_date}</Moment></li>
          </ul>
        </React.Fragment>
      )
    }
  }
}

export default  Lyrics;
