import React, { Component } from 'react';
import { AppConsumer } from '../context';
import Spinner from './spinner.component';
import Track from './track.component';

class Tracks extends Component {
  render() {
    return (
      <AppConsumer>
        {context => {
          const { track_list, heading } = context;
          if (track_list === undefined || track_list.length === 0) {
            return <Spinner />
          } else {
            return (
              <React.Fragment>
                <h3 className="text-center mb-4"> {heading} </h3>
                <div className="row">
                  {track_list.map(item => (
                    <Track key={item.track.track_id} track={item.track}/>
                  ))}
                </div>
              </React.Fragment>
            )
          }
        }}
      </AppConsumer>
    )
  }
}

export default Tracks;