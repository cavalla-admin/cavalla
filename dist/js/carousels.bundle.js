/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/bootstrap/js/src/base-component.js":
/*!*********************************************************!*\
  !*** ./node_modules/bootstrap/js/src/base-component.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom/data.js */ "./node_modules/bootstrap/js/src/dom/data.js");
/* harmony import */ var _dom_event_handler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom/event-handler.js */ "./node_modules/bootstrap/js/src/dom/event-handler.js");
/* harmony import */ var _util_config_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/config.js */ "./node_modules/bootstrap/js/src/util/config.js");
/* harmony import */ var _util_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/index.js */ "./node_modules/bootstrap/js/src/util/index.js");
/**
 * --------------------------------------------------------------------------
 * Bootstrap base-component.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */






/**
 * Constants
 */

const VERSION = '5.3.3'

/**
 * Class definition
 */

class BaseComponent extends _util_config_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(element, config) {
    super()

    element = (0,_util_index_js__WEBPACK_IMPORTED_MODULE_3__.getElement)(element)
    if (!element) {
      return
    }

    this._element = element
    this._config = this._getConfig(config)

    _dom_data_js__WEBPACK_IMPORTED_MODULE_0__["default"].set(this._element, this.constructor.DATA_KEY, this)
  }

  // Public
  dispose() {
    _dom_data_js__WEBPACK_IMPORTED_MODULE_0__["default"].remove(this._element, this.constructor.DATA_KEY)
    _dom_event_handler_js__WEBPACK_IMPORTED_MODULE_1__["default"].off(this._element, this.constructor.EVENT_KEY)

    for (const propertyName of Object.getOwnPropertyNames(this)) {
      this[propertyName] = null
    }
  }

  _queueCallback(callback, element, isAnimated = true) {
    (0,_util_index_js__WEBPACK_IMPORTED_MODULE_3__.executeAfterTransition)(callback, element, isAnimated)
  }

  _getConfig(config) {
    config = this._mergeConfigObj(config, this._element)
    config = this._configAfterMerge(config)
    this._typeCheckConfig(config)
    return config
  }

  // Static
  static getInstance(element) {
    return _dom_data_js__WEBPACK_IMPORTED_MODULE_0__["default"].get((0,_util_index_js__WEBPACK_IMPORTED_MODULE_3__.getElement)(element), this.DATA_KEY)
  }

  static getOrCreateInstance(element, config = {}) {
    return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null)
  }

  static get VERSION() {
    return VERSION
  }

  static get DATA_KEY() {
    return `bs.${this.NAME}`
  }

  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`
  }

  static eventName(name) {
    return `${name}${this.EVENT_KEY}`
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BaseComponent);


/***/ }),

/***/ "./node_modules/bootstrap/js/src/carousel.js":
/*!***************************************************!*\
  !*** ./node_modules/bootstrap/js/src/carousel.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _base_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component.js */ "./node_modules/bootstrap/js/src/base-component.js");
/* harmony import */ var _dom_event_handler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom/event-handler.js */ "./node_modules/bootstrap/js/src/dom/event-handler.js");
/* harmony import */ var _dom_manipulator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom/manipulator.js */ "./node_modules/bootstrap/js/src/dom/manipulator.js");
/* harmony import */ var _dom_selector_engine_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom/selector-engine.js */ "./node_modules/bootstrap/js/src/dom/selector-engine.js");
/* harmony import */ var _util_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util/index.js */ "./node_modules/bootstrap/js/src/util/index.js");
/* harmony import */ var _util_swipe_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/swipe.js */ "./node_modules/bootstrap/js/src/util/swipe.js");
/**
 * --------------------------------------------------------------------------
 * Bootstrap carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */








/**
 * Constants
 */

const NAME = 'carousel'
const DATA_KEY = 'bs.carousel'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'

const ARROW_LEFT_KEY = 'ArrowLeft'
const ARROW_RIGHT_KEY = 'ArrowRight'
const TOUCHEVENT_COMPAT_WAIT = 500 // Time for mouse compat events to fire after touch

const ORDER_NEXT = 'next'
const ORDER_PREV = 'prev'
const DIRECTION_LEFT = 'left'
const DIRECTION_RIGHT = 'right'

const EVENT_SLIDE = `slide${EVENT_KEY}`
const EVENT_SLID = `slid${EVENT_KEY}`
const EVENT_KEYDOWN = `keydown${EVENT_KEY}`
const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY}`
const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY}`
const EVENT_DRAG_START = `dragstart${EVENT_KEY}`
const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`

const CLASS_NAME_CAROUSEL = 'carousel'
const CLASS_NAME_ACTIVE = 'active'
const CLASS_NAME_SLIDE = 'slide'
const CLASS_NAME_END = 'carousel-item-end'
const CLASS_NAME_START = 'carousel-item-start'
const CLASS_NAME_NEXT = 'carousel-item-next'
const CLASS_NAME_PREV = 'carousel-item-prev'

const SELECTOR_ACTIVE = '.active'
const SELECTOR_ITEM = '.carousel-item'
const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM
const SELECTOR_ITEM_IMG = '.carousel-item img'
const SELECTOR_INDICATORS = '.carousel-indicators'
const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]'
const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]'

const KEY_TO_DIRECTION = {
  [ARROW_LEFT_KEY]: DIRECTION_RIGHT,
  [ARROW_RIGHT_KEY]: DIRECTION_LEFT
}

const Default = {
  interval: 5000,
  keyboard: true,
  pause: 'hover',
  ride: false,
  touch: true,
  wrap: true
}

