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

  YUMMY.preloadLayers = function(array) {
    var i, layer, len, preloadLayers, results;
    Framer.Extras.Preloader.enable();
    preloadLayers = array;
    results = [];
    for (i = 0, len = preloadLayers.length; i < len; i++) {
      layer = preloadLayers[i];
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

  YUMMY.nextViewFrom = function(from, enteringView, delay, time, ease, nextFunction) {
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
          curve: ease
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
          curve: ease
        },
        opacity: 1
      });
      leavingView.animate({
        options: {
          delay: delay,
          time: time,
          curve: ease
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
          curve: ease
        },
        opacity: 1
      });
      leavingView.animate({
        options: {
          delay: delay,
          time: time,
          curve: ease
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
        curve: ease
      },
      x: leavingViewToX,
      y: leavingViewToY,
      scale: leavingViewToScale
    });
    enteringView.animate({
      options: {
        delay: delay,
        time: time,
        curve: ease
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2phbndhZ25lci9Qcm9qZWt0ZS9fZGV2L2RldmVsb3BtZW50L3l1bW15RnJhbWVyL3l1bW15LmZyYW1lci9tb2R1bGVzL3l1bW15LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2phbndhZ25lci9Qcm9qZWt0ZS9fZGV2L2RldmVsb3BtZW50L3l1bW15RnJhbWVyL3l1bW15LmZyYW1lci9tb2R1bGVzL2ZpbmRNb2R1bGUuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBZVU1NWVxuXG5cdEB2YXJpYWJsZSA9ICh0eXBlKSAtPlxuXG5cdFx0IyB0eXBlIGFzIHN0cmluZ1xuXG5cdFx0c3dpdGNoXG5cdFx0XHR3aGVuIHR5cGUgPT0gXCJzY3JlZW5XaWR0aFwiIHRoZW4gb3V0cHV0ID0gRnJhbWVyLkRldmljZS5zY3JlZW4ud2lkdGgvMlxuXHRcdFx0d2hlbiB0eXBlID09IFwic2NyZWVuSGVpZ2h0XCIgdGhlbiBvdXRwdXQgPSBGcmFtZXIuRGV2aWNlLnNjcmVlbi5oZWlnaHQvMlxuXHRcdFx0d2hlbiB0eXBlID09IFwiY29sb3JFcnJvclwiIHRoZW4gb3V0cHV0ID0gJ3JnYmEoMjMxLCAwLCA2NSwgMSknXG5cdFx0XHR3aGVuIHR5cGUgPT0gXCJjb2xvclN1Y2Nlc1wiIHRoZW4gb3V0cHV0ID0gJ3JnYmEoMTQ0LCAxODcsIDAsIDEpJ1xuXHRcdFx0d2hlbiB0eXBlID09IFwiY29sb3JIaWdobGlnaHRcIiB0aGVuIG91dHB1dCA9ICdyZ2JhKDcxLCAxNDksIDIxMiwgMSknXG5cblx0XHRyZXR1cm4gb3V0cHV0XG5cblx0QHZpZXdzID0gKGFycmF5KSAtPlxuXG5cdFx0IyBhcnJheSBhcyBhcnJheSBvZiB2aWV3c1xuXG5cdFx0d2luZG93LnZpZXdzID0gYXJyYXlcblxuXHRcdGZvciB2aWV3IGluIHZpZXdzXG5cdFx0XHR2aWV3LmNsaXAgPSB0cnVlXG5cdFx0XHR2aWV3LmluZGV4ID0gMVxuXHRcdFx0dmlldy52aXNpYmxlID0gZmFsc2Vcblx0XHRcdHZpZXcueCA9IDBcblx0XHRcdHZpZXcueSA9IDBcblxuXHRAcHJlbG9hZExheWVycyA9IChhcnJheSkgLT5cblxuXHRcdCMgYXJyYXkgYXMgYXJyYXkgb2YgbGF5ZXJcblxuXHRcdEZyYW1lci5FeHRyYXMuUHJlbG9hZGVyLmVuYWJsZSgpXG5cblx0XHRwcmVsb2FkTGF5ZXJzID0gYXJyYXlcblxuXHRcdGZvciBsYXllciBpbiBwcmVsb2FkTGF5ZXJzXG5cdFx0XHRGcmFtZXIuRXh0cmFzLlByZWxvYWRlci5hZGRJbWFnZShsYXllci5pbWFnZSlcblxuXHRAYnV0dG9ucyA9IChhcnJheSkgLT5cblxuXHRcdCMgYXJyYXkgYXMgYXJyYXkgb2YgYnV0dG9uc1xuXG5cdFx0d2luZG93LmJ1dHRvbnMgPSBhcnJheVxuXG5cdFx0Zm9yIGJ1dHRvbiBpbiBidXR0b25zXG5cblx0XHRcdGNoaWxkcmVuID0gYnV0dG9uLmNoaWxkcmVuXG5cblx0XHRcdGlmIGNoaWxkcmVuLmxlbmd0aCA+IDBcblxuXHRcdFx0XHRidXR0b24ub25Ub3VjaFN0YXJ0IC0+XG5cdFx0XHRcdFx0dGhpc0NoaWxkcmVuID0gdGhpcy5jaGlsZHJlblxuXHRcdFx0XHRcdGZvciBjaGlsZCBpbiB0aGlzQ2hpbGRyZW5cblx0XHRcdFx0XHRcdGlmIGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJkZWZhdWx0XCIpXG5cdFx0XHRcdFx0XHRcdGNoaWxkLnZpc2libGUgPSBmYWxzZVxuXG5cdFx0XHRcdGJ1dHRvbi5vblRvdWNoRW5kIC0+XG5cdFx0XHRcdFx0dGhpc0NoaWxkcmVuID0gdGhpcy5jaGlsZHJlblxuXHRcdFx0XHRcdGZvciBjaGlsZCBpbiB0aGlzQ2hpbGRyZW5cblx0XHRcdFx0XHRcdGlmIGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJkZWZhdWx0XCIpXG5cdFx0XHRcdFx0XHRcdGNoaWxkLnZpc2libGUgPSB0cnVlXG5cblx0XHRcdGVsc2VcblxuXHRcdFx0XHRidXR0b24ub25Ub3VjaFN0YXJ0IC0+XG5cdFx0XHRcdFx0dGhpcy5vcGFjaXR5ID0gMC41XG5cdFx0XHRcdGJ1dHRvbi5vblRvdWNoRW5kIC0+XG5cdFx0XHRcdFx0dGhpcy5vcGFjaXR5ID0gMS4wXG5cblx0QG92ZXJsYXkgPSAocGFyZW50KSAtPlxuXG5cdFx0IyBwYXJlbnQgYXMgbGF5ZXJcblxuXHRcdG92ZXJsYXkgPSBuZXcgTGF5ZXJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsLjgpJ1xuXHRcdFx0aGVpZ2h0OiBZVU1NWS52YXJpYWJsZShcInNjcmVlbkhlaWdodFwiKVxuXHRcdFx0bmFtZTogJ292ZXJsYXknXG5cdFx0XHRwYXJlbnQ6IHBhcmVudFxuXHRcdFx0d2lkdGg6IFlVTU1ZLnZhcmlhYmxlKFwic2NyZWVuV2lkdGhcIilcblx0XHRcdHg6IDBcblx0XHRcdHk6IDBcblxuXHRAbmV4dFZpZXdGcm9tID0gKGZyb20sIGVudGVyaW5nVmlldywgZGVsYXksIHRpbWUsIGVhc2UsIG5leHRGdW5jdGlvbikgLT5cblxuXHRcdCMgZnJvbSBhcyBzdHJpbmdcblx0XHQjIGVudGVyaW5nVmlldyBhcyBsYXllclxuXHRcdCMgZGVsYXkgYXMgaW50XG5cdFx0IyB0aW1lIGFzIGludFxuXHRcdCMgZWFzZSBhcyBlYXNlXG5cdFx0IyBuZXh0RnVuY3Rpb24gYXMgZnVuY3Rpb25cblxuXHRcdGxlYXZpbmdWaWV3ID0gd2luZG93LnRoaXNWaWV3XG5cdFx0d2luZG93LnRoaXNWaWV3ID0gZW50ZXJpbmdWaWV3XG5cblx0XHRlbnRlcmluZ1ZpZXcudmlzaWJsZSA9IHRydWVcblx0XHRlbnRlcmluZ1ZpZXcub3BhY2l0eSA9IDFcblxuXHRcdGVudGVyaW5nVmlldy5pbmRleCA9IDJcblx0XHRsZWF2aW5nVmlldy5pbmRleCA9IDFcblxuXHRcdGxlYXZpbmdWaWV3VG9YID0gbnVsbFxuXHRcdGxlYXZpbmdWaWV3VG9ZID0gbnVsbFxuXG5cdFx0bGVhdmluZ1ZpZXcuc2NhbGUgPSAxXG5cdFx0ZW50ZXJpbmdWaWV3LnNjYWxlID0gMVxuXG5cdFx0IyB0cmFuc2l0aW9uXG5cdFx0aWYgZnJvbSA9PSBcImxlZnRcIlxuXG5cdFx0XHRlbnRlcmluZ1ZpZXcueCA9IC1ZVU1NWS52YXJpYWJsZShcInNjcmVlbldpZHRoXCIpXG5cdFx0XHRlbnRlcmluZ1ZpZXcueSA9IDBcblx0XHRcdGxlYXZpbmdWaWV3VG9YID0gWVVNTVkudmFyaWFibGUoXCJzY3JlZW5XaWR0aFwiKVxuXHRcdFx0bGVhdmluZ1ZpZXdUb1kgPSAwXG5cblx0XHRlbHNlIGlmIGZyb20gPT0gXCJyaWdodFwiXG5cblx0XHRcdGVudGVyaW5nVmlldy54ID0gWVVNTVkudmFyaWFibGUoXCJzY3JlZW5XaWR0aFwiKTtcblx0XHRcdGVudGVyaW5nVmlldy55ID0gMFxuXHRcdFx0bGVhdmluZ1ZpZXdUb1ggPSAtWVVNTVkudmFyaWFibGUoXCJzY3JlZW5XaWR0aFwiKVxuXHRcdFx0bGVhdmluZ1ZpZXdUb1kgPSAwXG5cblx0XHRlbHNlIGlmIGZyb20gPT0gXCJhYm92ZVwiXG5cblx0XHRcdGVudGVyaW5nVmlldy5vcGFjaXR5ID0gMFxuXHRcdFx0ZW50ZXJpbmdWaWV3LnggPSAwXG5cdFx0XHRlbnRlcmluZ1ZpZXcueSA9IDBcblx0XHRcdGVudGVyaW5nVmlldy5zY2FsZSA9IDEuMVxuXG5cdFx0XHRlbnRlcmluZ1ZpZXcuYW5pbWF0ZVxuXHRcdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRcdGRlbGF5OiBkZWxheVxuXHRcdFx0XHRcdHRpbWU6IHRpbWVcblx0XHRcdFx0XHRjdXJ2ZTogZWFzZVxuXHRcdFx0XHRvcGFjaXR5OiAxXG5cdFx0XHRcdHNjYWxlOiAxXG5cblx0XHRlbHNlIGlmIGZyb20gPT0gXCJiZWxvd1wiXG5cblx0XHRcdGVudGVyaW5nVmlldy5vcGFjaXR5ID0gMFxuXHRcdFx0ZW50ZXJpbmdWaWV3LnggPSAwXG5cdFx0XHRlbnRlcmluZ1ZpZXcueSA9IDBcblx0XHRcdGVudGVyaW5nVmlldy5pbmRleCA9IDFcblx0XHRcdGxlYXZpbmdWaWV3LmluZGV4ID0gMlxuXG5cdFx0XHRlbnRlcmluZ1ZpZXcuYW5pbWF0ZVxuXHRcdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRcdGRlbGF5OiBkZWxheVxuXHRcdFx0XHRcdHRpbWU6IHRpbWVcblx0XHRcdFx0XHRjdXJ2ZTogZWFzZVxuXHRcdFx0XHRvcGFjaXR5OiAxXG5cdFx0XHRsZWF2aW5nVmlldy5hbmltYXRlXG5cdFx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdFx0ZGVsYXk6IGRlbGF5XG5cdFx0XHRcdFx0dGltZTogdGltZVxuXHRcdFx0XHRcdGN1cnZlOiBlYXNlXG5cdFx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdFx0c2NhbGU6IDEuMVxuXG5cdFx0ZWxzZSBpZiBmcm9tID09IFwiYWxwaGFcIlxuXG5cdFx0XHRlbnRlcmluZ1ZpZXcub3BhY2l0eSA9IDBcblx0XHRcdGVudGVyaW5nVmlldy54ID0gMFxuXHRcdFx0ZW50ZXJpbmdWaWV3LnkgPSAwXG5cdFx0XHRlbnRlcmluZ1ZpZXcuaW5kZXggPSAxXG5cdFx0XHRsZWF2aW5nVmlldy5pbmRleCA9IDJcblxuXHRcdFx0ZW50ZXJpbmdWaWV3LmFuaW1hdGVcblx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHRkZWxheTogZGVsYXlcblx0XHRcdFx0XHR0aW1lOiB0aW1lXG5cdFx0XHRcdFx0Y3VydmU6IGVhc2Vcblx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0bGVhdmluZ1ZpZXcuYW5pbWF0ZVxuXHRcdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRcdGRlbGF5OiBkZWxheVxuXHRcdFx0XHRcdHRpbWU6IHRpbWVcblx0XHRcdFx0XHRjdXJ2ZTogZWFzZVxuXHRcdFx0XHRvcGFjaXR5OiAwXG5cblx0XHRlbHNlIGlmIGZyb20gPT0gXCJvdmVybGF5XCJcblxuXHRcdFx0aWYgd2luZG93LnNob3dPdmVybGF5XG5cblx0XHRcdFx0IyB2aWV3XG5cdFx0XHRcdGVudGVyaW5nVmlldy54ID0gMFxuXHRcdFx0XHRlbnRlcmluZ1ZpZXcueSA9IDBcblx0XHRcdFx0bGVhdmluZ1ZpZXdUb1ggPSAwXG5cdFx0XHRcdGxlYXZpbmdWaWV3VG9ZID0gWVVNTVkudmFyaWFibGUoXCJzY3JlZW5IZWlnaHRcIilcblx0XHRcdFx0bGVhdmluZ1ZpZXcuaW5kZXggPSAzXG5cdFx0XHRcdGVudGVyaW5nVmlldy5zY2FsZSA9IDAuOVxuXHRcdFx0XHRlbnRlcmluZ1ZpZXdUb1NjYWxlID0gMVxuXG5cdFx0XHRcdCMgb3ZlcmxheVxuXHRcdFx0XHRvdmVybGF5ID0gWVVNTVkub3ZlcmxheShlbnRlcmluZ1ZpZXcpXG5cdFx0XHRcdFlVTU1ZLmZhZGUob3ZlcmxheSwgMCwgMCwgdGltZSowLjUpXG5cdFx0XHRcdHdpbmRvdy5zaG93T3ZlcmxheSA9IGZhbHNlXG5cblx0XHRcdGVsc2VcblxuXHRcdFx0XHQjIHZpZXdcblx0XHRcdFx0ZW50ZXJpbmdWaWV3LnggPSAwXG5cdFx0XHRcdGVudGVyaW5nVmlldy55ID0gWVVNTVkudmFyaWFibGUoXCJzY3JlZW5IZWlnaHRcIilcblx0XHRcdFx0bGVhdmluZ1ZpZXdUb1ggPSAwXG5cdFx0XHRcdGxlYXZpbmdWaWV3VG9ZID0gMFxuXHRcdFx0XHRsZWF2aW5nVmlld1RvU2NhbGUgPSAwLjlcblxuXHRcdFx0XHQjIG92ZXJsYXlcblx0XHRcdFx0b3ZlcmxheSA9IFlVTU1ZLm92ZXJsYXkobGVhdmluZ1ZpZXcpXG5cdFx0XHRcdG92ZXJsYXkub3BhY2l0eSA9IDBcblx0XHRcdFx0WVVNTVkuZmFkZShvdmVybGF5LCAxLCAwLCB0aW1lKjAuNSlcblx0XHRcdFx0d2luZG93LnNob3dPdmVybGF5ID0gdHJ1ZVxuXG5cdFx0bGVhdmluZ1ZpZXcuYW5pbWF0ZVxuXHRcdFx0b3B0aW9uczpcblx0XHRcdFx0ZGVsYXk6IGRlbGF5XG5cdFx0XHRcdHRpbWU6IHRpbWVcblx0XHRcdFx0Y3VydmU6IGVhc2Vcblx0XHRcdHg6IGxlYXZpbmdWaWV3VG9YXG5cdFx0XHR5OiBsZWF2aW5nVmlld1RvWVxuXHRcdFx0c2NhbGU6IGxlYXZpbmdWaWV3VG9TY2FsZVxuXG5cdFx0ZW50ZXJpbmdWaWV3LmFuaW1hdGVcblx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdGRlbGF5OiBkZWxheVxuXHRcdFx0XHR0aW1lOiB0aW1lXG5cdFx0XHRcdGN1cnZlOiBlYXNlXG5cdFx0XHR4OiAwXG5cdFx0XHR5OiAwXG5cdFx0XHRzY2FsZTogZW50ZXJpbmdWaWV3VG9TY2FsZVxuXG5cdFx0IyBhZnRlciBhbmltYXRpb24gZnVuY3Rpb25cblx0XHRlbnRlcmluZ1ZpZXcub25BbmltYXRpb25FbmQgLT5cblxuXHRcdFx0ZW50ZXJpbmdWaWV3Lm9mZihFdmVudHMuQW5pbWF0aW9uRW5kKVxuXHRcdFx0bGVhdmluZ1ZpZXdUb1NjYWxlID0gMVxuXHRcdFx0bGVhdmluZ1ZpZXcudmlzaWJsZSA9IGZhbHNlXG5cblx0XHRcdGZvciB2aWV3IGluIHdpbmRvdy52aWV3c1xuXHRcdFx0XHR2aWV3LmluZGV4ID0gMVxuXG5cdFx0XHRpZiBmcm9tID09IFwib3ZlcmxheVwiXG5cdFx0XHRcdG92ZXJsYXkuZGVzdHJveSgpXG5cblx0XHQjIG5leHQgZnVuY3Rpb25cblx0XHRpZiBuZXh0RnVuY3Rpb25cblx0XHRcdGxlYXZpbmdWaWV3Lm9uQW5pbWF0aW9uRW5kIC0+XG5cdFx0XHRcdGxlYXZpbmdWaWV3Lm9mZihFdmVudHMuQW5pbWF0aW9uRW5kKVxuXHRcdFx0XHRuZXh0RnVuY3Rpb24oKVxuXG5cdEBmYWRlID0gKGxheWVyLCB0b0FscGhhLCBkZWxheSwgdGltZSkgLT5cblxuXHRcdCMgbGF5ZXIgYXMgbGF5ZXJcblx0XHQjIHRvQWxwaGEgYXMgaW50XG5cdFx0IyBkZWxheSBhcyBpbnRcblx0XHQjIHRpbWUgYXMgaW50XG5cblx0XHRpZiBsYXllci52aXNpYmxlID09IGZhbHNlXG5cdFx0XHRsYXllci52aXNpYmxlID0gdHJ1ZVxuXHRcdFx0bGF5ZXIub3BhY2l0eSA9IDBcblxuXHRcdGlmIGxheWVyLm9wYWNpdHkgIT0gdG9BbHBoYVxuXHRcdFx0aWYgbm90IGxheWVyLmlzQW5pbWF0aW5nXG5cdFx0XHRcdGlmIHRvQWxwaGEgPT0gMVxuXHRcdFx0XHRcdGxheWVyLnZpc2libGUgPSB0cnVlXG5cdFx0XHRcdGxheWVyLmFuaW1hdGVcblx0XHRcdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRcdFx0dGltZTogdGltZVxuXHRcdFx0XHRcdFx0Y3VydmU6IEJlemllci5saW5lYXJcblx0XHRcdFx0XHRcdGRlbGF5OiBkZWxheVxuXHRcdFx0XHRcdG9wYWNpdHk6IHRvQWxwaGFcblx0XHRcdFx0bGF5ZXIub25BbmltYXRpb25FbmQgLT5cblx0XHRcdFx0XHRsYXllci5vZmYoRXZlbnRzLkFuaW1hdGlvbkVuZClcblx0XHRcdFx0XHRpZiB0b0FscGhhID09IDBcblx0XHRcdFx0XHRcdGxheWVyLnZpc2libGUgPSBmYWxzZVxuXG5cdEBtb3ZlID0gKGxheWVyLCB0b1gsIHRvWSwgZGVsYXksIHRpbWUsIGN1cnZlLCBhbmltYXRpb25FbmRGdW5jdGlvbikgLT5cblxuXHRcdCMgbGF5ZXIgYXMgbGF5ZXJcblx0XHQjIHRvWCBhcyBpbnRcblx0XHQjIHRvWSBhcyBpbnRcblx0XHQjIGRlbGF5IGFzIGludFxuXHRcdCMgdGltZSBhcyBpbnRcblx0XHQjIGN1cnZlIGFzIGN1cnZlXG5cdFx0IyBhbmltYXRpb25FbmRGdW5jdGlvbiBhcyBmdW5jdGlvblxuXG5cdFx0aWYgbm90IGxheWVyLmlzQW5pbWF0aW5nXG5cdFx0XHRsYXllci5hbmltYXRlXG5cdFx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdFx0Y3VydmU6IGN1cnZlXG5cdFx0XHRcdFx0ZGVsYXk6IGRlbGF5XG5cdFx0XHRcdFx0dGltZTogdGltZVxuXHRcdFx0XHR4OiB0b1hcblx0XHRcdFx0eTogdG9ZXG5cdFx0XHRpZiBhbmltYXRpb25FbmRGdW5jdGlvblxuXHRcdFx0XHRsYXllci5vbkFuaW1hdGlvbkVuZCAtPlxuXHRcdFx0XHRcdGxheWVyLm9mZihFdmVudHMuQW5pbWF0aW9uRW5kKVxuXHRcdFx0XHRcdGFuaW1hdGlvbkVuZEZ1bmN0aW9uKClcblxubW9kdWxlLmV4cG9ydHMgPSBZVU1NWSIsIl9nZXRIaWVyYXJjaHkgPSAobGF5ZXIpIC0+XG4gIHN0cmluZyA9ICcnXG4gIGZvciBhIGluIGxheWVyLmFuY2VzdG9ycygpXG4gICAgc3RyaW5nID0gYS5uYW1lKyc+JytzdHJpbmdcbiAgcmV0dXJuIHN0cmluZyA9IHN0cmluZytsYXllci5uYW1lXG5cbl9tYXRjaCA9IChoaWVyYXJjaHksIHN0cmluZykgLT5cbiAgIyBwcmVwYXJlIHJlZ2V4IHRva2Vuc1xuICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFxzKj5cXHMqL2csJz4nKSAjIGNsZWFuIHVwIHNwYWNlcyBhcm91bmQgYXJyb3dzXG4gIHN0cmluZyA9IHN0cmluZy5zcGxpdCgnKicpLmpvaW4oJ1tePl0qJykgIyBhc3RlcmlrcyBhcyBsYXllciBuYW1lIHdpbGRjYXJkXG4gIHN0cmluZyA9IHN0cmluZy5zcGxpdCgnICcpLmpvaW4oJyg/Oi4qKT4nKSAjIHNwYWNlIGFzIHN0cnVjdHVyZSB3aWxkY2FyZFxuICBzdHJpbmcgPSBzdHJpbmcuc3BsaXQoJywnKS5qb2luKCckfCcpICMgYWxsb3cgbXVsdGlwbGUgc2VhcmNoZXMgdXNpbmcgY29tbWFcbiAgcmVnZXhTdHJpbmcgPSBcIihefD4pXCIrc3RyaW5nK1wiJFwiICMgYWx3YXlzIGJvdHRvbSBsYXllciwgbWF5YmUgcGFydCBvZiBoaWVyYXJjaHlcblxuICByZWdFeHAgPSBuZXcgUmVnRXhwKHJlZ2V4U3RyaW5nKSBcbiAgcmV0dXJuIGhpZXJhcmNoeS5tYXRjaChyZWdFeHApXG5cbl9maW5kQWxsID0gKHNlbGVjdG9yLCBmcm9tTGF5ZXIpIC0+XG4gIGxheWVycyA9IEZyYW1lci5DdXJyZW50Q29udGV4dC5fbGF5ZXJzXG5cbiAgaWYgc2VsZWN0b3I/XG4gICAgc3RyaW5nTmVlZHNSZWdleCA9IF8uZmluZCBbJyonLCcgJywnPicsJywnXSwgKGMpIC0+IF8uaW5jbHVkZXMgc2VsZWN0b3IsY1xuICAgIHVubGVzcyBzdHJpbmdOZWVkc1JlZ2V4IG9yIGZyb21MYXllclxuICAgICAgbGF5ZXJzID0gXy5maWx0ZXIgbGF5ZXJzLCAobGF5ZXIpIC0+IFxuICAgICAgICBpZiBsYXllci5uYW1lIGlzIHNlbGVjdG9yIHRoZW4gdHJ1ZVxuICAgIGVsc2VcbiAgICAgIGxheWVycyA9IF8uZmlsdGVyIGxheWVycywgKGxheWVyKSAtPlxuICAgICAgICAgIGhpZXJhcmNoeSA9IF9nZXRIaWVyYXJjaHkobGF5ZXIpXG4gICAgICAgICAgaWYgZnJvbUxheWVyP1xuICAgICAgICAgICAgX21hdGNoKGhpZXJhcmNoeSwgZnJvbUxheWVyLm5hbWUrJyAnK3NlbGVjdG9yKVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIF9tYXRjaChoaWVyYXJjaHksIHNlbGVjdG9yKVxuICBlbHNlXG4gICAgbGF5ZXJzXG5cblxuIyBHbG9iYWxcbmV4cG9ydHMuRmluZCAgICA9IChzZWxlY3RvciwgZnJvbUxheWVyKSAtPiBfZmluZEFsbChzZWxlY3RvciwgZnJvbUxheWVyKVswXVxuZXhwb3J0cy7GkiAgICAgICA9IChzZWxlY3RvciwgZnJvbUxheWVyKSAtPiBfZmluZEFsbChzZWxlY3RvciwgZnJvbUxheWVyKVswXVxuXG5leHBvcnRzLkZpbmRBbGwgPSAoc2VsZWN0b3IsIGZyb21MYXllcikgLT4gX2ZpbmRBbGwoc2VsZWN0b3IsIGZyb21MYXllcilcbmV4cG9ydHMuxpLGkiAgICAgID0gKHNlbGVjdG9yLCBmcm9tTGF5ZXIpIC0+IF9maW5kQWxsKHNlbGVjdG9yLCBmcm9tTGF5ZXIpXG5cbiMgTWV0aG9kc1xuTGF5ZXI6OmZpbmQgICAgID0gKHNlbGVjdG9yLCBmcm9tTGF5ZXIpIC0+IF9maW5kQWxsKHNlbGVjdG9yLCBAKVswXVxuTGF5ZXI6OsaSICAgICAgICA9IChzZWxlY3RvciwgZnJvbUxheWVyKSAtPiBfZmluZEFsbChzZWxlY3RvciwgQClbMF1cblxuTGF5ZXI6OmZpbmRBbGwgID0gKHNlbGVjdG9yLCBmcm9tTGF5ZXIpIC0+IF9maW5kQWxsKHNlbGVjdG9yLCBAKVxuTGF5ZXI6OsaSxpIgICAgICAgPSAoc2VsZWN0b3IsIGZyb21MYXllcikgLT4gX2ZpbmRBbGwoc2VsZWN0b3IsIEApIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFFQUE7QURBQSxJQUFBOztBQUFBLGFBQUEsR0FBZ0IsU0FBQyxLQUFEO0FBQ2QsTUFBQTtFQUFBLE1BQUEsR0FBUztBQUNUO0FBQUEsT0FBQSxxQ0FBQTs7SUFDRSxNQUFBLEdBQVMsQ0FBQyxDQUFDLElBQUYsR0FBTyxHQUFQLEdBQVc7QUFEdEI7QUFFQSxTQUFPLE1BQUEsR0FBUyxNQUFBLEdBQU8sS0FBSyxDQUFDO0FBSmY7O0FBTWhCLE1BQUEsR0FBUyxTQUFDLFNBQUQsRUFBWSxNQUFaO0FBRVAsTUFBQTtFQUFBLE1BQUEsR0FBUyxNQUFNLENBQUMsT0FBUCxDQUFlLFVBQWYsRUFBMEIs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
