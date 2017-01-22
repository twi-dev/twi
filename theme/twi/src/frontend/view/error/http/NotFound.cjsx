React = require "react"
{Link} = require "react-router"
{inject, observer} = require "mobx-react"

DocumentTitle = require "react-document-title"
pure = require "helper/decorator/pure"

{
  mainContainer,
  link,
  image,
  message,
  codeNotFound
} = require "./http.styl"

mapStoresToProps = ({app}) -> ({app})

# It's maaaaaaaagic, Alex :D (actually no)
componentWillMount = -> @props.app.setTitle "Page not found"

NotFound = ({app}) ->
  <DocumentTitle title={app.title}>
    <div className="#{mainContainer}">
      <div className="#{image}">
        <img src="/assets/img/errors/404.svg" alt="404" />
      </div>
      <div className="#{codeNotFound}">404</div>
      <div className="#{message}">
        This is not the web page you are looking for
      </div>
      <div className="#{link}">
        <Link to="/">Home</Link>
      </div>
    </div>
  </DocumentTitle>

module.exports = inject(
  mapStoresToProps
)(observer pure NotFound, componentWillMount)