const DefaultType = {
  interval: '(number|boolean)', // TODO:v6 remove boolean support
  keyboard: 'boolean',
  pause: '(string|boolean)',
  ride: '(boolean|string)',
  touch: 'boolean',
  wrap: 'boolean'
}

/**
 * Class definition
 */

class Carousel extends _base_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(element, config) {
    super(element, config)

    this._interval = null
    this._activeElement = null
    this._isSliding = false
    this.touchTimeout = null
    this._swipeHelper = null

    this._indicatorsElement = _dom_selector_engine_js__WEBPACK_IMPORTED_MODULE_3__["default"].findOne(SELECTOR_INDICATORS, this._element)
    this._addEventListeners()

    if (this._config.ride === CLASS_NAME_CAROUSEL) {
      this.cycle()
    }
  }

  // Getters
  static get Default() {
    return Default
  }

  static get DefaultType() {
    return DefaultType
  }

  static get NAME() {
    return NAME
  }

  // Public
  next() {
    this._slide(ORDER_NEXT)
  }

  nextWhenVisible() {
    // FIXME TODO use `document.visibilityState`
    // Don't call next when the page isn't visible
    // or the carousel or its parent isn't visible
    if (!document.hidden && (0,_util_index_js__WEBPACK_IMPORTED_MODULE_4__.isVisible)(this._element)) {
      this.next()
    }
  }

  prev() {
    this._slide(ORDER_PREV)
  }

  pause() {
    if (this._isSliding) {
      (0,_util_index_js__WEBPACK_IMPORTED_MODULE_4__.triggerTransitionEnd)(this._element)
    }

    this._clearInterval()
  }

  cycle() {
    this._clearInterval()
    this._updateInterval()

    this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval)
  }

  _maybeEnableCycle() {
    if (!this._config.ride) {
      return
    }

    if (this._isSliding) {
      _dom_event_handler_js__WEBPACK_IMPORTED_MODULE_1__["default"].one(this._element, EVENT_SLID, () => this.cycle())
      return
    }

    this.cycle()
  }

  to(index) {
    const items = this._getItems()
    if (index > items.length - 1 || index < 0) {
      return
    }

    if (this._isSliding) {
      _dom_event_handler_js__WEBPACK_IMPORTED_MODULE_1__["default"].one(this._element, EVENT_SLID, () => this.to(index))
      return
    }

    const activeIndex = this._getItemIndex(this._getActive())
    if (activeIndex === index) {
      return
    }

    const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV

    this._slide(order, items[index])
  }

  dispose() {
    if (this._swipeHelper) {
      this._swipeHelper.dispose()
    }

    super.dispose()
  }

  // Private
  _configAfterMerge(config) {
    config.defaultInterval = config.interval
    return config
  }

  _addEventListeners() {
    if (this._config.keyboard) {
      _dom_event_handler_js__WEBPACK_IMPORTED_MODULE_1__["default"].on(this._element, EVENT_KEYDOWN, event => this._keydown(event))
    }

    if (this._config.pause === 'hover') {
      _dom_event_handler_js__WEBPACK_IMPORTED_MODULE_1__["default"].on(this._element, EVENT_MOUSEENTER, () => this.pause())
      _dom_event_handler_js__WEBPACK_IMPORTED_MODULE_1__["default"].on(this._element, EVENT_MOUSELEAVE, () => this._maybeEnableCycle())
    }

    if (this._config.touch && _util_swipe_js__WEBPACK_IMPORTED_MODULE_5__["default"].isSupported()) {
      this._addTouchEventListeners()
    }
  }

  _addTouchEventListeners() {
    for (const img of _dom_selector_engine_js__WEBPACK_IMPORTED_MODULE_3__["default"].find(SELECTOR_ITEM_IMG, this._element)) {
      _dom_event_handler_js__WEBPACK_IMPORTED_MODULE_1__["default"].on(img, EVENT_DRAG_START, event => event.preventDefault())
    }

    const endCallBack = () => {
      if (this._config.pause !== 'hover') {
        return
      }

      // If it's a touch-enabled device, mouseenter/leave are fired as
      // part of the mouse compatibility events on first tap - the carousel
      // would stop cycling until user tapped out of it;
      // here, we listen for touchend, explicitly pause the carousel
      // (as if it's the second time we tap on it, mouseenter compat event
      // is NOT fired) and after a timeout (to allow for mouse compatibility
      // events to fire) we explicitly restart cycling

      this.pause()
      if (this.touchTimeout) {
        clearTimeout(this.touchTimeout)
      }

      this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval)
    }

    const swipeConfig = {
      leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
      rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
      endCallback: endCallBack
    }

    this._swipeHelper = new _util_swipe_js__WEBPACK_IMPORTED_MODULE_5__["default"](this._element, swipeConfig)
  }

  _keydown(event) {
    if (/input|textarea/i.test(event.target.tagName)) {
      return
    }

    const direction = KEY_TO_DIRECTION[event.key]
    if (direction) {
      event.preventDefault()
      this._slide(this._directionToOrder(direction))
    }
  }

  _getItemIndex(element) {
    return this._getItems().indexOf(element)
  }

  _setActiveIndicatorElement(index) {
    if (!this._indicatorsElement) {
      return
    }

    const activeIndicator = _dom_selector_engine_js__WEBPACK_IMPORTED_MODULE_3__["default"].findOne(SELECTOR_ACTIVE, this._indicatorsElement)

    activeIndicator.classList.remove(CLASS_NAME_ACTIVE)
    activeIndicator.removeAttribute('aria-current')

    const newActiveIndicator = _dom_selector_engine_js__WEBPACK_IMPORTED_MODULE_3__["default"].findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement)

    if (newActiveIndicator) {
      newActiveIndicator.classList.add(CLASS_NAME_ACTIVE)
      newActiveIndicator.setAttribute('aria-current', 'true')
    }
  }

  _updateInterval() {
    const element = this._activeElement || this._getActive()

    if (!element) {
      return
    }

    const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10)

    this._config.interval = elementInterval || this._config.defaultInterval
  }

  _slide(order, element = null) {
    if (this._isSliding) {
      return
    }

    const activeElement = this._getActive()
    const isNext = order === ORDER_NEXT
    const nextElement = element || (0,_util_index_js__WEBPACK_IMPORTED_MODULE_4__.getNextActiveElement)(this._getItems(), activeElement, isNext, this._config.wrap)

    if (nextElement === activeElement) {
      return
    }

    const nextElementIndex = this._getItemIndex(nextElement)

    const triggerEvent = eventName => {
      return _dom_event_handler_js__WEBPACK_IMPORTED_MODULE_1__["default"].trigger(this._element, eventName, {
        relatedTarget: nextElement,
        direction: this._orderToDirection(order),
        from: this._getItemIndex(activeElement),
        to: nextElementIndex
      })
    }

    const slideEvent = triggerEvent(EVENT_SLIDE)

    if (slideEvent.defaultPrevented) {
      return
    }

    if (!activeElement || !nextElement) {
      // Some weirdness is happening, so we bail
      // TODO: change tests that use empty divs to avoid this check
      return
    }

    const isCycling = Boolean(this._interval)
    this.pause()

    this._isSliding = true

    this._setActiveIndicatorElement(nextElementIndex)
    this._activeElement = nextElement

    const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END
    const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV

    nextElement.classList.add(orderClassName)

    ;(0,_util_index_js__WEBPACK_IMPORTED_MODULE_4__.reflow)(nextElement)

    activeElement.classList.add(directionalClassName)
    nextElement.classList.add(directionalClassName)

    const completeCallBack = () => {
      nextElement.classList.remove(directionalClassName, orderClassName)
      nextElement.classList.add(CLASS_NAME_ACTIVE)

      activeElement.classList.remove(CLASS_NAME_ACTIVE, orderClassName, directionalClassName)

      this._isSliding = false

      triggerEvent(EVENT_SLID)
    }

    this._queueCallback(completeCallBack, activeElement, this._isAnimated())

    if (isCycling) {
      this.cycle()
    }
  }

  _isAnimated() {
    return this._element.classList.contains(CLASS_NAME_SLIDE)
  }

  _getActive() {
    return _dom_selector_engine_js__WEBPACK_IMPORTED_MODULE_3__["default"].findOne(SELECTOR_ACTIVE_ITEM, this._element)
  }

  _getItems() {
    return _dom_selector_engine_js__WEBPACK_IMPORTED_MODULE_3__["default"].find(SELECTOR_ITEM, this._element)
  }

  _clearInterval() {
    if (this._interval) {
      clearInterval(this._interval)
      this._interval = null
    }
  }

  _directionToOrder(direction) {
    if ((0,_util_index_js__WEBPACK_IMPORTED_MODULE_4__.isRTL)()) {
      return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT
    }

    return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV
  }

  _orderToDirection(order) {
    if ((0,_util_index_js__WEBPACK_IMPORTED_MODULE_4__.isRTL)()) {
      return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT
    }

    return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Carousel.getOrCreateInstance(this, config)

      if (typeof config === 'number') {
        data.to(config)
        return
      }

      if (typeof config === 'string') {
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`)
        }

        data[config]()
      }
    })
  }
}

/**
 * Data API implementation
 */

_dom_event_handler_js__WEBPACK_IMPORTED_MODULE_1__["default"].on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_SLIDE, function (event) {
  const target = _dom_selector_engine_js__WEBPACK_IMPORTED_MODULE_3__["default"].getElementFromSelector(this)

  if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
    return
  }

  event.preventDefault()

  const carousel = Carousel.getOrCreateInstance(target)
  const slideIndex = this.getAttribute('data-bs-slide-to')

  if (slideIndex) {
    carousel.to(slideIndex)
    carousel._maybeEnableCycle()
    return
  }

  if (_dom_manipulator_js__WEBPACK_IMPORTED_MODULE_2__["default"].getDataAttribute(this, 'slide') === 'next') {
    carousel.next()
    carousel._maybeEnableCycle()
    return
  }

  carousel.prev()
  carousel._maybeEnableCycle()
})

_dom_event_handler_js__WEBPACK_IMPORTED_MODULE_1__["default"].on(window, EVENT_LOAD_DATA_API, () => {
  const carousels = _dom_selector_engine_js__WEBPACK_IMPORTED_MODULE_3__["default"].find(SELECTOR_DATA_RIDE)

  for (const carousel of carousels) {
    Carousel.getOrCreateInstance(carousel)
  }
})

/**
 * jQuery
 */

;(0,_util_index_js__WEBPACK_IMPORTED_MODULE_4__.defineJQueryPlugin)(Carousel)

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Carousel);


/***/ }),

/***/ "./node_modules/bootstrap/js/src/dom/data.js":
/*!***************************************************!*\
  !*** ./node_modules/bootstrap/js/src/dom/data.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * --------------------------------------------------------------------------
 * Bootstrap dom/data.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const elementMap = new Map()

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  set(element, key, instance) {
    if (!elementMap.has(element)) {
      elementMap.set(element, new Map())
    }

    const instanceMap = elementMap.get(element)

    // make it clear we only want one instance per element
    // can be removed later when multiple key/instances are fine to be used
    if (!instanceMap.has(key) && instanceMap.size !== 0) {
      // eslint-disable-next-line no-console
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`)
      return
    }

    instanceMap.set(key, instance)
  },

  get(element, key) {
    if (elementMap.has(element)) {
      return elementMap.get(element).get(key) || null
    }

    return null
  },

  remove(element, key) {
    if (!elementMap.has(element)) {
      return
    }

    const instanceMap = elementMap.get(element)

    instanceMap.delete(key)

    // free up element references if there are no instances left for an element
    if (instanceMap.size === 0) {
      elementMap.delete(element)
    }
  }
});


