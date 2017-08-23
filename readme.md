# yummy Framer

### Version
1.0.0

### Demo
- https://framer.cloud/nrMNk

### Requires
- Framer.js https://framer.com/
- Find for Framer https://github.com/awt2542/Find-for-Framer


#### Imports
```sh
    # yummy Framer
    yummy = require "yummy"
    window.io = []
    
    # Gorgeous FindFramer module // https://github.com/awt2542/Find-for-Framer
    {ƒ,ƒƒ} = require 'findModule'
```
#### Load Views
```sh
    # init views
    yummy.views([ƒƒ('*view*')])
    
    # load 1st view
    viewOne.visible = true
    window.thisView = viewOne
```
#### Load Next View
```sh
    @nextViewFrom = (from, enteringView, delay, time, ease, nextFunction)
    
    # from as string
        "left", "right", "above", "below", "alpha", "overlay"
    # enteringView as layer
    # delay as int
    # time as int
    # ease as ease
        Bezier.ease, Bezier.easeIn, Bezier.linear, Bezier.easeIn, Bezier.easeInOut, Spring
    # nextFunction as function
```

#### Fade Layer
```sh
    @fade = (layer, toAlpha, delay, time)
    
    # layer as layer
    # toAlpha as int
    # delay as int
    # time as int
```

#### Move Layer
```sh
    @move = (layer, toX, toY, delay, time, curve, animationEndFunction)
    
    # layer as layer
    # toX as int
    # toY as int
    # delay as int
    # time as int
    # curve as curve
    # animationEndFunction as function
```