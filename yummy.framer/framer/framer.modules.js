require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"findModule":[function(require,module,exports){
var _findAll, _getHierarchy, _match;

_getHierarchy = function(layer) {
  var a, i, len, ref, string;
  string = '';
  ref = layer.ancestors();
  for (i = 0, len = ref.length; i < len; i++) {
    a = ref[i];
    string = a.name + '>' + string;
  }
  return string = string + layer.name;
};

_match = function(hierarchy, string) {
  var regExp, regexString;
  string = string.replace(/\s*>\s*/g, '>');
  string = string.split('*').join('[^>]*');
  string = string.split(' ').join('(?:.*)>');
  string = string.split(',').join('$|');
  regexString = "(^|>)" + string + "$";
  regExp = new RegExp(regexString);
  return hierarchy.match(regExp);
};

_findAll = function(selector, fromLayer) {
  var layers, stringNeedsRegex;
  layers = Framer.CurrentContext._layers;
  if (selector != null) {
    stringNeedsRegex = _.find(['*', ' ', '>', ','], function(c) {
      return _.includes(selector, c);
    });
    if (!(stringNeedsRegex || fromLayer)) {
      return layers = _.filter(layers, function(layer) {
        if (layer.name === selector) {
          return true;
        }
      });
    } else {
      return layers = _.filter(layers, function(layer) {
        var hierarchy;
        hierarchy = _getHierarchy(layer);
        if (fromLayer != null) {
          return _match(hierarchy, fromLayer.name + ' ' + selector);
        } else {
          return _match(hierarchy, selector);
        }
      });
    }
  } else {
    return layers;
  }
};

exports.Find = function(selector, fromLayer) {
  return _findAll(selector, fromLayer)[0];
};

exports.ƒ = function(selector, fromLayer) {
  return _findAll(selector, fromLayer)[0];
};

exports.FindAll = function(selector, fromLayer) {
  return _findAll(selector, fromLayer);
};

exports.ƒƒ = function(selector, fromLayer) {
  return _findAll(selector, fromLayer);
};

Layer.prototype.find = function(selector, fromLayer) {
  return _findAll(selector, this)[0];
};

Layer.prototype.ƒ = function(selector, fromLayer) {
  return _findAll(selector, this)[0];
};

Layer.prototype.findAll = function(selector, fromLayer) {
  return _findAll(selector, this);
};

Layer.prototype.ƒƒ = function(selector, fromLayer) {
  return _findAll(selector, this);
};


},{}],"yummy":[function(require,module,exports){
var YUMMY;

YUMMY = (function() {
  function YUMMY() {}

  YUMMY.variable = function(type) {
    var output;
    switch (false) {
      case type !== "screenWidth":
        output = Framer.Device.screen.width / 2;
        break;
      case type !== "screenHeight":
        output = Framer.Device.screen.height / 2;
        break;
      case type !== "colorError":
        output = 'rgba(231, 0, 65, 1)';
        break;
      case type !== "colorSucces":
        output = 'rgba(144, 187, 0, 1)';
        break;
      case type !== "colorHighlight":
        output = 'rgba(71, 149, 212, 1)';
    }
    return output;
  };

  YUMMY.views = function(array) {
    var i, len, results, view;
    window.views = array;
    results = [];
    for (i = 0, len = views.length; i < len; i++) {
      view = views[i];
      view.clip = true;
      view.index = 1;
      view.visible = false;
      view.x = 0;
      results.push(view.y = 0);
    }
    return results;
  };

  YUMMY.preloadImages = function(array) {
    var i, layer, len, preloadImages, results;
    Framer.Extras.Preloader.enable();
    preloadImages = array;
    results = [];
    for (i = 0, len = preloadImages.length; i < len; i++) {
      layer = preloadImages[i];
      results.push(Framer.Extras.Preloader.addImage(layer.image));
    }
    return results;
  };

  YUMMY.buttons = function(array) {
    var button, children, i, len, results;
    window.buttons = array;
    results = [];
    for (i = 0, len = buttons.length; i < len; i++) {
      button = buttons[i];
      children = button.children;
      if (children.length > 0) {
        button.onTouchStart(function() {
          var child, j, len1, results1, thisChildren;
          thisChildren = this.children;
          results1 = [];
          for (j = 0, len1 = thisChildren.length; j < len1; j++) {
            child = thisChildren[j];
            if (child.name.includes("default")) {
              results1.push(child.visible = false);
            } else {
              results1.push(void 0);
            }
          }
          return results1;
        });
        results.push(button.onTouchEnd(function() {
          var child, j, len1, results1, thisChildren;
          thisChildren = this.children;
          results1 = [];
          for (j = 0, len1 = thisChildren.length; j < len1; j++) {
            child = thisChildren[j];
            if (child.name.includes("default")) {
              results1.push(child.visible = true);
            } else {
              results1.push(void 0);
            }
          }
          return results1;
        }));
      } else {
        button.onTouchStart(function() {
          return this.opacity = 0.5;
        });
        results.push(button.onTouchEnd(function() {
          return this.opacity = 1.0;
        }));
      }
    }
    return results;
  };

  YUMMY.overlay = function(parent) {
    var overlay;
    return overlay = new Layer({
      backgroundColor: 'rgba(0,0,0,.8)',
      height: YUMMY.variable("screenHeight"),
      name: 'overlay',
      parent: parent,
      width: YUMMY.variable("screenWidth"),
      x: 0,
      y: 0
    });
  };

  YUMMY.nextViewFrom = function(from, enteringView, delay, time, curve, nextFunction) {
    var enteringViewToScale, leavingView, leavingViewToScale, leavingViewToX, leavingViewToY, overlay;
    leavingView = window.thisView;
    window.thisView = enteringView;
    enteringView.visible = true;
    enteringView.opacity = 1;
    enteringView.index = 2;
    leavingView.index = 1;
    leavingViewToX = null;
    leavingViewToY = null;
    leavingView.scale = 1;
    enteringView.scale = 1;
    if (from === "left") {
      enteringView.x = -YUMMY.variable("screenWidth");
      enteringView.y = 0;
      leavingViewToX = YUMMY.variable("screenWidth");
      leavingViewToY = 0;
    } else if (from === "right") {
      enteringView.x = YUMMY.variable("screenWidth");
      enteringView.y = 0;
      leavingViewToX = -YUMMY.variable("screenWidth");
      leavingViewToY = 0;
    } else if (from === "above") {
      enteringView.opacity = 0;
      enteringView.x = 0;
      enteringView.y = 0;
      enteringView.scale = 1.1;
      enteringView.animate({
        options: {
          delay: delay,
          time: time,
          curve: curve
        },
        opacity: 1,
        scale: 1
      });
    } else if (from === "below") {
      enteringView.opacity = 0;
      enteringView.x = 0;
      enteringView.y = 0;
      enteringView.index = 1;
      leavingView.index = 2;
      enteringView.animate({
        options: {
          delay: delay,
          time: time,
          curve: curve
        },
        opacity: 1
      });
      leavingView.animate({
        options: {
          delay: delay,
          time: time,
          curve: curve
        },
        opacity: 0,
        scale: 1.1
      });
    } else if (from === "alpha") {
      enteringView.opacity = 0;
      enteringView.x = 0;
      enteringView.y = 0;
      enteringView.index = 1;
      leavingView.index = 2;
      enteringView.animate({
        options: {
          delay: delay,
          time: time,
          curve: curve
        },
        opacity: 1
      });
      leavingView.animate({
        options: {
          delay: delay,
          time: time,
          curve: curve
        },
        opacity: 0
      });
    } else if (from === "overlay") {
      if (window.showOverlay) {
        enteringView.x = 0;
        enteringView.y = 0;
        leavingViewToX = 0;
        leavingViewToY = YUMMY.variable("screenHeight");
        leavingView.index = 3;
        enteringView.scale = 0.9;
        enteringViewToScale = 1;
        overlay = YUMMY.overlay(enteringView);
        YUMMY.fade(overlay, 0, 0, time * 0.5);
        window.showOverlay = false;
      } else {
        enteringView.x = 0;
        enteringView.y = YUMMY.variable("screenHeight");
        leavingViewToX = 0;
        leavingViewToY = 0;
        leavingViewToScale = 0.9;
        overlay = YUMMY.overlay(leavingView);
        overlay.opacity = 0;
        YUMMY.fade(overlay, 1, 0, time * 0.5);
        window.showOverlay = true;
      }
    }
    leavingView.animate({
      options: {
        delay: delay,
        time: time,
        curve: curve
      },
      x: leavingViewToX,
      y: leavingViewToY,
      scale: leavingViewToScale
    });
    enteringView.animate({
      options: {
        delay: delay,
        time: time,
        curve: curve
      },
      x: 0,
      y: 0,
      scale: enteringViewToScale
    });
    enteringView.onAnimationEnd(function() {
      var i, len, ref, view;
      enteringView.off(Events.AnimationEnd);
      leavingViewToScale = 1;
      leavingView.visible = false;
      ref = window.views;
      for (i = 0, len = ref.length; i < len; i++) {
        view = ref[i];
        view.index = 1;
      }
      if (from === "overlay") {
        return overlay.destroy();
      }
    });
    if (nextFunction) {
      return leavingView.onAnimationEnd(function() {
        leavingView.off(Events.AnimationEnd);
        return nextFunction();
      });
    }
  };

  YUMMY.fade = function(layer, toAlpha, delay, time) {
    if (layer.visible === false) {
      layer.visible = true;
      layer.opacity = 0;
    }
    if (layer.opacity !== toAlpha) {
      if (!layer.isAnimating) {
        if (toAlpha === 1) {
          layer.visible = true;
        }
        layer.animate({
          options: {
            time: time,
            curve: Bezier.linear,
            delay: delay
          },
          opacity: toAlpha
        });
        return layer.onAnimationEnd(function() {
          layer.off(Events.AnimationEnd);
          if (toAlpha === 0) {
            return layer.visible = false;
          }
        });
      }
    }
  };

  YUMMY.move = function(layer, toX, toY, delay, time, curve, animationEndFunction) {
    if (!layer.isAnimating) {
      layer.animate({
        options: {
          curve: curve,
          delay: delay,
          time: time
        },
        x: toX,
        y: toY
      });
      if (animationEndFunction) {
        return layer.onAnimationEnd(function() {
          layer.off(Events.AnimationEnd);
          return animationEndFunction();
        });
      }
    }
  };

  return YUMMY;

})();

module.exports = YUMMY;


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2phbndhZ25lci9Qcm9qZWt0ZS9fZGV2L2RldmVsb3BtZW50L3l1bW15RnJhbWVyL3l1bW15LmZyYW1lci9tb2R1bGVzL3l1bW15LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2phbndhZ25lci9Qcm9qZWt0ZS9fZGV2L2RldmVsb3BtZW50L3l1bW15RnJhbWVyL3l1bW15LmZyYW1lci9tb2R1bGVzL2ZpbmRNb2R1bGUuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBZVU1NWVxuXG5cdEB2YXJpYWJsZSA9ICh0eXBlKSAtPlxuXG5cdFx0IyB0eXBlIGFzIHN0cmluZ1xuXG5cdFx0c3dpdGNoXG5cdFx0XHR3aGVuIHR5cGUgPT0gXCJzY3JlZW5XaWR0aFwiIHRoZW4gb3V0cHV0ID0gRnJhbWVyLkRldmljZS5zY3JlZW4ud2lkdGgvMlxuXHRcdFx0d2hlbiB0eXBlID09IFwic2NyZWVuSGVpZ2h0XCIgdGhlbiBvdXRwdXQgPSBGcmFtZXIuRGV2aWNlLnNjcmVlbi5oZWlnaHQvMlxuXHRcdFx0d2hlbiB0eXBlID09IFwiY29sb3JFcnJvclwiIHRoZW4gb3V0cHV0ID0gJ3JnYmEoMjMxLCAwLCA2NSwgMSknXG5cdFx0XHR3aGVuIHR5cGUgPT0gXCJjb2xvclN1Y2Nlc1wiIHRoZW4gb3V0cHV0ID0gJ3JnYmEoMTQ0LCAxODcsIDAsIDEpJ1xuXHRcdFx0d2hlbiB0eXBlID09IFwiY29sb3JIaWdobGlnaHRcIiB0aGVuIG91dHB1dCA9ICdyZ2JhKDcxLCAxNDksIDIxMiwgMSknXG5cblx0XHRyZXR1cm4gb3V0cHV0XG5cblx0QHZpZXdzID0gKGFycmF5KSAtPlxuXG5cdFx0IyBhcnJheSBhcyBhcnJheSBvZiB2aWV3c1xuXG5cdFx0d2luZG93LnZpZXdzID0gYXJyYXlcblxuXHRcdGZvciB2aWV3IGluIHZpZXdzXG5cdFx0XHR2aWV3LmNsaXAgPSB0cnVlXG5cdFx0XHR2aWV3LmluZGV4ID0gMVxuXHRcdFx0dmlldy52aXNpYmxlID0gZmFsc2Vcblx0XHRcdHZpZXcueCA9IDBcblx0XHRcdHZpZXcueSA9IDBcblxuXHRAcHJlbG9hZEltYWdlcyA9IChhcnJheSkgLT5cblxuXHRcdCMgYXJyYXkgYXMgYXJyYXkgb2YgbGF5ZXJcblxuXHRcdEZyYW1lci5FeHRyYXMuUHJlbG9hZGVyLmVuYWJsZSgpXG5cblx0XHRwcmVsb2FkSW1hZ2VzID0gYXJyYXlcblxuXHRcdGZvciBsYXllciBpbiBwcmVsb2FkSW1hZ2VzXG5cdFx0XHRGcmFtZXIuRXh0cmFzLlByZWxvYWRlci5hZGRJbWFnZShsYXllci5pbWFnZSlcblxuXHRAYnV0dG9ucyA9IChhcnJheSkgLT5cblxuXHRcdCMgYXJyYXkgYXMgYXJyYXkgb2YgYnV0dG9uc1xuXG5cdFx0d2luZG93LmJ1dHRvbnMgPSBhcnJheVxuXG5cdFx0Zm9yIGJ1dHRvbiBpbiBidXR0b25zXG5cblx0XHRcdGNoaWxkcmVuID0gYnV0dG9uLmNoaWxkcmVuXG5cblx0XHRcdGlmIGNoaWxkcmVuLmxlbmd0aCA+IDBcblxuXHRcdFx0XHRidXR0b24ub25Ub3VjaFN0YXJ0IC0+XG5cdFx0XHRcdFx0dGhpc0NoaWxkcmVuID0gdGhpcy5jaGlsZHJlblxuXHRcdFx0XHRcdGZvciBjaGlsZCBpbiB0aGlzQ2hpbGRyZW5cblx0XHRcdFx0XHRcdGlmIGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJkZWZhdWx0XCIpXG5cdFx0XHRcdFx0XHRcdGNoaWxkLnZpc2libGUgPSBmYWxzZVxuXG5cdFx0XHRcdGJ1dHRvbi5vblRvdWNoRW5kIC0+XG5cdFx0XHRcdFx0dGhpc0NoaWxkcmVuID0gdGhpcy5jaGlsZHJlblxuXHRcdFx0XHRcdGZvciBjaGlsZCBpbiB0aGlzQ2hpbGRyZW5cblx0XHRcdFx0XHRcdGlmIGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJkZWZhdWx0XCIpXG5cdFx0XHRcdFx0XHRcdGNoaWxkLnZpc2libGUgPSB0cnVlXG5cblx0XHRcdGVsc2VcblxuXHRcdFx0XHRidXR0b24ub25Ub3VjaFN0YXJ0IC0+XG5cdFx0XHRcdFx0dGhpcy5vcGFjaXR5ID0gMC41XG5cdFx0XHRcdGJ1dHRvbi5vblRvdWNoRW5kIC0+XG5cdFx0XHRcdFx0dGhpcy5vcGFjaXR5ID0gMS4wXG5cblx0QG92ZXJsYXkgPSAocGFyZW50KSAtPlxuXG5cdFx0IyBwYXJlbnQgYXMgbGF5ZXJcblxuXHRcdG92ZXJsYXkgPSBuZXcgTGF5ZXJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsLjgpJ1xuXHRcdFx0aGVpZ2h0OiBZVU1NWS52YXJpYWJsZShcInNjcmVlbkhlaWdodFwiKVxuXHRcdFx0bmFtZTogJ292ZXJsYXknXG5cdFx0XHRwYXJlbnQ6IHBhcmVudFxuXHRcdFx0d2lkdGg6IFlVTU1ZLnZhcmlhYmxlKFwic2NyZWVuV2lkdGhcIilcblx0XHRcdHg6IDBcblx0XHRcdHk6IDBcblxuXHRAbmV4dFZpZXdGcm9tID0gKGZyb20sIGVudGVyaW5nVmlldywgZGVsYXksIHRpbWUsIGN1cnZlLCBuZXh0RnVuY3Rpb24pIC0+XG5cblx0XHQjIGZyb20gYXMgc3RyaW5nXG5cdFx0IyBlbnRlcmluZ1ZpZXcgYXMgbGF5ZXJcblx0XHQjIGRlbGF5IGFzIGludFxuXHRcdCMgdGltZSBhcyBpbnRcblx0XHQjIGN1cnZlIGFzIGN1cnZlXG5cdFx0IyBuZXh0RnVuY3Rpb24gYXMgZnVuY3Rpb25cblxuXHRcdGxlYXZpbmdWaWV3ID0gd2luZG93LnRoaXNWaWV3XG5cdFx0d2luZG93LnRoaXNWaWV3ID0gZW50ZXJpbmdWaWV3XG5cblx0XHRlbnRlcmluZ1ZpZXcudmlzaWJsZSA9IHRydWVcblx0XHRlbnRlcmluZ1ZpZXcub3BhY2l0eSA9IDFcblxuXHRcdGVudGVyaW5nVmlldy5pbmRleCA9IDJcblx0XHRsZWF2aW5nVmlldy5pbmRleCA9IDFcblxuXHRcdGxlYXZpbmdWaWV3VG9YID0gbnVsbFxuXHRcdGxlYXZpbmdWaWV3VG9ZID0gbnVsbFxuXG5cdFx0bGVhdmluZ1ZpZXcuc2NhbGUgPSAxXG5cdFx0ZW50ZXJpbmdWaWV3LnNjYWxlID0gMVxuXG5cdFx0IyB0cmFuc2l0aW9uXG5cdFx0aWYgZnJvbSA9PSBcImxlZnRcIlxuXG5cdFx0XHRlbnRlcmluZ1ZpZXcueCA9IC1ZVU1NWS52YXJpYWJsZShcInNjcmVlbldpZHRoXCIpXG5cdFx0XHRlbnRlcmluZ1ZpZXcueSA9IDBcblx0XHRcdGxlYXZpbmdWaWV3VG9YID0gWVVNTVkudmFyaWFibGUoXCJzY3JlZW5XaWR0aFwiKVxuXHRcdFx0bGVhdmluZ1ZpZXdUb1kgPSAwXG5cblx0XHRlbHNlIGlmIGZyb20gPT0gXCJyaWdodFwiXG5cblx0XHRcdGVudGVyaW5nVmlldy54ID0gWVVNTVkudmFyaWFibGUoXCJzY3JlZW5XaWR0aFwiKTtcblx0XHRcdGVudGVyaW5nVmlldy55ID0gMFxuXHRcdFx0bGVhdmluZ1ZpZXdUb1ggPSAtWVVNTVkudmFyaWFibGUoXCJzY3JlZW5XaWR0aFwiKVxuXHRcdFx0bGVhdmluZ1ZpZXdUb1kgPSAwXG5cblx0XHRlbHNlIGlmIGZyb20gPT0gXCJhYm92ZVwiXG5cblx0XHRcdGVudGVyaW5nVmlldy5vcGFjaXR5ID0gMFxuXHRcdFx0ZW50ZXJpbmdWaWV3LnggPSAwXG5cdFx0XHRlbnRlcmluZ1ZpZXcueSA9IDBcblx0XHRcdGVudGVyaW5nVmlldy5zY2FsZSA9IDEuMVxuXG5cdFx0XHRlbnRlcmluZ1ZpZXcuYW5pbWF0ZVxuXHRcdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRcdGRlbGF5OiBkZWxheVxuXHRcdFx0XHRcdHRpbWU6IHRpbWVcblx0XHRcdFx0XHRjdXJ2ZTogY3VydmVcblx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0XHRzY2FsZTogMVxuXG5cdFx0ZWxzZSBpZiBmcm9tID09IFwiYmVsb3dcIlxuXG5cdFx0XHRlbnRlcmluZ1ZpZXcub3BhY2l0eSA9IDBcblx0XHRcdGVudGVyaW5nVmlldy54ID0gMFxuXHRcdFx0ZW50ZXJpbmdWaWV3LnkgPSAwXG5cdFx0XHRlbnRlcmluZ1ZpZXcuaW5kZXggPSAxXG5cdFx0XHRsZWF2aW5nVmlldy5pbmRleCA9IDJcblxuXHRcdFx0ZW50ZXJpbmdWaWV3LmFuaW1hdGVcblx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHRkZWxheTogZGVsYXlcblx0XHRcdFx0XHR0aW1lOiB0aW1lXG5cdFx0XHRcdFx0Y3VydmU6IGN1cnZlXG5cdFx0XHRcdG9wYWNpdHk6IDFcblx0XHRcdGxlYXZpbmdWaWV3LmFuaW1hdGVcblx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHRkZWxheTogZGVsYXlcblx0XHRcdFx0XHR0aW1lOiB0aW1lXG5cdFx0XHRcdFx0Y3VydmU6IGN1cnZlXG5cdFx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdFx0c2NhbGU6IDEuMVxuXG5cdFx0ZWxzZSBpZiBmcm9tID09IFwiYWxwaGFcIlxuXG5cdFx0XHRlbnRlcmluZ1ZpZXcub3BhY2l0eSA9IDBcblx0XHRcdGVudGVyaW5nVmlldy54ID0gMFxuXHRcdFx0ZW50ZXJpbmdWaWV3LnkgPSAwXG5cdFx0XHRlbnRlcmluZ1ZpZXcuaW5kZXggPSAxXG5cdFx0XHRsZWF2aW5nVmlldy5pbmRleCA9IDJcblxuXHRcdFx0ZW50ZXJpbmdWaWV3LmFuaW1hdGVcblx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHRkZWxheTogZGVsYXlcblx0XHRcdFx0XHR0aW1lOiB0aW1lXG5cdFx0XHRcdFx0Y3VydmU6IGN1cnZlXG5cdFx0XHRcdG9wYWNpdHk6IDFcblx0XHRcdGxlYXZpbmdWaWV3LmFuaW1hdGVcblx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHRkZWxheTogZGVsYXlcblx0XHRcdFx0XHR0aW1lOiB0aW1lXG5cdFx0XHRcdFx0Y3VydmU6IGN1cnZlXG5cdFx0XHRcdG9wYWNpdHk6IDBcblxuXHRcdGVsc2UgaWYgZnJvbSA9PSBcIm92ZXJsYXlcIlxuXG5cdFx0XHRpZiB3aW5kb3cuc2hvd092ZXJsYXlcblxuXHRcdFx0XHQjIHZpZXdcblx0XHRcdFx0ZW50ZXJpbmdWaWV3LnggPSAwXG5cdFx0XHRcdGVudGVyaW5nVmlldy55ID0gMFxuXHRcdFx0XHRsZWF2aW5nVmlld1RvWCA9IDBcblx0XHRcdFx0bGVhdmluZ1ZpZXdUb1kgPSBZVU1NWS52YXJpYWJsZShcInNjcmVlbkhlaWdodFwiKVxuXHRcdFx0XHRsZWF2aW5nVmlldy5pbmRleCA9IDNcblx0XHRcdFx0ZW50ZXJpbmdWaWV3LnNjYWxlID0gMC45XG5cdFx0XHRcdGVudGVyaW5nVmlld1RvU2NhbGUgPSAxXG5cblx0XHRcdFx0IyBvdmVybGF5XG5cdFx0XHRcdG92ZXJsYXkgPSBZVU1NWS5vdmVybGF5KGVudGVyaW5nVmlldylcblx0XHRcdFx0WVVNTVkuZmFkZShvdmVybGF5LCAwLCAwLCB0aW1lKjAuNSlcblx0XHRcdFx0d2luZG93LnNob3dPdmVybGF5ID0gZmFsc2VcblxuXHRcdFx0ZWxzZVxuXG5cdFx0XHRcdCMgdmlld1xuXHRcdFx0XHRlbnRlcmluZ1ZpZXcueCA9IDBcblx0XHRcdFx0ZW50ZXJpbmdWaWV3LnkgPSBZVU1NWS52YXJpYWJsZShcInNjcmVlbkhlaWdodFwiKVxuXHRcdFx0XHRsZWF2aW5nVmlld1RvWCA9IDBcblx0XHRcdFx0bGVhdmluZ1ZpZXdUb1kgPSAwXG5cdFx0XHRcdGxlYXZpbmdWaWV3VG9TY2FsZSA9IDAuOVxuXG5cdFx0XHRcdCMgb3ZlcmxheVxuXHRcdFx0XHRvdmVybGF5ID0gWVVNTVkub3ZlcmxheShsZWF2aW5nVmlldylcblx0XHRcdFx0b3ZlcmxheS5vcGFjaXR5ID0gMFxuXHRcdFx0XHRZVU1NWS5mYWRlKG92ZXJsYXksIDEsIDAsIHRpbWUqMC41KVxuXHRcdFx0XHR3aW5kb3cuc2hvd092ZXJsYXkgPSB0cnVlXG5cblx0XHRsZWF2aW5nVmlldy5hbmltYXRlXG5cdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRkZWxheTogZGVsYXlcblx0XHRcdFx0dGltZTogdGltZVxuXHRcdFx0XHRjdXJ2ZTogY3VydmVcblx0XHRcdHg6IGxlYXZpbmdWaWV3VG9YXG5cdFx0XHR5OiBsZWF2aW5nVmlld1RvWVxuXHRcdFx0c2NhbGU6IGxlYXZpbmdWaWV3VG9TY2FsZVxuXG5cdFx0ZW50ZXJpbmdWaWV3LmFuaW1hdGVcblx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdGRlbGF5OiBkZWxheVxuXHRcdFx0XHR0aW1lOiB0aW1lXG5cdFx0XHRcdGN1cnZlOiBjdXJ2ZVxuXHRcdFx0eDogMFxuXHRcdFx0eTogMFxuXHRcdFx0c2NhbGU6IGVudGVyaW5nVmlld1RvU2NhbGVcblxuXHRcdCMgYWZ0ZXIgYW5pbWF0aW9uIGZ1bmN0aW9uXG5cdFx0ZW50ZXJpbmdWaWV3Lm9uQW5pbWF0aW9uRW5kIC0+XG5cblx0XHRcdGVudGVyaW5nVmlldy5vZmYoRXZlbnRzLkFuaW1hdGlvbkVuZClcblx0XHRcdGxlYXZpbmdWaWV3VG9TY2FsZSA9IDFcblx0XHRcdGxlYXZpbmdWaWV3LnZpc2libGUgPSBmYWxzZVxuXG5cdFx0XHRmb3IgdmlldyBpbiB3aW5kb3cudmlld3Ncblx0XHRcdFx0dmlldy5pbmRleCA9IDFcblxuXHRcdFx0aWYgZnJvbSA9PSBcIm92ZXJsYXlcIlxuXHRcdFx0XHRvdmVybGF5LmRlc3Ryb3koKVxuXG5cdFx0IyBuZXh0IGZ1bmN0aW9uXG5cdFx0aWYgbmV4dEZ1bmN0aW9uXG5cdFx0XHRsZWF2aW5nVmlldy5vbkFuaW1hdGlvbkVuZCAtPlxuXHRcdFx0XHRsZWF2aW5nVmlldy5vZmYoRXZlbnRzLkFuaW1hdGlvbkVuZClcblx0XHRcdFx0bmV4dEZ1bmN0aW9uKClcblxuXHRAZmFkZSA9IChsYXllciwgdG9BbHBoYSwgZGVsYXksIHRpbWUpIC0+XG5cblx0XHQjIGxheWVyIGFzIGxheWVyXG5cdFx0IyB0b0FscGhhIGFzIGludFxuXHRcdCMgZGVsYXkgYXMgaW50XG5cdFx0IyB0aW1lIGFzIGludFxuXG5cdFx0aWYgbGF5ZXIudmlzaWJsZSA9PSBmYWxzZVxuXHRcdFx0bGF5ZXIudmlzaWJsZSA9IHRydWVcblx0XHRcdGxheWVyLm9wYWNpdHkgPSAwXG5cblx0XHRpZiBsYXllci5vcGFjaXR5ICE9IHRvQWxwaGFcblx0XHRcdGlmIG5vdCBsYXllci5pc0FuaW1hdGluZ1xuXHRcdFx0XHRpZiB0b0FscGhhID09IDFcblx0XHRcdFx0XHRsYXllci52aXNpYmxlID0gdHJ1ZVxuXHRcdFx0XHRsYXllci5hbmltYXRlXG5cdFx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHRcdHRpbWU6IHRpbWVcblx0XHRcdFx0XHRcdGN1cnZlOiBCZXppZXIubGluZWFyXG5cdFx0XHRcdFx0XHRkZWxheTogZGVsYXlcblx0XHRcdFx0XHRvcGFjaXR5OiB0b0FscGhhXG5cdFx0XHRcdGxheWVyLm9uQW5pbWF0aW9uRW5kIC0+XG5cdFx0XHRcdFx0bGF5ZXIub2ZmKEV2ZW50cy5BbmltYXRpb25FbmQpXG5cdFx0XHRcdFx0aWYgdG9BbHBoYSA9PSAwXG5cdFx0XHRcdFx0XHRsYXllci52aXNpYmxlID0gZmFsc2VcblxuXHRAbW92ZSA9IChsYXllciwgdG9YLCB0b1ksIGRlbGF5LCB0aW1lLCBjdXJ2ZSwgYW5pbWF0aW9uRW5kRnVuY3Rpb24pIC0+XG5cblx0XHQjIGxheWVyIGFzIGxheWVyXG5cdFx0IyB0b1ggYXMgaW50XG5cdFx0IyB0b1kgYXMgaW50XG5cdFx0IyBkZWxheSBhcyBpbnRcblx0XHQjIHRpbWUgYXMgaW50XG5cdFx0IyBjdXJ2ZSBhcyBjdXJ2ZVxuXHRcdCMgYW5pbWF0aW9uRW5kRnVuY3Rpb24gYXMgZnVuY3Rpb25cblxuXHRcdGlmIG5vdCBsYXllci5pc0FuaW1hdGluZ1xuXHRcdFx0bGF5ZXIuYW5pbWF0ZVxuXHRcdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRcdGN1cnZlOiBjdXJ2ZVxuXHRcdFx0XHRcdGRlbGF5OiBkZWxheVxuXHRcdFx0XHRcdHRpbWU6IHRpbWVcblx0XHRcdFx0eDogdG9YXG5cdFx0XHRcdHk6IHRvWVxuXHRcdFx0aWYgYW5pbWF0aW9uRW5kRnVuY3Rpb25cblx0XHRcdFx0bGF5ZXIub25BbmltYXRpb25FbmQgLT5cblx0XHRcdFx0XHRsYXllci5vZmYoRXZlbnRzLkFuaW1hdGlvbkVuZClcblx0XHRcdFx0XHRhbmltYXRpb25FbmRGdW5jdGlvbigpXG5cbm1vZHVsZS5leHBvcnRzID0gWVVNTVkiLCJfZ2V0SGllcmFyY2h5ID0gKGxheWVyKSAtPlxuICBzdHJpbmcgPSAnJ1xuICBmb3IgYSBpbiBsYXllci5hbmNlc3RvcnMoKVxuICAgIHN0cmluZyA9IGEubmFtZSsnPicrc3RyaW5nXG4gIHJldHVybiBzdHJpbmcgPSBzdHJpbmcrbGF5ZXIubmFtZVxuXG5fbWF0Y2ggPSAoaGllcmFyY2h5LCBzdHJpbmcpIC0+XG4gICMgcHJlcGFyZSByZWdleCB0b2tlbnNcbiAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1xccyo+XFxzKi9nLCc+JykgIyBjbGVhbiB1cCBzcGFjZXMgYXJvdW5kIGFycm93c1xuICBzdHJpbmcgPSBzdHJpbmcuc3BsaXQoJyonKS5qb2luKCdbXj5dKicpICMgYXN0ZXJpa3MgYXMgbGF5ZXIgbmFtZSB3aWxkY2FyZFxuICBzdHJpbmcgPSBzdHJpbmcuc3BsaXQoJyAnKS5qb2luKCcoPzouKik+JykgIyBzcGFjZSBhcyBzdHJ1Y3R1cmUgd2lsZGNhcmRcbiAgc3RyaW5nID0gc3RyaW5nLnNwbGl0KCcsJykuam9pbignJHwnKSAjIGFsbG93IG11bHRpcGxlIHNlYXJjaGVzIHVzaW5nIGNvbW1hXG4gIHJlZ2V4U3RyaW5nID0gXCIoXnw+KVwiK3N0cmluZytcIiRcIiAjIGFsd2F5cyBib3R0b20gbGF5ZXIsIG1heWJlIHBhcnQgb2YgaGllcmFyY2h5XG5cbiAgcmVnRXhwID0gbmV3IFJlZ0V4cChyZWdleFN0cmluZykgXG4gIHJldHVybiBoaWVyYXJjaHkubWF0Y2gocmVnRXhwKVxuXG5fZmluZEFsbCA9IChzZWxlY3RvciwgZnJvbUxheWVyKSAtPlxuICBsYXllcnMgPSBGcmFtZXIuQ3VycmVudENvbnRleHQuX2xheWVyc1xuXG4gIGlmIHNlbGVjdG9yP1xuICAgIHN0cmluZ05lZWRzUmVnZXggPSBfLmZpbmQgWycqJywnICcsJz4nLCcsJ10sIChjKSAtPiBfLmluY2x1ZGVzIHNlbGVjdG9yLGNcbiAgICB1bmxlc3Mgc3RyaW5nTmVlZHNSZWdleCBvciBmcm9tTGF5ZXJcbiAgICAgIGxheWVycyA9IF8uZmlsdGVyIGxheWVycywgKGxheWVyKSAtPiBcbiAgICAgICAgaWYgbGF5ZXIubmFtZSBpcyBzZWxlY3RvciB0aGVuIHRydWVcbiAgICBlbHNlXG4gICAgICBsYXllcnMgPSBfLmZpbHRlciBsYXllcnMsIChsYXllcikgLT5cbiAgICAgICAgICBoaWVyYXJjaHkgPSBfZ2V0SGllcmFyY2h5KGxheWVyKVxuICAgICAgICAgIGlmIGZyb21MYXllcj9cbiAgICAgICAgICAgIF9tYXRjaChoaWVyYXJjaHksIGZyb21MYXllci5uYW1lKycgJytzZWxlY3RvcilcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBfbWF0Y2goaGllcmFyY2h5LCBzZWxlY3RvcilcbiAgZWxzZVxuICAgIGxheWVyc1xuXG5cbiMgR2xvYmFsXG5leHBvcnRzLkZpbmQgICAgPSAoc2VsZWN0b3IsIGZyb21MYXllcikgLT4gX2ZpbmRBbGwoc2VsZWN0b3IsIGZyb21MYXllcilbMF1cbmV4cG9ydHMuxpIgICAgICAgPSAoc2VsZWN0b3IsIGZyb21MYXllcikgLT4gX2ZpbmRBbGwoc2VsZWN0b3IsIGZyb21MYXllcilbMF1cblxuZXhwb3J0cy5GaW5kQWxsID0gKHNlbGVjdG9yLCBmcm9tTGF5ZXIpIC0+IF9maW5kQWxsKHNlbGVjdG9yLCBmcm9tTGF5ZXIpXG5leHBvcnRzLsaSxpIgICAgICA9IChzZWxlY3RvciwgZnJvbUxheWVyKSAtPiBfZmluZEFsbChzZWxlY3RvciwgZnJvbUxheWVyKVxuXG4jIE1ldGhvZHNcbkxheWVyOjpmaW5kICAgICA9IChzZWxlY3RvciwgZnJvbUxheWVyKSAtPiBfZmluZEFsbChzZWxlY3RvciwgQClbMF1cbkxheWVyOjrGkiAgICAgICAgPSAoc2VsZWN0b3IsIGZyb21MYXllcikgLT4gX2ZpbmRBbGwoc2VsZWN0b3IsIEApWzBdXG5cbkxheWVyOjpmaW5kQWxsICA9IChzZWxlY3RvciwgZnJvbUxheWVyKSAtPiBfZmluZEFsbChzZWxlY3RvciwgQClcbkxheWVyOjrGksaSICAgICAgID0gKHNlbGVjdG9yLCBmcm9tTGF5ZXIpIC0+IF9maW5kQWxsKHNlbGVjdG9yLCBAKSIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBRUFBO0FEQUEsSUFBQTs7QUFBQSxhQUFBLEdBQWdCLFNBQUMsS0FBRDtBQUNkLE1BQUE7RUFBQSxNQUFBLEdBQVM7QUFDVDtBQUFBLE9BQUEscUNBQUE7O0lBQ0UsTUFBQSxHQUFTLENBQUMsQ0FBQyxJQUFGLEdBQU8sR0FBUCxHQUFXO0FBRHRCO0FBRUEsU0FBTyxNQUFBLEdBQVMsTUFBQSxHQUFPLEtBQUssQ0FBQztBQUpmOztBQU1oQixNQUFBLEdBQVMsU0FBQyxTQUFELEVBQVksTUFBWjtBQUVQLE1BQUE7RUFBQSxNQUFBLEdBQVMsTUFBTSxDQUFDLE9BQVAsQ0FBZSxV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