/***/ }),

/***/ "./node_modules/bootstrap/js/src/dom/event-handler.js":
/*!************************************************************!*\
  !*** ./node_modules/bootstrap/js/src/dom/event-handler.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/index.js */ "./node_modules/bootstrap/js/src/util/index.js");
/**
 * --------------------------------------------------------------------------
 * Bootstrap dom/event-handler.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */



/**
 * Constants
 */

const namespaceRegex = /[^.]*(?=\..*)\.|.*/
const stripNameRegex = /\..*/
const stripUidRegex = /::\d+$/
const eventRegistry = {} // Events storage
let uidEvent = 1
const customEvents = {
  mouseenter: 'mouseover',
  mouseleave: 'mouseout'
}

const nativeEvents = new Set([
  'click',
  'dblclick',
  'mouseup',
  'mousedown',
  'contextmenu',
  'mousewheel',
  'DOMMouseScroll',
  'mouseover',
  'mouseout',
  'mousemove',
  'selectstart',
  'selectend',
  'keydown',
  'keypress',
  'keyup',
  'orientationchange',
  'touchstart',
  'touchmove',
  'touchend',
  'touchcancel',
  'pointerdown',
  'pointermove',
  'pointerup',
  'pointerleave',
  'pointercancel',
  'gesturestart',
  'gesturechange',
  'gestureend',
  'focus',
  'blur',
  'change',
  'reset',
  'select',
  'submit',
  'focusin',
  'focusout',
  'load',
  'unload',
  'beforeunload',
  'resize',
  'move',
  'DOMContentLoaded',
  'readystatechange',
  'error',
  'abort',
  'scroll'
])

/**
 * Private methods
 */

function makeEventUid(element, uid) {
  return (uid && `${uid}::${uidEvent++}`) || element.uidEvent || uidEvent++
}

function getElementEvents(element) {
  const uid = makeEventUid(element)

  element.uidEvent = uid
  eventRegistry[uid] = eventRegistry[uid] || {}

  return eventRegistry[uid]
}

function bootstrapHandler(element, fn) {
  return function handler(event) {
    hydrateObj(event, { delegateTarget: element })

    if (handler.oneOff) {
      EventHandler.off(element, event.type, fn)
    }

    return fn.apply(element, [event])
  }
}

function bootstrapDelegationHandler(element, selector, fn) {
  return function handler(event) {
    const domElements = element.querySelectorAll(selector)

    for (let { target } = event; target && target !== this; target = target.parentNode) {
      for (const domElement of domElements) {
        if (domElement !== target) {
          continue
        }

        hydrateObj(event, { delegateTarget: target })

        if (handler.oneOff) {
          EventHandler.off(element, event.type, selector, fn)
        }

        return fn.apply(target, [event])
      }
    }
  }
}

function findHandler(events, callable, delegationSelector = null) {
  return Object.values(events)
    .find(event => event.callable === callable && event.delegationSelector === delegationSelector)
}

function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
  const isDelegated = typeof handler === 'string'
  // TODO: tooltip passes `false` instead of selector, so we need to check
  const callable = isDelegated ? delegationFunction : (handler || delegationFunction)
  let typeEvent = getTypeEvent(originalTypeEvent)

  if (!nativeEvents.has(typeEvent)) {
    typeEvent = originalTypeEvent
  }

  return [isDelegated, callable, typeEvent]
}

function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
  if (typeof originalTypeEvent !== 'string' || !element) {
    return
  }

  let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction)

  // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
  // this prevents the handler from being dispatched the same way as mouseover or mouseout does
  if (originalTypeEvent in customEvents) {
    const wrapFunction = fn => {
      return function (event) {
        if (!event.relatedTarget || (event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget))) {
          return fn.call(this, event)
        }
      }
    }

    callable = wrapFunction(callable)
  }

  const events = getElementEvents(element)
  const handlers = events[typeEvent] || (events[typeEvent] = {})
  const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null)

  if (previousFunction) {
    previousFunction.oneOff = previousFunction.oneOff && oneOff

    return
  }

  const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''))
  const fn = isDelegated ?
    bootstrapDelegationHandler(element, handler, callable) :
    bootstrapHandler(element, callable)

  fn.delegationSelector = isDelegated ? handler : null
  fn.callable = callable
  fn.oneOff = oneOff
  fn.uidEvent = uid
  handlers[uid] = fn

  element.addEventListener(typeEvent, fn, isDelegated)
}

function removeHandler(element, events, typeEvent, handler, delegationSelector) {
  const fn = findHandler(events[typeEvent], handler, delegationSelector)

  if (!fn) {
    return
  }

  element.removeEventListener(typeEvent, fn, Boolean(delegationSelector))
  delete events[typeEvent][fn.uidEvent]
}

function removeNamespacedHandlers(element, events, typeEvent, namespace) {
  const storeElementEvent = events[typeEvent] || {}

  for (const [handlerKey, event] of Object.entries(storeElementEvent)) {
    if (handlerKey.includes(namespace)) {
      removeHandler(element, events, typeEvent, event.callable, event.delegationSelector)
    }
  }
}

function getTypeEvent(event) {
  // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
  event = event.replace(stripNameRegex, '')
  return customEvents[event] || event
}

const EventHandler = {
  on(element, event, handler, delegationFunction) {
    addHandler(element, event, handler, delegationFunction, false)
  },

  one(element, event, handler, delegationFunction) {
    addHandler(element, event, handler, delegationFunction, true)
  },

  off(element, originalTypeEvent, handler, delegationFunction) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return
    }

    const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction)
    const inNamespace = typeEvent !== originalTypeEvent
    const events = getElementEvents(element)
    const storeElementEvent = events[typeEvent] || {}
    const isNamespace = originalTypeEvent.startsWith('.')

    if (typeof callable !== 'undefined') {
      // Simplest case: handler is passed, remove that listener ONLY.
      if (!Object.keys(storeElementEvent).length) {
        return
      }

      removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null)
      return
    }

    if (isNamespace) {
      for (const elementEvent of Object.keys(events)) {
        removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1))
      }
    }

    for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
      const handlerKey = keyHandlers.replace(stripUidRegex, '')

      if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector)
      }
    }
  },

  trigger(element, event, args) {
    if (typeof event !== 'string' || !element) {
      return null
    }

    const $ = (0,_util_index_js__WEBPACK_IMPORTED_MODULE_0__.getjQuery)()
    const typeEvent = getTypeEvent(event)
    const inNamespace = event !== typeEvent

    let jQueryEvent = null
    let bubbles = true
    let nativeDispatch = true
    let defaultPrevented = false

    if (inNamespace && $) {
      jQueryEvent = $.Event(event, args)

      $(element).trigger(jQueryEvent)
      bubbles = !jQueryEvent.isPropagationStopped()
      nativeDispatch = !jQueryEvent.isImmediatePropagationStopped()
      defaultPrevented = jQueryEvent.isDefaultPrevented()
    }

    const evt = hydrateObj(new Event(event, { bubbles, cancelable: true }), args)

    if (defaultPrevented) {
      evt.preventDefault()
    }

    if (nativeDispatch) {
      element.dispatchEvent(evt)
    }

    if (evt.defaultPrevented && jQueryEvent) {
      jQueryEvent.preventDefault()
    }

    return evt
  }
}

function hydrateObj(obj, meta = {}) {
  for (const [key, value] of Object.entries(meta)) {
    try {
      obj[key] = value
    } catch {
      Object.defineProperty(obj, key, {
        configurable: true,
        get() {
          return value
        }
      })
    }
  }

  return obj
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EventHandler);


/***/ }),

/***/ "./node_modules/bootstrap/js/src/dom/manipulator.js":
/*!**********************************************************!*\
  !*** ./node_modules/bootstrap/js/src/dom/manipulator.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * --------------------------------------------------------------------------
 * Bootstrap dom/manipulator.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

function normalizeData(value) {
  if (value === 'true') {
    return true
  }

  if (value === 'false') {
    return false
  }

  if (value === Number(value).toString()) {
    return Number(value)
  }

  if (value === '' || value === 'null') {
    return null
  }

  if (typeof value !== 'string') {
    return value
  }

  try {
    return JSON.parse(decodeURIComponent(value))
  } catch {
    return value
  }
}

function normalizeDataKey(key) {
  return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`)
}

const Manipulator = {
  setDataAttribute(element, key, value) {
    element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value)
  },

  removeDataAttribute(element, key) {
    element.removeAttribute(`data-bs-${normalizeDataKey(key)}`)
  },

  getDataAttributes(element) {
    if (!element) {
      return {}
    }

    const attributes = {}
    const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'))

    for (const key of bsKeys) {
      let pureKey = key.replace(/^bs/, '')
      pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length)
      attributes[pureKey] = normalizeData(element.dataset[key])
    }

    return attributes
  },

  getDataAttribute(element, key) {
    return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`))
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Manipulator);


/***/ }),

/***/ "./node_modules/bootstrap/js/src/dom/selector-engine.js":
/*!**************************************************************!*\
  !*** ./node_modules/bootstrap/js/src/dom/selector-engine.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/index.js */ "./node_modules/bootstrap/js/src/util/index.js");
/**
 * --------------------------------------------------------------------------
 * Bootstrap dom/selector-engine.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */



const getSelector = element => {
  let selector = element.getAttribute('data-bs-target')

  if (!selector || selector === '#') {
    let hrefAttribute = element.getAttribute('href')

    // The only valid content that could double as a selector are IDs or classes,
    // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
    // `document.querySelector` will rightfully complain it is invalid.
    // See https://github.com/twbs/bootstrap/issues/32273
    if (!hrefAttribute || (!hrefAttribute.includes('#') && !hrefAttribute.startsWith('.'))) {
      return null
    }

    // Just in case some CMS puts out a full URL with the anchor appended
    if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
      hrefAttribute = `#${hrefAttribute.split('#')[1]}`
    }

    selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null
  }

  return selector ? selector.split(',').map(sel => (0,_util_index_js__WEBPACK_IMPORTED_MODULE_0__.parseSelector)(sel)).join(',') : null
}

