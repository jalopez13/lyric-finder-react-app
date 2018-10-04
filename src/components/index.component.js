import React from 'react';
import Tracks from '../components/tracks.component';
import Search from './search.component';

const Index = () => {
  return (
    <React.Fragment>
    <Search />
    <Tracks /> 
    </React.Fragment>
  )
}

export default Index;
