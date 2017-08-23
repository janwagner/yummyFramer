# Import file "yummy"
app = Framer.Importer.load("imported/yummy@2x", scale: 1)
Utils.globalLayers app

# init module
yummy = require "yummy"
window.io = []
	
# init views
yummy.initViews([
	viewOne,
	viewTwo,
	viewThree
])

# load 1st view
viewOne.visible = true
window.thisView = viewOne

# view One
yummy.nextViewFrom("fade", viewOne, 0, 3, Bezier.ease, null)