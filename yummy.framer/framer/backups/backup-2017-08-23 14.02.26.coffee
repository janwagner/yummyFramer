# Import file "yummy"
app = Framer.Importer.load("imported/yummy@2x", scale: 1)
Utils.globalLayers app

# load yummy module
yummy = require "yummy"
window.io = []
	
# load FindFramer module // https://github.com/awt2542/Find-for-Framer
{ƒ,ƒƒ} = require 'findModule'
	
# init views
yummy.initViews([ ƒƒ('view*') ])

# init buttons
yummy.buttons([ ƒƒ('*button*') ])

# load 1st view
viewOne.visible = true
window.thisView = viewOne

# view One
yummy.nextViewFrom("fade", viewOne, 0, 3, Bezier.ease, null)