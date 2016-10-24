const h = require('react-hyperscript')
const { Link } = require('react-router')
const React = require('react')
const xhr = require('xhr')
const spotifyAPI = 'https://api.spotify.com'
const newmanUrl = 'https://66.media.tumblr.com/714c3a60e40ab76002c3787ae62dc9cc/tumblr_nq08ay5NXF1te3bqko1_500.gif'

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
        results: body
      })
    }
  )},
  render: function () {
    console.log(this.state)
    var artists = []

    if(this.state.results && this.state.results.artists && this.state.results.artists.items) {
      artists = this.state.results.artists.items

  }
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
      h('div.artistsContainer',
        artists.map(obj=>
        h('div.artist', [
          h('h2', obj.name),
          h('img',  {
            src: obj.images.length === 0 ? newmanUrl : obj.images[0]['url']
          })
        ]))
      ),
      // h('pre', JSON.stringify(this.state.results, null, 4)),
      h(Link, {
        to: '/',
        className: 'link'
      }, 'Home')
    ])
  )}
})

module.exports = Spotify
