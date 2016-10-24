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
  getAlbums: function (e) {
    // console.log(e.target.value)
    // do stuff
    xhr({
      method: 'GET',
      json: true,
      url: `${spotifyAPI}/v1/artists/${e.target.value}/albums?market=US`
    }, (err, res, body) => {
      if (err) return console.log(err.message)
      this.setState({
        results: body
      })
    })
  },
  render: function () {
    console.log(this.state)
    var artists = []
    var albums = []

    if (this.state.results && this.state.results.artists && this.state.results.artists.items) {
      artists = this.state.results.artists.items
    }
    if (this.state.results && this.state.results.items) {
      albums = this.state.results.items
    }

    return (
     h('div.pa4.tc.bg-blue', [
      h('h1', ['Spotify Artist Search']),
      h('form', {
        onSubmit: this.handleSubmit
      }, [
        h('input', {
          onChange: this.handleChange
        }),
        h('button', 'Search')
      ]),
      h('img', {src: 'http://vectorlogo4u.com/wp-content/uploads/2016/03/spotify-vector-logo.png '}),
      h('div.artistsContainer',
        artists.map(obj=> this.renderArtist(obj))
        // h('div.artist', [
        //   h('h2', obj.name),
        //   h('button', {
        //     onClick: this.getAlbums,
        //     value: obj.id
        //   }, 'Display Albums'),
        //   h('a', { href: obj.external_urls.spotify, target: '_blank' }, [
        //     h('img',  {
        //       src: obj.images.length === 0 ? newmanUrl : obj.images[0]['url']
        //     })
        //   ]),
        // ]))
      ),
      h('div.albumsContainer',
        albums.map(obj=>
        h('div.albums', [
          h('h2', obj.name),
          h('a', { href: obj.external_urls.spotify, target: '_blank' }, [
            h('img',  {
              src: obj.images.length === 0 ? newmanUrl : obj.images[0]['url']
            })
          ]),
        ]))
      ),
      // h('pre', JSON.stringify(this.state.results, null, 4)),
      h(Link, {
        to: '/',
        className: 'link'
      }, 'Home')
    ])
  )},
  renderArtist (artist) {
     // console.log(video)
     // var videoImage = (video.thumbnails.high.url) ? video.thumbnails.high.url : '/img/magic-word-2.gif'

     // h('div.artist', [
     //   h('h2', obj.name),
     //   h('button', {
     //     onClick: this.getAlbums,
     //     value: obj.id
     //   }, 'Display Albums'),
     //   h('a', { href: obj.external_urls.spotify, target: '_blank' }, [
     //     h('img',  {
     //       src: obj.images.length === 0 ? newmanUrl : obj.images[0]['url']
     //     })
     //   ]),
     // ]))
     var artistImage = artist.images.length === 0 ? newmanUrl : artist.images[0]['url']
     return (
       h('div.artist-container.fl.db.w-100.w-50-m.w-25-l.overflow-hidden', {
         style: {
           position: 'relative',
           cursor: 'pointer'
         }
       }, [
         h('a.db.w-100.h-100.aspect-ratio--4x6.grow', {
           href: artist.external_urls.spotify,
           target: '_blank',
           style: {
             background: `url(${artistImage}) no-repeat center center`,
             backgroundSize: 'cover'
           }
         }, ''),
         h('h2.f4.pb1.ma1.tc', {
           style: {
             position: 'absolute',
             bottom: '0',
             left: '0'
           }
         }, [
           h('a.link', {
             href: artist.external_urls.spotify,
             style: {
               color: 'white',
               textShadow: '2px 2px 6px rgba(0,0,0,.9)'
             }
           },
           artist.name),
           h('button', {
               onClick: this.getAlbums,
               value: artist.id
             }, 'Display Albums')
         ]
         )
       ])
     )
   }
})

module.exports = Spotify
