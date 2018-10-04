import React from 'react'

const AppContext = React.createContext({
  track_list: [],
  heading: 'Top 10 Tracks'
});

export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;
