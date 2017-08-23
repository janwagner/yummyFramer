# Import file "yummy"
app = Framer.Importer.load("imported/yummy@2x", scale: 1)
Utils.globalLayers app

# load yummy module
yummy = require "yummy"
window.io = []
	
# load FindFramer module // https://github.com/awt2542/Find-for-Framer
{ƒ,ƒƒ} = require 'findModule'
	
# init views
yummy.views([ƒƒ('*view*')])

# init buttons
yummy.buttons(ƒƒ('*button*'))

# load 1st view
viewOne.visible = true
window.thisView = viewOne

# view One
nextViewFromAboveButton.onTouchEnd ->
	lastViewTransition = "above"
	yummy.nextViewFrom(lastViewTransition, viewTwo, 0, 0.5, Bezier.ease, null)
	
nextViewFromRightButton.onTouchEnd ->
	lastViewTransition = "above"
	yummy.nextViewFrom("right", viewTwo, 0, 0.5, Bezier.ease, null)
	
nextViewFromOverlayButton.onTouchEnd ->
	lastViewTransition = "above"
	yummy.nextViewFrom("overlay", viewTwo, 0, 0.5, Bezier.ease, null)
	
# view Two
nextViewFromAboveButton.onTouchEnd ->	
	yummy.nextViewFrom("above", viewTwo, 0, 0.5, Bezier.ease, null)
	
nextViewFromRightButton.onTouchEnd ->	
	yummy.nextViewFrom("right", viewTwo, 0, 0.5, Bezier.ease, null)
	
nextViewFromOverlayButton.onTouchEnd ->	
	yummy.nextViewFrom("overlay", viewTwo, 0, 0.5, Bezier.ease, null)