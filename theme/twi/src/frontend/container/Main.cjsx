React = require "react"
{inject, observer} = require "mobx-react"

pure = require "helper/decorator/pure"

Main = ({children}) -> <div>{children}</div>

module.exports = Main
