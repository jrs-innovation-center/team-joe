const h = require('react-hyperscript')
const { Link } = require('react-router')
const React = require('react')
const xhr = require('xhr')
const spotifyAPI = 'https://api.spotify.com'


const Spotify = React.createClass({
  getInitialState: function () {
    return {
      q: '',
      results: {}
    }
  },
  handleChange: function (e) {
    this.setState({
      q: e.target.value
    })
  },
  handleSubmit: function (e) {
    e.preventDefault()
    xhr({
      method: 'GET',
      json: true,
      url: spotifyAPI + '/v1/search?type=artist&q=' + this.state.q
    }, (err, res, body) => {
      if (err) return console.log(err.message)
      this.setState({
        results: body.artists
      })
    }
  )},
  render: function () {
    console.log(this.state)
    return (
     h('div.pa4', [
      h('h1', ['Spotify']),
      h('form', {
        onSubmit: this.handleSubmit
      }, [
        h('input', {
          onChange: this.handleChange
        }),
        h('button', 'Search')
      ]),
      h('pre', JSON.stringify(this.state.results, null, 4)),
      h(Link, {
        to: '/',
        className: 'link'
      }, 'Home')
    ])
  )}
})

module.exports = Spotify
