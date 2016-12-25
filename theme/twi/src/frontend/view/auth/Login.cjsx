{Component, PropTypes} = React = require "react"
{Link} = require "react-router"
{inject, observer} = require "mobx-react"
{dms, dm} = require "decorator"

submitDecorator = require "helper/decorator/submitDecorator"
LoginStore = require "store/auth/Login"

{
  raised
  violet
} = require "button.styl"
{
  container
  title
  fieldContainer
  fieldsContainer
  fields
  links
} = require "./auth.styl"

class Login extends Component
  @title: "Login"

  _onSubmit: =>
    console.log "foo"
    await do @props.login.submit

  _updateField: ({target: {name, value}}) =>
    @props.login[name] = do value.trim if name?

  render: ->
    <div className="#{container}">
      <form onSubmit={@_onSubmit}>
        <div className="#{title}"><Link to="/">Login</Link></div>
        <div className="#{fieldsContainer}">
          <div className="#{fields}">
            <div className="#{fieldContainer}">
              <input
                type="text"
                name="username"
                placeholder="Your email or login"
                value={@props.login.username}
                onChange={@_updateField}
              />
            </div>
            <div className="#{fieldContainer}">
              <input
                type="password"
                name="password"
                placeholder="Your password"
                value={@props.login.password}
                onChange={@_updateField}
              />
            </div>
            <div className="#{fieldContainer}">
              <button className={"#{raised} #{violet}"}>Log in</button>
            </div>
          </div>
          <div className="#{links}">
            <div className="#{fieldContainer}">
              <Link to="/auth/signup">
                {"Don't have an account yet?"}
              </Link>
            </div>
            <div className="#{fieldContainer}">
              <Link to="/auth/restore">Forgot your password?</Link>
            </div>
          </div>
        </div>
      </form>
    </div>

Login = dms Login, [
  dm submitDecorator, "_onSubmit"
]

module.exports = inject("login")(observer Login)
