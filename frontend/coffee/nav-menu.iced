'use strict'

require '../vendor/web-animations-js/web-animations-next.min.js'

navMenu = document.querySelector '#nav-menu'
vertMenu = document.querySelector '#vert-menu'
vertMenuList = document.querySelector '.nav-vert'

# I'm not sure is that good way.
menuAnimation = ->
  navMenu.animate [{
    transform: 'translate(0px)'
    offset: 0
  }, {
    transform: 'translate(322px)'
    offset: 1
  }],
  duration: 180
  fill: 'forwards'
  easing: 'ease-in-out'

reverseMenuAnimation = ->
  navMenu.animate [{
    transform: 'translate(322px)'
    offset: 0
  }, {
    transform: 'translate(0px)'
    offset: 1
  }],
  duration: 180
  fill: 'forwards'

vertMenuAnimation = ->
  vertMenu.animate [{
    width: '0px'
    opacity: 1
    offset: 0
  }, {
    width: '220px'
    opacity: 1
    offset: 1
  }], {
    duration: 180
    fill: 'forwards'
  }
  vertMenu.animate [{
    height: '56px'
    offset: 0
  }, {
    height: vertMenuList.offsetHeight + 'px'
    offset: 1
  }], {
    delay: 96
    duration: 180
    fill: 'forwards'
  }

  aLinks = for el in vertMenu.childNodes when 'nav-vert' in el.classList
    el.childNodes

  iDelay = 100
  for link in aLinks[0]
    link.animate [{
      opacity: 0
      offset: 0
    }, {
      opacity: 1
      offset: 1
    }], {
      delay: iDelay += 30
      duration: 180
      fill: 'forwards'
    }

reverseVertMenuAnimation = ->
  vertMenu.animate [{
    height: vertMenuList.offsetHeight + 'px'
    opacity: 1
    offset: 0
  }, {
    height: '0px'
    opacity: 0
    offset: 1
  }], {
    delay: 50
    duration: 180
    fill: 'forwards'
  }

  aLinks = for el in vertMenu.childNodes when 'nav-vert' in el.classList
    el.childNodes

  for link in aLinks[0]
    link.animate [{
      opacity: 1
      offset: 0
    }, {
      opacity: 0
      offset: 1
    }], {
      delay: 180
      duration: 180
      fill: 'forwards'
    }


animateMenu = ->
  unless 'active' in @classList
    do menuAnimation
    @classList.add 'active'
  else
    do reverseMenuAnimation
    @classList.remove 'active'

animateMoreVertMenu = (e) ->
  unless 'active' in @classList
    do vertMenuAnimation
    @classList.add 'active'
    do @focus if @focus?
  else
    do reverseVertMenuAnimation
    @classList.remove 'active'
    do @blur if @blur?

document.querySelector '.hamburger-button-icon'
  .onclick = animateMenu

document.querySelector '.more-vert-container'
  .onclick = animateMoreVertMenu

document.querySelector '.more-vert-container'
  .onblur = animateMoreVertMenu
