# import sketch file
app = Framer.Importer.load("imported/yummy@2x", scale: 1)
Utils.globalLayers app

# load yummy module
yummy = require "yummy"
window.io = []
	
# load gorgeous FindFramer module // https://github.com/awt2542/Find-for-Framer
{ƒ,ƒƒ} = require 'findModule'

# preload all images for cloud view
yummy.preloadImages([ƒƒ('*')])
	
# init views
yummy.views([ƒƒ('*view*')])

# init buttons
yummy.buttons(ƒƒ('*Button*'))

# load 1st view
viewOne.visible = true
window.thisView = viewOne


# view One
nextViewTransition = ""
lastViewTransition = ""

nextViewFromAboveButton.onTouchEnd ->	
	nextViewTransition = "above"
	yummy.nextViewFrom(nextViewTransition, viewTwo, 0, 0.5, Bezier.ease, null)
	
nextViewFromRightButton.onTouchEnd ->	
	nextViewTransition = "right"
	yummy.nextViewFrom(nextViewTransition, viewTwo, 0, 0.5, Bezier., null)
	
nextViewFromOverlayButton.onTouchEnd ->	
	nextViewTransition = "overlay"
	yummy.nextViewFrom(nextViewTransition, viewTwo, 0, 0.5, Bezier.ease, null)
	
	
# view Two
backButton.onTouchEnd ->	

	if nextViewTransition == "above"
		lastViewTransition = "below"
	else if nextViewTransition == "right"
		lastViewTransition = "left"
	else if nextViewTransition == "overlay"
		lastViewTransition = "overlay"
		
	yummy.nextViewFrom(lastViewTransition, viewOne, 0, 0.5, Bezier.ease, null)