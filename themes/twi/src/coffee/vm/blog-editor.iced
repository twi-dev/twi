md = new MD = require 'markdown-it'
cm = require '../../vendor/codemirror/lib/codemirror'
Vue = require '../../vendor/vue/dist/vue'

elHeader = document.querySelector '.header-container'
elEditor = document.querySelector '#blog-editor'

# Wrap markdown-it as filter
Vue.filter 'md', (value) -> md.render value

updateEditorHeight = (iHeight = 0) ->
  elEditor.style.height = "#{iHeight - elHeader.offsetHeight}px"

document.onreadystatechange = -> updateEditorHeight window.innerHeight
window.onresize = -> updateEditorHeight @innerHeight

blogEditor = new Vue
  el: elEditor
  data:
    postContent: ''