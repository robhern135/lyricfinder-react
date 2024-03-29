import React, { Component } from "react"
import axios from "axios"

const Context = React.createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_TRACKS":
      return {
        ...state,
        track_list: action.payload,
        heading: "Search Results",
      }
    default:
      return state
  }
}

export class Provider extends Component {
  state = {
    heading: "Top 10 tracks",
    track_list: [],
    dispatch: (action) => this.setState((state) => reducer(state, action)),
  }

  componentDidMount() {
    axios
      .get(
        `https://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10country=uk&if_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      //response is always res.data when using axios
      .then((res) => {
        this.setState({ track_list: res.data.message.body.track_list })
      })
      .catch((err) => console.log(err))
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer
