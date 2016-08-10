/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2016, Codrops
 * http://www.codrops.com
 */
;(function(window) {

	'use strict';

	/**
	 * Helper vars and functions:
	 */
	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}
	// From https://davidwalsh.name/javascript-debounce-function.
	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};
	
	/**
	 * MLSlideshow obj.
	 */
	function MLSlideshow(el, options) {
		this.el = el;
		// Options/Settings.
		this.options = extend( {}, this.options );
		extend( this.options, options );

		// The slides
		this.slides = [].slice.call(this.el.querySelectorAll('.slide'));
		// Total slides.
		this.slidesTotal = this.slides.length;
		if( this.slidesTotal <= 1 ) return;
		// Current slide.
		this.current = this.options.startIdx || 0;
		// Slideshow dimensions:
		this.dimentions = {width : this.el.offsetWidth, height : this.el.offsetHeight};
		
		this._init();
	}

	/**
	 * Options.
	 */
	MLSlideshow.prototype.options = {
		// Starting position.
		startIdx : 0,
		// Layout configuration.
		// [layout name] : { out : {navigating out properties}, in : {navigating in properties} }
		// For some properties we can have a "next" and "prev" behavior which can be different for the two - navigating out/in to the right or left.
		// For the translationX/Y we can use percentage values (relative to the Slideshow element).
		layoutConfig : {
			layout1 : {
				out : {
					translateX : {
						next: '-100%', 
						prev: '100%'
					},
					rotateZ : {
						next: function(el, index) {
							return anime.random(-15, 0);
						}, 
						prev: function(el, index) {
							return anime.random(0, 15);
						}
					},
					opacity : 0,
					duration: 1200,
					easing : 'easeOutQuint',
					itemsDelay : 80
				},
				in : {
					resetProps : {
						translateX : {
							next: '100%', 
							prev: '-100%'
						},
						rotateZ : {
							next: function(el, index) {
								return anime.random(0, 15);
							}, 
							prev: function(el, index) {
								return anime.random(-15, 0);
							}
						},
						opacity : 0,
					},
					translateX : '0%',
					rotateZ : 0,
					opacity : 1,
					duration: 700,
					easing : 'easeOutQuint',
					itemsDelay : 80
				}
			},
			layout2 : {
				out : {
					translateX : {
						next: function(el, index) {
							return anime.random(-50, 50) + '%';
						}, 
						prev: function(el, index) {
							return anime.random(-50, 50) + '%';
						}
					},
					translateY : {
						next: function(el, index) {
							return anime.random(-50, 50) + '%';
						}, 
						prev: function(el, index) {
							return anime.random(-50, 50) + '%';
						}
					},
					opacity : 0,
					duration: 1200,
					easing : 'easeOutQuint',
					itemsDelay : 10
				},
				in : {
					resetProps : {
						translateX : {
							next: '100%', 
							prev: '-100%'
						},
						rotateZ : {
							next: function(el, index) {
								return anime.random(0, 90);
							}, 
							prev: function(el, index) {
								return anime.random(-90, 0);
							}
						},
						opacity : 0,
					},
					translateX : '0%',
					rotateZ : 0,
					opacity : 1,
					duration: 900,
					easing : 'easeOutExpo',
					itemsDelay : 30
				}
			},
			layout3 : {
				out : {
					translateX : '-10%',
					rotateZ : 0,
					opacity : 0,
					duration: 500,
					easing : 'easeOutExpo',
					itemsDelay : 0
				},
				in : {
					resetProps : {
						translateX : '-10%',
						rotateZ : 0,
						opacity : 0
					},
					translateX : 0,
					opacity : 1,
					rotateZ : {
						next: function(el, index) {
							return index*6;
						}, 
						prev: function(el, index) {
							return index*6;
						}
					},
					duration: 1200,
					easing : 'easeOutElastic',
					itemsDelay : 0
				}
			},
			layout4 : {
				out : {
					translateY : {
						next: '60%',
						prev: '-60%'
					},
					opacity : 0,
					duration: 700,
					easing : 'easeOutQuint',
					itemsDelay : 50
				},
				in : {
					resetProps : {
						translateY : {
							next: '-60%',
							prev: '60%'
						},
						opacity : 0,
					},
					translateY : '0%',
					opacity : 1,
					duration: 700,
					easing : 'easeOutQuint',
					itemsDelay : 50,
					delay : 250
				}
			},
			layout5 : {
				out : {
					scale : 0.5,
					opacity : 0,
					duration: 500,
					easing : 'easeOutExpo',
					itemsDelay : 20
				},
				in : {
					resetProps : {
						scale : 0.5,
						opacity : 0
					},
					opacity : 1,
					scale : 1,
					duration: 500,
					easing : 'easeOutExpo',
					itemsDelay : 20,
					delay: 300
				}
			},
			layout6 : {
				out : {
					scale : 0.5,
					opacity : 0,
					duration: 300,
					easing : 'easeInBack',
					itemsDelay : 20
				},
				in : {
					resetProps : {
						scale : 0.5,
						opacity : 0
					},
					opacity : 1,
					scale : 1,
					duration : 1000,
					easing : 'easeOutElastic',
					itemsDelay : 50,
					delay : 400
				}
			},
			layout7 : {
				out : {
					translateX : {
						next: '-100%', 
						prev: '100%'
					},
					opacity : 0,
					duration: 1200,
					easing : 'easeOutQuint',
					itemsDelay : 40
				},
				in : {
					resetProps : {
						translateX : {
							next: '100%', 
							prev: '-100%'
						},
						rotateZ : {
							next: function(el, index) {
								return anime.random(0, 25);
							}, 
							prev: function(el, index) {
								return anime.random(-25, 0);
							}
						},
						opacity : 0,
					},
					translateX : '0%',
					rotateZ : 0,
					opacity : 1,
					duration: 700,
					easing : 'easeOutQuint',
					itemsDelay : 40,
					delay : 250 
				}
			}
		}
	};

	/**
	 * Init.
	 */
	MLSlideshow.prototype._init = function() {
		var self = this,
			onPreload = function() {
				self.el.classList.add('slideshow--loaded');
				// Set class current to the current slide.
				self.slides[self.current].classList.add('slide--current');
			};

		// Preload all images.
		this._preload(onPreload);
		// Init/Bind events
		this._initEvents();
	};

	/**
	 * Init/Bind Events.
	 */
	MLSlideshow.prototype._initEvents = function() {
		var self = this;
		
		// Window resize.
		this.debounceResize = debounce(function(ev) {
			// Recalculate dimensions.
			self.dimentions = {width : self.el.offsetWidth, height : self.el.offsetHeight};
		}, 10);

		// Keyboard events.
		this.keyboardFn = function(ev) {
			var keyCode = ev.keyCode || ev.which;
			switch (keyCode) {
				case 37:
					self._navigate('prev');
					break;
				case 39:
					self._navigate('next');
					break;
			}
		};

		window.addEventListener('resize', this.debounceResize);
		this.el.addEventListener('keydown', this.keyboardFn);
	};

	/**
	 * Preload all images.
	 */
	MLSlideshow.prototype._preload = function(callback) {
		imagesLoaded(this.el, {background: true}, function() {
			if( typeof callback === 'function' ) { callback(); }
		});
	};

	/**
	 * Navigation.
	 */
	MLSlideshow.prototype._navigate = function(direction) {
		if( this.isAnimating ) {
			return false;
		}
		this.isAnimating = true;

		var self = this,
			// Current slide.
			currentSlide = this.slides[this.current],
			// Layout name. Defaults to "layout1".
			currentLayout = currentSlide.getAttribute('data-layout') || 'layout1',
			currentTitle = currentSlide.querySelector('.slide__title');

		if( direction === 'next' ) {
			this.current = this.current < this.slidesTotal - 1 ? this.current + 1 : 0;
		}
		else {
			this.current = this.current > 0 ? this.current - 1 : this.slidesTotal - 1;
		}

		var nextSlide = this.slides[this.current],
			nextLayout = nextSlide.getAttribute('data-layout'),
			nextTitle = nextSlide.querySelector('.slide__title');

		// Animate the nextSlide´s items in..
		var animateIn = function() {
			clearTimeout(self.navtime);

			var inItems = [].slice.call(nextSlide.querySelectorAll('.slide-imgwrap .slide__img-inner')),
				inconfig = self.options.layoutConfig[nextLayout] !== undefined ? self.options.layoutConfig[nextLayout].in : self.options.layoutConfig['layout1'].in,
				inresetconfig = inconfig.resetProps,
				animeInProps = {
					targets: inItems,
					duration: inconfig.duration,
					easing: inconfig.easing,
					delay: function(el, index) {
						return direction === 'next' ? index * inconfig.itemsDelay : (inItems.length - 1 - index) * inconfig.itemsDelay;
					},
					complete: function() {
						self.isAnimating = false;
					}
				};

			// Configure the animation in properties.
			self._setAnimationProperties(animeInProps, inconfig, direction);
			// Reset before animating in:
			inItems.forEach(function(item, pos) {
				var transformStr = '';
				if( inresetconfig.translateX !== undefined ) {
					var tx = typeof inresetconfig.translateX === 'object' ? function() {
						return typeof inresetconfig.translateX[direction] === 'function' ? self._getValuePercentage(inresetconfig.translateX[direction](item, pos), 'width') : self._getValuePercentage(inresetconfig.translateX[direction], 'width');
					} : self._getValuePercentage(inresetconfig.translateX, 'width');
					
					transformStr += ' translateX(' + (typeof tx === 'function' ? tx() : tx) + 'px)';
				}
				if( inresetconfig.translateY !== undefined ) {
					var ty = typeof inresetconfig.translateY === 'object' ? function() {
						return typeof inresetconfig.translateY[direction] === 'function' ? self._getValuePercentage(inresetconfig.translateY[direction](item, pos), 'height') : self._getValuePercentage(inresetconfig.translateY[direction], 'height');
					} : self._getValuePercentage(inresetconfig.translateY, 'height');
					transformStr += ' translateY(' + (typeof ty === 'function' ? ty() : ty) + 'px)';
				}
				if( inresetconfig.rotateZ !== undefined ) {
					var rot = typeof inresetconfig.rotateZ === 'object' ? function() {
						return typeof inresetconfig.rotateZ[direction] === 'function' ? inresetconfig.rotateZ[direction](item, pos) : inresetconfig.rotateZ[direction];
					} : inresetconfig.rotateZ;
					
					transformStr += ' rotateZ(' + (typeof rot === 'function' ? rot() : rot) + 'deg)';
				}
				if( inresetconfig.scale !== undefined ) {
					var s = typeof inresetconfig.scale === 'object' ? function() {
						return typeof inresetconfig.scale[direction] === 'function' ? inresetconfig.scale[direction](item, pos) : inresetconfig.scale[direction];
					} : inresetconfig.scale;
					
					transformStr += ' scale(' + (typeof s === 'function' ? s() : s) + ')';
				}
				if( transformStr !== '' ) {
					item.style.transform = item.style.WebkitTransform = transformStr;
				}
				if( inresetconfig.opacity !== undefined ) {
					item.style.opacity = inresetconfig.opacity;
				}
			});
			// Reset next title.
			nextTitle.style.opacity = 0;
			// Switch current class.
			nextSlide.classList.add('slide--current');
			// Animate next slide in.
			anime(animeInProps);
			// Animate next title in.
			self._animateTitle(nextTitle, 'in');
		};

		// Animate the currentSlide´s items out..
		var outItems = [].slice.call(currentSlide.querySelectorAll('.slide-imgwrap .slide__img-inner')),
			outconfig = this.options.layoutConfig[currentLayout] !== undefined ? this.options.layoutConfig[currentLayout].out : this.options.layoutConfig['layout1'].out,
			animeOutProps = {
				targets: outItems,
				duration: outconfig.duration,
				easing : outconfig.easing,
				delay: function(el, index) {
					return direction === 'next' ? index * outconfig.itemsDelay : (outItems.length - 1 - index) * outconfig.itemsDelay;
				},
				complete: function() {
					currentSlide.classList.remove('slide--current');
				}
			};

		// Configure the animation out properties.
		this._setAnimationProperties(animeOutProps, outconfig, direction);
		// Animate current slide out.
		anime(animeOutProps);
		// Animate current title out.
		this._animateTitle(currentTitle, 'out');
		// Animate the next items in..
		clearTimeout(this.navtime);
		this.navtime = setTimeout(animateIn, this.options.layoutConfig[nextLayout] !== undefined && this.options.layoutConfig[nextLayout].in.delay !== undefined ? this.options.layoutConfig[nextLayout].in.delay : 150 );
	};

	/**
	 * Sets the animation properties for anime.js.
	 */
	MLSlideshow.prototype._setAnimationProperties = function(props, config, direction) {
		var self = this;
		if( config.translateX !== undefined ) {
			props.translateX = typeof config.translateX === 'object' ? function(el, index) {
				return typeof config.translateX[direction] === 'function' ? self._getValuePercentage(config.translateX[direction](el, index), 'width') : self._getValuePercentage(config.translateX[direction], 'width');
			} : this._getValuePercentage(config.translateX, 'width');
		}
		if( config.translateY !== undefined ) {
			props.translateY = typeof config.translateY === 'object' ? function(el, index) {
				return typeof config.translateY[direction] === 'function' ? self._getValuePercentage(config.translateY[direction](el, index), 'width') : self._getValuePercentage(config.translateY[direction], 'height');
			} : this._getValuePercentage(config.translateY, 'height');
		}
		if( config.rotateZ !== undefined ) {
			props.rotateZ = typeof config.rotateZ === 'object' ? function(el, index) {
				return typeof config.rotateZ[direction] === 'function' ? config.rotateZ[direction](el, index) : config.rotateZ[direction];
			} : config.rotateZ;
		}
		if( config.scale !== undefined ) {
			props.scale = typeof config.scale === 'object' ? function(el, index) {
				return typeof config.scale[direction] === 'function' ? config.scale[direction](el, index) : config.scale[direction];
			} : config.scale;
		}
		if( config.opacity !== undefined ) {
			props.opacity = config.opacity;
		}
	};

	/**
	 * Animate the title in and out.
	 */
	MLSlideshow.prototype._animateTitle = function(titleEl, dir) {
		anime({
			targets: titleEl,
			opacity: dir === 'out' ? 0 : 1,
			duration: dir === 'out' ? 200 : 500,
			easing: 'easeOutExpo'
		});
	};

	/**
	 * Navigate to the next slide.
	 */
	MLSlideshow.prototype.next = function() {
		this._navigate('next');
	};

	/**
	 * Navigate to the previous slide.
	 */
	MLSlideshow.prototype.prev = function() {
		this._navigate('prev');
	};

	/**
	 * If "str" is a percentage value (e.g. 50%) it returns the calculation in px for that value (relative to the main Slideshow element).
	 */
	MLSlideshow.prototype._getValuePercentage = function(str, axis) {
		return typeof str === 'string' && str.indexOf('%') !== -1 ? parseFloat(str)/100*this.dimentions[axis] : str;
	};

	window.MLSlideshow = MLSlideshow;

})(window);