# Import file "app"
app = Framer.Importer.load("imported/app@2x", scale: 1)
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

# init views
yummy.fade(viewOne, 1, 0, 0.5)
yummy.nextViewFrom("fade", viewOne, 0, 3, Bezier.ease, null)