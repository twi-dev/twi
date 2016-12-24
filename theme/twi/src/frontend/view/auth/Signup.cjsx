{Component, PropTypes} = React = require "react"
{inject, observer} = require "mobx-react"
{dms, dm} = require "decorator"
requireDefault = require "requireDefault"
submitDecorator = require "helper/decorator/submitDecorator"
SignupStore = requireDefault require "store/auth/Signup"

{
  raised, violet
} = require "button.styl"
{
  container
  title
  fieldContainer
  fieldsContainer
  fields
  signup
} = require "./auth.styl"

class Signup extends Component
  @propTypes:
    auth: PropTypes.instanceOf SignupStore

  _onSubmit: => await do @props.signup.submit

  _updateField: ({target: {name, value}}) =>
    @props.signup[name] = do value.trim if name?

  render: ->
    <div className="#{container}">
      <form onSubmit={@_onSubmit}>
        <div className="#{title}">Signup</div>
        <div className="#{fieldsContainer}">
          <div className="#{fields}">
            <div className="#{fieldContainer}">
              <input
                className="#{signup}"
                type="text"
                name="login"
                placeholder="Your login"
                onChange={@_updateField}
                value={@props.signup.login}
              />
            </div>
            <div className="#{fieldContainer}">
              <input
                className="#{signup}"
                type="text"
                name="email"
                placeholder="Your email address"
                onChange={@_updateField}
                value={@props.signup.email}
              />
            </div>
            <div className="#{fieldContainer}">
              <input
                className="#{signup}"
                type="password"
                name="password"
                placeholder="Your password"
                onChange={@_updateField}
                value={@props.signup.password}
              />
            </div>
            <div className="#{fieldContainer}">
              <button
                className="#{raised} #{violet}"
              >Sign up</button>
            </div>
          </div>
        </div>
      </form>
    </div>

Signup = dms Signup, [
  dm submitDecorator, "_onSubmit"
]

module.exports = inject("signup")(observer Signup)
