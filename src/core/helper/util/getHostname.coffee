{IS_DEVEL} = require "../configure"

###
# Get prefix (http:// or https://)
#
# @param boolean secure
#
# @return string
###
getPrefix = (secure) -> "http#{if secure then "s" else ""}://"

###
# Return local server name
#
# @param int port
#
# @return string
###
getLocalHostname = (port) -> "http://localhost:#{port}"

###
# Return configured hostname of server
#
# @param string host
# @param boolean secure
#
# @return string
###
getConfiguredHostname = (host, secure) -> "#{getPrefix secure}#{host}"

###
# Get server hostname from configs
#   Note: this method will return localhost when app has been running
#     in development environment
#
# @param string host
# @param int port
# @param boolean secure
#
# @return string
###
getHostname = (host, port, secure) ->
  unless IS_DEVEL
    return getConfiguredHostname

  return getLocalHostname port

module.exports = getHostname
module.exports.getLocalHostname = getLocalHostname
module.exports.getConfiguredHostname = getConfiguredHostname