const SelectorEngine = {
  find(selector, element = document.documentElement) {
    return [].concat(...Element.prototype.querySelectorAll.call(element, selector))
  },

  findOne(selector, element = document.documentElement) {
    return Element.prototype.querySelector.call(element, selector)
  },

  children(element, selector) {
    return [].concat(...element.children).filter(child => child.matches(selector))
  },

  parents(element, selector) {
    const parents = []
    let ancestor = element.parentNode.closest(selector)

    while (ancestor) {
      parents.push(ancestor)
      ancestor = ancestor.parentNode.closest(selector)
    }

    return parents
  },

  prev(element, selector) {
    let previous = element.previousElementSibling

    while (previous) {
      if (previous.matches(selector)) {
        return [previous]
      }

      previous = previous.previousElementSibling
    }

    return []
  },
  // TODO: this is now unused; remove later along with prev()
  next(element, selector) {
    let next = element.nextElementSibling

    while (next) {
      if (next.matches(selector)) {
        return [next]
      }

      next = next.nextElementSibling
    }

    return []
  },

  focusableChildren(element) {
    const focusables = [
      'a',
      'button',
      'input',
      'textarea',
      'select',
      'details',
      '[tabindex]',
      '[contenteditable="true"]'
    ].map(selector => `${selector}:not([tabindex^="-"])`).join(',')

    return this.find(focusables, element).filter(el => !(0,_util_index_js__WEBPACK_IMPORTED_MODULE_0__.isDisabled)(el) && (0,_util_index_js__WEBPACK_IMPORTED_MODULE_0__.isVisible)(el))
  },

  getSelectorFromElement(element) {
    const selector = getSelector(element)

    if (selector) {
      return SelectorEngine.findOne(selector) ? selector : null
    }

    return null
  },

  getElementFromSelector(element) {
    const selector = getSelector(element)

    return selector ? SelectorEngine.findOne(selector) : null
  },

  getMultipleElementsFromSelector(element) {
    const selector = getSelector(element)

    return selector ? SelectorEngine.find(selector) : []
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SelectorEngine);


/***/ }),

/***/ "./node_modules/bootstrap/js/src/util/config.js":
/*!******************************************************!*\
  !*** ./node_modules/bootstrap/js/src/util/config.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_manipulator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/manipulator.js */ "./node_modules/bootstrap/js/src/dom/manipulator.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "./node_modules/bootstrap/js/src/util/index.js");
/**
 * --------------------------------------------------------------------------
 * Bootstrap util/config.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */




/**
 * Class definition
 */

class Config {
  // Getters
  static get Default() {
    return {}
  }

  static get DefaultType() {
    return {}
  }

  static get NAME() {
    throw new Error('You have to implement the static method "NAME", for each component!')
  }

  _getConfig(config) {
    config = this._mergeConfigObj(config)
    config = this._configAfterMerge(config)
    this._typeCheckConfig(config)
    return config
  }

  _configAfterMerge(config) {
    return config
  }

  _mergeConfigObj(config, element) {
    const jsonConfig = (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.isElement)(element) ? _dom_manipulator_js__WEBPACK_IMPORTED_MODULE_0__["default"].getDataAttribute(element, 'config') : {} // try to parse

    return {
      ...this.constructor.Default,
      ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
      ...((0,_index_js__WEBPACK_IMPORTED_MODULE_1__.isElement)(element) ? _dom_manipulator_js__WEBPACK_IMPORTED_MODULE_0__["default"].getDataAttributes(element) : {}),
      ...(typeof config === 'object' ? config : {})
    }
  }

  _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
    for (const [property, expectedTypes] of Object.entries(configTypes)) {
      const value = config[property]
      const valueType = (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.isElement)(value) ? 'element' : (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.toType)(value)

      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new TypeError(
          `${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`
        )
      }
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Config);


/***/ }),

/***/ "./node_modules/bootstrap/js/src/util/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/bootstrap/js/src/util/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defineJQueryPlugin: () => (/* binding */ defineJQueryPlugin),
/* harmony export */   execute: () => (/* binding */ execute),
/* harmony export */   executeAfterTransition: () => (/* binding */ executeAfterTransition),
/* harmony export */   findShadowRoot: () => (/* binding */ findShadowRoot),
/* harmony export */   getElement: () => (/* binding */ getElement),
/* harmony export */   getNextActiveElement: () => (/* binding */ getNextActiveElement),
/* harmony export */   getTransitionDurationFromElement: () => (/* binding */ getTransitionDurationFromElement),
/* harmony export */   getUID: () => (/* binding */ getUID),
/* harmony export */   getjQuery: () => (/* binding */ getjQuery),
/* harmony export */   isDisabled: () => (/* binding */ isDisabled),
/* harmony export */   isElement: () => (/* binding */ isElement),
/* harmony export */   isRTL: () => (/* binding */ isRTL),
/* harmony export */   isVisible: () => (/* binding */ isVisible),
/* harmony export */   noop: () => (/* binding */ noop),
/* harmony export */   onDOMContentLoaded: () => (/* binding */ onDOMContentLoaded),
/* harmony export */   parseSelector: () => (/* binding */ parseSelector),
/* harmony export */   reflow: () => (/* binding */ reflow),
/* harmony export */   toType: () => (/* binding */ toType),
/* harmony export */   triggerTransitionEnd: () => (/* binding */ triggerTransitionEnd)
/* harmony export */ });
/**
 * --------------------------------------------------------------------------
 * Bootstrap util/index.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

const MAX_UID = 1_000_000
const MILLISECONDS_MULTIPLIER = 1000
const TRANSITION_END = 'transitionend'

/**
 * Properly escape IDs selectors to handle weird IDs
 * @param {string} selector
 * @returns {string}
 */
const parseSelector = selector => {
  if (selector && window.CSS && window.CSS.escape) {
    // document.querySelector needs escaping to handle IDs (html5+) containing for instance /
    selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`)
  }

  return selector
}

// Shout-out Angus Croll (https://goo.gl/pxwQGp)
const toType = object => {
  if (object === null || object === undefined) {
    return `${object}`
  }

  return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase()
}

/**
 * Public Util API
 */

const getUID = prefix => {
  do {
    prefix += Math.floor(Math.random() * MAX_UID)
  } while (document.getElementById(prefix))

  return prefix
}

const getTransitionDurationFromElement = element => {
  if (!element) {
    return 0
  }

  // Get transition-duration of the element
  let { transitionDuration, transitionDelay } = window.getComputedStyle(element)

  const floatTransitionDuration = Number.parseFloat(transitionDuration)
  const floatTransitionDelay = Number.parseFloat(transitionDelay)

  // Return 0 if element or transition duration is not found
  if (!floatTransitionDuration && !floatTransitionDelay) {
    return 0
  }

  // If multiple durations are defined, take the first
  transitionDuration = transitionDuration.split(',')[0]
  transitionDelay = transitionDelay.split(',')[0]

  return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER
}

const triggerTransitionEnd = element => {
  element.dispatchEvent(new Event(TRANSITION_END))
}

const isElement = object => {
  if (!object || typeof object !== 'object') {
    return false
  }

  if (typeof object.jquery !== 'undefined') {
    object = object[0]
  }

  return typeof object.nodeType !== 'undefined'
}

const getElement = object => {
  // it's a jQuery object or a node element
  if (isElement(object)) {
    return object.jquery ? object[0] : object
  }

  if (typeof object === 'string' && object.length > 0) {
    return document.querySelector(parseSelector(object))
  }

  return null
}

const isVisible = element => {
  if (!isElement(element) || element.getClientRects().length === 0) {
    return false
  }

  const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible'
  // Handle `details` element as its content may falsie appear visible when it is closed
  const closedDetails = element.closest('details:not([open])')

  if (!closedDetails) {
    return elementIsVisible
  }

  if (closedDetails !== element) {
    const summary = element.closest('summary')
    if (summary && summary.parentNode !== closedDetails) {
      return false
    }

    if (summary === null) {
      return false
    }
  }

  return elementIsVisible
}

const isDisabled = element => {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return true
  }

  if (element.classList.contains('disabled')) {
    return true
  }

  if (typeof element.disabled !== 'undefined') {
    return element.disabled
  }

  return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false'
}

const findShadowRoot = element => {
  if (!document.documentElement.attachShadow) {
    return null
  }

  // Can find the shadow root otherwise it'll return the document
  if (typeof element.getRootNode === 'function') {
    const root = element.getRootNode()
    return root instanceof ShadowRoot ? root : null
  }

  if (element instanceof ShadowRoot) {
    return element
  }

  // when we don't find a shadow root
  if (!element.parentNode) {
    return null
  }

  return findShadowRoot(element.parentNode)
}

const noop = () => {}

/**
 * Trick to restart an element's animation
 *
 * @param {HTMLElement} element
 * @return void
 *
 * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
 */
const reflow = element => {
  element.offsetHeight // eslint-disable-line no-unused-expressions
}

const getjQuery = () => {
  if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
    return window.jQuery
  }

  return null
}

const DOMContentLoadedCallbacks = []

const onDOMContentLoaded = callback => {
  if (document.readyState === 'loading') {
    // add listener on the first call when the document is in loading state
    if (!DOMContentLoadedCallbacks.length) {
      document.addEventListener('DOMContentLoaded', () => {
        for (const callback of DOMContentLoadedCallbacks) {
          callback()
        }
      })
    }

    DOMContentLoadedCallbacks.push(callback)
  } else {
    callback()
  }
}

const isRTL = () => document.documentElement.dir === 'rtl'

const defineJQueryPlugin = plugin => {
  onDOMContentLoaded(() => {
    const $ = getjQuery()
    /* istanbul ignore if */
    if ($) {
      const name = plugin.NAME
      const JQUERY_NO_CONFLICT = $.fn[name]
      $.fn[name] = plugin.jQueryInterface
      $.fn[name].Constructor = plugin
      $.fn[name].noConflict = () => {
        $.fn[name] = JQUERY_NO_CONFLICT
        return plugin.jQueryInterface
      }
    }
  })
}

const execute = (possibleCallback, args = [], defaultValue = possibleCallback) => {
  return typeof possibleCallback === 'function' ? possibleCallback(...args) : defaultValue
}

const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
  if (!waitForTransition) {
    execute(callback)
    return
  }

  const durationPadding = 5
  const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding

  let called = false

  const handler = ({ target }) => {
    if (target !== transitionElement) {
      return
    }

    called = true
    transitionElement.removeEventListener(TRANSITION_END, handler)
    execute(callback)
  }

  transitionElement.addEventListener(TRANSITION_END, handler)
  setTimeout(() => {
    if (!called) {
      triggerTransitionEnd(transitionElement)
    }
  }, emulatedDuration)
}

/**
 * Return the previous/next element of a list.
 *
 * @param {array} list    The list of elements
 * @param activeElement   The active element
 * @param shouldGetNext   Choose to get next or previous element
 * @param isCycleAllowed
 * @return {Element|elem} The proper element
 */
const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
  const listLength = list.length
  let index = list.indexOf(activeElement)

  // if the element does not exist in the list return an element
  // depending on the direction and if cycle is allowed
  if (index === -1) {
    return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0]
  }

  index += shouldGetNext ? 1 : -1

  if (isCycleAllowed) {
    index = (index + listLength) % listLength
  }

  return list[Math.max(0, Math.min(index, listLength - 1))]
}




/***/ }),

/***/ "./node_modules/bootstrap/js/src/util/swipe.js":
/*!*****************************************************!*\
  !*** ./node_modules/bootstrap/js/src/util/swipe.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_event_handler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/event-handler.js */ "./node_modules/bootstrap/js/src/dom/event-handler.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config.js */ "./node_modules/bootstrap/js/src/util/config.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ "./node_modules/bootstrap/js/src/util/index.js");
/**
 * --------------------------------------------------------------------------
 * Bootstrap util/swipe.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */





/**
 * Constants
 */

const NAME = 'swipe'
const EVENT_KEY = '.bs.swipe'
const EVENT_TOUCHSTART = `touchstart${EVENT_KEY}`
const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY}`
const EVENT_TOUCHEND = `touchend${EVENT_KEY}`
const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY}`
const EVENT_POINTERUP = `pointerup${EVENT_KEY}`
const POINTER_TYPE_TOUCH = 'touch'
const POINTER_TYPE_PEN = 'pen'
const CLASS_NAME_POINTER_EVENT = 'pointer-event'
const SWIPE_THRESHOLD = 40

const Default = {
  endCallback: null,
  leftCallback: null,
  rightCallback: null
}

const DefaultType = {
  endCallback: '(function|null)',
  leftCallback: '(function|null)',
  rightCallback: '(function|null)'
}

/**
 * Class definition
 */

class Swipe extends _config_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(element, config) {
    super()
    this._element = element

    if (!element || !Swipe.isSupported()) {
      return
    }

    this._config = this._getConfig(config)
    this._deltaX = 0
    this._supportPointerEvents = Boolean(window.PointerEvent)
    this._initEvents()
  }

  // Getters
  static get Default() {
    return Default
  }

  static get DefaultType() {
    return DefaultType
  }

  static get NAME() {
    return NAME
  }

  // Public
  dispose() {
    _dom_event_handler_js__WEBPACK_IMPORTED_MODULE_0__["default"].off(this._element, EVENT_KEY)
  }

  // Private
  _start(event) {
    if (!this._supportPointerEvents) {
      this._deltaX = event.touches[0].clientX

      return
    }

    if (this._eventIsPointerPenTouch(event)) {
      this._deltaX = event.clientX
    }
  }

  _end(event) {
    if (this._eventIsPointerPenTouch(event)) {
      this._deltaX = event.clientX - this._deltaX
    }

    this._handleSwipe()
    ;(0,_index_js__WEBPACK_IMPORTED_MODULE_2__.execute)(this._config.endCallback)
  }

  _move(event) {
    this._deltaX = event.touches && event.touches.length > 1 ?
      0 :
      event.touches[0].clientX - this._deltaX
  }

  _handleSwipe() {
    const absDeltaX = Math.abs(this._deltaX)

    if (absDeltaX <= SWIPE_THRESHOLD) {
      return
    }

    const direction = absDeltaX / this._deltaX

    this._deltaX = 0

    if (!direction) {
      return
    }

    (0,_index_js__WEBPACK_IMPORTED_MODULE_2__.execute)(direction > 0 ? this._config.rightCallback : this._config.leftCallback)
  }

  _initEvents() {
    if (this._supportPointerEvents) {
      _dom_event_handler_js__WEBPACK_IMPORTED_MODULE_0__["default"].on(this._element, EVENT_POINTERDOWN, event => this._start(event))
      _dom_event_handler_js__WEBPACK_IMPORTED_MODULE_0__["default"].on(this._element, EVENT_POINTERUP, event => this._end(event))

      this._element.classList.add(CLASS_NAME_POINTER_EVENT)
    } else {
      _dom_event_handler_js__WEBPACK_IMPORTED_MODULE_0__["default"].on(this._element, EVENT_TOUCHSTART, event => this._start(event))
      _dom_event_handler_js__WEBPACK_IMPORTED_MODULE_0__["default"].on(this._element, EVENT_TOUCHMOVE, event => this._move(event))
      _dom_event_handler_js__WEBPACK_IMPORTED_MODULE_0__["default"].on(this._element, EVENT_TOUCHEND, event => this._end(event))
    }
  }

  _eventIsPointerPenTouch(event) {
    return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH)
  }

  // Static
  static isSupported() {
    return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Swipe);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./js/carousels.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_bootstrap_js_src_carousel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/bootstrap/js/src/carousel.js */ "./node_modules/bootstrap/js/src/carousel.js");

var carousel = document.querySelector('.carousel');
var slide = new _node_modules_bootstrap_js_src_carousel_js__WEBPACK_IMPORTED_MODULE_0__["default"](carousel, {
  interval: 2000,
  wrap: false
});
})();

/******/ })()
;
//# sourceMappingURL=carousels.bundle.js.map