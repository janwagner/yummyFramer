class YUMMY

	@variable = (type) ->

		# type as string

		switch
			when type == "screenWidth" then output = Framer.Device.screen.width/2
			when type == "screenHeight" then output = Framer.Device.screen.height/2
			when type == "colorError" then output = 'rgba(231, 0, 65, 1)'
			when type == "colorSucces" then output = 'rgba(144, 187, 0, 1)'
			when type == "colorHighlight" then output = 'rgba(71, 149, 212, 1)'

		return output

	@views = (array) ->

		# array as array of views

		window.views = array

		for view in views
			view.clip = true
			view.index = 1
			view.visible = false
			view.x = 0
			view.y = 0

	@preloadImages = (array) ->

		# array as array of layer

		Framer.Extras.Preloader.enable()

		preloadImages = array

		for layer in preloadImages
			Framer.Extras.Preloader.addImage(layer.image)

	@buttons = (array) ->

		# array as array of buttons

		window.buttons = array

		for button in buttons

			children = button.children

			if children.length > 0

				button.onTouchStart ->
					thisChildren = this.children
					for child in thisChildren
						if child.name.includes("default")
							child.visible = false

				button.onTouchEnd ->
					thisChildren = this.children
					for child in thisChildren
						if child.name.includes("default")
							child.visible = true

			else

				button.onTouchStart ->
					this.opacity = 0.5
				button.onTouchEnd ->
					this.opacity = 1.0

	@overlay = (parent) ->

		# parent as layer

		overlay = new Layer
			backgroundColor: 'rgba(0,0,0,.8)'
			height: YUMMY.variable("screenHeight")
			name: 'overlay'
			parent: parent
			width: YUMMY.variable("screenWidth")
			x: 0
			y: 0

	@nextViewFrom = (from, enteringView, delay, time, ease, nextFunction) ->

		# from as string
		# enteringView as layer
		# delay as int
		# time as int
		# ease as ease
		# nextFunction as function

		leavingView = window.thisView
		window.thisView = enteringView

		enteringView.visible = true
		enteringView.opacity = 1

		enteringView.index = 2
		leavingView.index = 1

		leavingViewToX = null
		leavingViewToY = null

		leavingView.scale = 1
		enteringView.scale = 1

		# transition
		if from == "left"

			enteringView.x = -YUMMY.variable("screenWidth")
			enteringView.y = 0
			leavingViewToX = YUMMY.variable("screenWidth")
			leavingViewToY = 0

		else if from == "right"

			enteringView.x = YUMMY.variable("screenWidth");
			enteringView.y = 0
			leavingViewToX = -YUMMY.variable("screenWidth")
			leavingViewToY = 0

		else if from == "above"

			enteringView.opacity = 0
			enteringView.x = 0
			enteringView.y = 0
			enteringView.scale = 1.1

			enteringView.animate
				options:
					delay: delay
					time: time
					curve: ease
				opacity: 1
				scale: 1

		else if from == "below"

			enteringView.opacity = 0
			enteringView.x = 0
			enteringView.y = 0
			enteringView.index = 1
			leavingView.index = 2

			enteringView.animate
				options:
					delay: delay
					time: time
					curve: ease
				opacity: 1
			leavingView.animate
				options:
					delay: delay
					time: time
					curve: ease
				opacity: 0
				scale: 1.1

		else if from == "alpha"

			enteringView.opacity = 0
			enteringView.x = 0
			enteringView.y = 0
			enteringView.index = 1
			leavingView.index = 2

			enteringView.animate
				options:
					delay: delay
					time: time
					curve: ease
				opacity: 1
			leavingView.animate
				options:
					delay: delay
					time: time
					curve: ease
				opacity: 0

		else if from == "overlay"

			if window.showOverlay

				# view
				enteringView.x = 0
				enteringView.y = 0
				leavingViewToX = 0
				leavingViewToY = YUMMY.variable("screenHeight")
				leavingView.index = 3
				enteringView.scale = 0.9
				enteringViewToScale = 1

				# overlay
				overlay = YUMMY.overlay(enteringView)
				YUMMY.fade(overlay, 0, 0, time*0.5)
				window.showOverlay = false

			else

				# view
				enteringView.x = 0
				enteringView.y = YUMMY.variable("screenHeight")
				leavingViewToX = 0
				leavingViewToY = 0
				leavingViewToScale = 0.9

				# overlay
				overlay = YUMMY.overlay(leavingView)
				overlay.opacity = 0
				YUMMY.fade(overlay, 1, 0, time*0.5)
				window.showOverlay = true

		leavingView.animate
			options:
				delay: delay
				time: time
				curve: ease
			x: leavingViewToX
			y: leavingViewToY
			scale: leavingViewToScale

		enteringView.animate
			options:
				delay: delay
				time: time
				curve: ease
			x: 0
			y: 0
			scale: enteringViewToScale

		# after animation function
		enteringView.onAnimationEnd ->

			enteringView.off(Events.AnimationEnd)
			leavingViewToScale = 1
			leavingView.visible = false

			for view in window.views
				view.index = 1

			if from == "overlay"
				overlay.destroy()

		# next function
		if nextFunction
			leavingView.onAnimationEnd ->
				leavingView.off(Events.AnimationEnd)
				nextFunction()

	@fade = (layer, toAlpha, delay, time) ->

		# layer as layer
		# toAlpha as int
		# delay as int
		# time as int

		if layer.visible == false
			layer.visible = true
			layer.opacity = 0

		if layer.opacity != toAlpha
			if not layer.isAnimating
				if toAlpha == 1
					layer.visible = true
				layer.animate
					options:
						time: time
						curve: Bezier.linear
						delay: delay
					opacity: toAlpha
				layer.onAnimationEnd ->
					layer.off(Events.AnimationEnd)
					if toAlpha == 0
						layer.visible = false

	@move = (layer, toX, toY, delay, time, curve, animationEndFunction) ->

		# layer as layer
		# toX as int
		# toY as int
		# delay as int
		# time as int
		# curve as curve
		# animationEndFunction as function

		if not layer.isAnimating
			layer.animate
				options:
					curve: curve
					delay: delay
					time: time
				x: toX
				y: toY
			if animationEndFunction
				layer.onAnimationEnd ->
					layer.off(Events.AnimationEnd)
					animationEndFunction()

module.exports = YUMMY