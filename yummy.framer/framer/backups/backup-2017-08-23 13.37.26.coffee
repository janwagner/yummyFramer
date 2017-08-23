# Import file "app"
app = Framer.Importer.load("imported/app@2x", scale: 1)
Utils.globalLayers app

# init module
yummy = require "yummy"
window.io = []
	
# init views
yummy.initViews([
	"viewOne",
	"viewTwo",
	"viewThree"
])

for view in window.views 
	print view

# init views
yummy.nextViewFrom("fade", viewOne, 0, 1, Bezier.ease, null)