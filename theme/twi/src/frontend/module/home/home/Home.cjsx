React = require "react"
{inject, observer} = require "mobx-react"

compose = require "lodash/fp/compose"
pure = require "helper/decorator/pure"

mapStoresToProps = ({app}) -> ({app})

componentWillMount = -> @props.app.setTitle "Library feed"

Home = ({app}) -> <div>foo</div>

module.exports = compose([
  inject mapStoresToProps
  observer
  pure componentWillMount
])(Home)
