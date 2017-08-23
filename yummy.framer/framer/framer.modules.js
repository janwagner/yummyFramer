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
    var enteringViewScale, enteringViewToScale, leavingView, leavingViewScale, leavingViewToScale, leavingViewToX, leavingViewToY, overlay;
    leavingView = window.thisView;
    window.thisView = enteringView;
    enteringView.visible = true;
    enteringView.opacity = 1;
    enteringView.index = 2;
    leavingView.index = 1;
    leavingViewToX = null;
    leavingViewToY = null;
    leavingViewScale = 1;
    enteringViewScale = 1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2phbndhZ25lci9Qcm9qZWt0ZS9fZGV2L2RldmVsb3BtZW50L3l1bW15RnVuY3Rpb25zL3l1bW15LmZyYW1lci9tb2R1bGVzL3l1bW15LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2phbndhZ25lci9Qcm9qZWt0ZS9fZGV2L2RldmVsb3BtZW50L3l1bW15RnVuY3Rpb25zL3l1bW15LmZyYW1lci9tb2R1bGVzL2ZpbmRNb2R1bGUuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBZVU1NWVxuXG5cdEB2YXJpYWJsZSA9ICh0eXBlKSAtPlxuXG5cdFx0IyB0eXBlIGFzIHN0cmluZ1xuXG5cdFx0c3dpdGNoXG5cdFx0XHR3aGVuIHR5cGUgPT0gXCJzY3JlZW5XaWR0aFwiIHRoZW4gb3V0cHV0ID0gRnJhbWVyLkRldmljZS5zY3JlZW4ud2lkdGgvMlxuXHRcdFx0d2hlbiB0eXBlID09IFwic2NyZWVuSGVpZ2h0XCIgdGhlbiBvdXRwdXQgPSBGcmFtZXIuRGV2aWNlLnNjcmVlbi5oZWlnaHQvMlxuXHRcdFx0d2hlbiB0eXBlID09IFwiY29sb3JFcnJvclwiIHRoZW4gb3V0cHV0ID0gJ3JnYmEoMjMxLCAwLCA2NSwgMSknXG5cdFx0XHR3aGVuIHR5cGUgPT0gXCJjb2xvclN1Y2Nlc1wiIHRoZW4gb3V0cHV0ID0gJ3JnYmEoMTQ0LCAxODcsIDAsIDEpJ1xuXHRcdFx0d2hlbiB0eXBlID09IFwiY29sb3JIaWdobGlnaHRcIiB0aGVuIG91dHB1dCA9ICdyZ2JhKDcxLCAxNDksIDIxMiwgMSknXG5cblx0XHRyZXR1cm4gb3V0cHV0XG5cblx0QHZpZXdzID0gKGFycmF5KSAtPlxuXG5cdFx0IyBhcnJheSBhcyBhcnJheSBvZiB2aWV3c1xuXG5cdFx0d2luZG93LnZpZXdzID0gYXJyYXlcblxuXHRcdGZvciB2aWV3IGluIHZpZXdzXG5cdFx0XHR2aWV3LmNsaXAgPSB0cnVlXG5cdFx0XHR2aWV3LmluZGV4ID0gMVxuXHRcdFx0dmlldy52aXNpYmxlID0gZmFsc2Vcblx0XHRcdHZpZXcueCA9IDBcblx0XHRcdHZpZXcueSA9IDBcblxuXHRAYnV0dG9ucyA9IChhcnJheSkgLT5cblxuXHRcdCMgYXJyYXkgYXMgYXJyYXkgb2YgYnV0dG9uc1xuXG5cdFx0d2luZG93LmJ1dHRvbnMgPSBhcnJheVxuXG5cdFx0Zm9yIGJ1dHRvbiBpbiBidXR0b25zXG5cblx0XHRcdGNoaWxkcmVuID0gYnV0dG9uLmNoaWxkcmVuXG5cblx0XHRcdGlmIGNoaWxkcmVuLmxlbmd0aCA+IDBcblxuXHRcdFx0XHRidXR0b24ub25Ub3VjaFN0YXJ0IC0+XG5cdFx0XHRcdFx0dGhpc0NoaWxkcmVuID0gdGhpcy5jaGlsZHJlblxuXHRcdFx0XHRcdGZvciBjaGlsZCBpbiB0aGlzQ2hpbGRyZW5cblx0XHRcdFx0XHRcdGlmIGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJkZWZhdWx0XCIpXG5cdFx0XHRcdFx0XHRcdGNoaWxkLnZpc2libGUgPSBmYWxzZVxuXG5cdFx0XHRcdGJ1dHRvbi5vblRvdWNoRW5kIC0+XG5cdFx0XHRcdFx0dGhpc0NoaWxkcmVuID0gdGhpcy5jaGlsZHJlblxuXHRcdFx0XHRcdGZvciBjaGlsZCBpbiB0aGlzQ2hpbGRyZW5cblx0XHRcdFx0XHRcdGlmIGNoaWxkLm5hbWUuaW5jbHVkZXMoXCJkZWZhdWx0XCIpXG5cdFx0XHRcdFx0XHRcdGNoaWxkLnZpc2libGUgPSB0cnVlXG5cblx0XHRcdGVsc2VcblxuXHRcdFx0XHRidXR0b24ub25Ub3VjaFN0YXJ0IC0+XG5cdFx0XHRcdFx0dGhpcy5vcGFjaXR5ID0gMC41XG5cdFx0XHRcdGJ1dHRvbi5vblRvdWNoRW5kIC0+XG5cdFx0XHRcdFx0dGhpcy5vcGFjaXR5ID0gMS4wXG5cblx0QG92ZXJsYXkgPSAocGFyZW50KSAtPlxuXG5cdFx0IyBwYXJlbnQgYXMgbGF5ZXJcblxuXHRcdG92ZXJsYXkgPSBuZXcgTGF5ZXJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsLjgpJ1xuXHRcdFx0aGVpZ2h0OiBZVU1NWS52YXJpYWJsZShcInNjcmVlbkhlaWdodFwiKVxuXHRcdFx0bmFtZTogJ292ZXJsYXknXG5cdFx0XHRwYXJlbnQ6IHBhcmVudFxuXHRcdFx0d2lkdGg6IFlVTU1ZLnZhcmlhYmxlKFwic2NyZWVuV2lkdGhcIilcblx0XHRcdHg6IDBcblx0XHRcdHk6IDBcblxuXHRAbmV4dFZpZXdGcm9tID0gKGZyb20sIGVudGVyaW5nVmlldywgZGVsYXksIHRpbWUsIGVhc2UsIG5leHRGdW5jdGlvbikgLT5cblxuXHRcdCMgZnJvbSBhcyBzdHJpbmdcblx0XHQjIGVudGVyaW5nVmlldyBhcyBsYXllclxuXHRcdCMgZGVsYXkgYXMgaW50XG5cdFx0IyB0aW1lIGFzIGludFxuXHRcdCMgZWFzZSBhcyBlYXNlXG5cdFx0IyBuZXh0RnVuY3Rpb24gYXMgZnVuY3Rpb25cblxuXHRcdGxlYXZpbmdWaWV3ID0gd2luZG93LnRoaXNWaWV3XG5cdFx0d2luZG93LnRoaXNWaWV3ID0gZW50ZXJpbmdWaWV3XG5cblx0XHRlbnRlcmluZ1ZpZXcudmlzaWJsZSA9IHRydWVcblx0XHRlbnRlcmluZ1ZpZXcub3BhY2l0eSA9IDFcblxuXHRcdGVudGVyaW5nVmlldy5pbmRleCA9IDJcblx0XHRsZWF2aW5nVmlldy5pbmRleCA9IDFcblxuXHRcdGxlYXZpbmdWaWV3VG9YID0gbnVsbFxuXHRcdGxlYXZpbmdWaWV3VG9ZID0gbnVsbFxuXG5cdFx0bGVhdmluZ1ZpZXdTY2FsZSA9IDFcblx0XHRlbnRlcmluZ1ZpZXdTY2FsZSA9IDFcblxuXHRcdCMgdHJhbnNpdGlvblxuXHRcdGlmIGZyb20gPT0gXCJsZWZ0XCJcblxuXHRcdFx0ZW50ZXJpbmdWaWV3LnggPSAtWVVNTVkudmFyaWFibGUoXCJzY3JlZW5XaWR0aFwiKVxuXHRcdFx0ZW50ZXJpbmdWaWV3LnkgPSAwXG5cdFx0XHRsZWF2aW5nVmlld1RvWCA9IFlVTU1ZLnZhcmlhYmxlKFwic2NyZWVuV2lkdGhcIilcblx0XHRcdGxlYXZpbmdWaWV3VG9ZID0gMFxuXG5cdFx0ZWxzZSBpZiBmcm9tID09IFwicmlnaHRcIlxuXG5cdFx0XHRlbnRlcmluZ1ZpZXcueCA9IFlVTU1ZLnZhcmlhYmxlKFwic2NyZWVuV2lkdGhcIik7XG5cdFx0XHRlbnRlcmluZ1ZpZXcueSA9IDBcblx0XHRcdGxlYXZpbmdWaWV3VG9YID0gLVlVTU1ZLnZhcmlhYmxlKFwic2NyZWVuV2lkdGhcIilcblx0XHRcdGxlYXZpbmdWaWV3VG9ZID0gMFxuXG5cdFx0ZWxzZSBpZiBmcm9tID09IFwiYWJvdmVcIlxuXG5cdFx0XHRlbnRlcmluZ1ZpZXcub3BhY2l0eSA9IDBcblx0XHRcdGVudGVyaW5nVmlldy54ID0gMFxuXHRcdFx0ZW50ZXJpbmdWaWV3LnkgPSAwXG5cdFx0XHRlbnRlcmluZ1ZpZXcuc2NhbGUgPSAxLjFcblxuXHRcdFx0ZW50ZXJpbmdWaWV3LmFuaW1hdGVcblx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHRkZWxheTogZGVsYXlcblx0XHRcdFx0XHR0aW1lOiB0aW1lXG5cdFx0XHRcdFx0Y3VydmU6IGVhc2Vcblx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0XHRzY2FsZTogMVxuXG5cdFx0ZWxzZSBpZiBmcm9tID09IFwiYmVsb3dcIlxuXG5cdFx0XHRlbnRlcmluZ1ZpZXcub3BhY2l0eSA9IDBcblx0XHRcdGVudGVyaW5nVmlldy54ID0gMFxuXHRcdFx0ZW50ZXJpbmdWaWV3LnkgPSAwXG5cdFx0XHRlbnRlcmluZ1ZpZXcuaW5kZXggPSAxXG5cdFx0XHRsZWF2aW5nVmlldy5pbmRleCA9IDJcblxuXHRcdFx0ZW50ZXJpbmdWaWV3LmFuaW1hdGVcblx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHRkZWxheTogZGVsYXlcblx0XHRcdFx0XHR0aW1lOiB0aW1lXG5cdFx0XHRcdFx0Y3VydmU6IGVhc2Vcblx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0bGVhdmluZ1ZpZXcuYW5pbWF0ZVxuXHRcdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRcdGRlbGF5OiBkZWxheVxuXHRcdFx0XHRcdHRpbWU6IHRpbWVcblx0XHRcdFx0XHRjdXJ2ZTogZWFzZVxuXHRcdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRcdHNjYWxlOiAxLjFcblxuXHRcdGVsc2UgaWYgZnJvbSA9PSBcImFscGhhXCJcblxuXHRcdFx0ZW50ZXJpbmdWaWV3Lm9wYWNpdHkgPSAwXG5cdFx0XHRlbnRlcmluZ1ZpZXcueCA9IDBcblx0XHRcdGVudGVyaW5nVmlldy55ID0gMFxuXHRcdFx0ZW50ZXJpbmdWaWV3LmluZGV4ID0gMVxuXHRcdFx0bGVhdmluZ1ZpZXcuaW5kZXggPSAyXG5cblx0XHRcdGVudGVyaW5nVmlldy5hbmltYXRlXG5cdFx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdFx0ZGVsYXk6IGRlbGF5XG5cdFx0XHRcdFx0dGltZTogdGltZVxuXHRcdFx0XHRcdGN1cnZlOiBlYXNlXG5cdFx0XHRcdG9wYWNpdHk6IDFcblx0XHRcdGxlYXZpbmdWaWV3LmFuaW1hdGVcblx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHRkZWxheTogZGVsYXlcblx0XHRcdFx0XHR0aW1lOiB0aW1lXG5cdFx0XHRcdFx0Y3VydmU6IGVhc2Vcblx0XHRcdFx0b3BhY2l0eTogMFxuXG5cdFx0ZWxzZSBpZiBmcm9tID09IFwib3ZlcmxheVwiXG5cblx0XHRcdGlmIHdpbmRvdy5zaG93T3ZlcmxheVxuXG5cdFx0XHRcdCMgdmlld1xuXHRcdFx0XHRlbnRlcmluZ1ZpZXcueCA9IDBcblx0XHRcdFx0ZW50ZXJpbmdWaWV3LnkgPSAwXG5cdFx0XHRcdGxlYXZpbmdWaWV3VG9YID0gMFxuXHRcdFx0XHRsZWF2aW5nVmlld1RvWSA9IFlVTU1ZLnZhcmlhYmxlKFwic2NyZWVuSGVpZ2h0XCIpXG5cdFx0XHRcdGxlYXZpbmdWaWV3LmluZGV4ID0gM1xuXHRcdFx0XHRlbnRlcmluZ1ZpZXcuc2NhbGUgPSAwLjlcblx0XHRcdFx0ZW50ZXJpbmdWaWV3VG9TY2FsZSA9IDFcblxuXHRcdFx0XHQjIG92ZXJsYXlcblx0XHRcdFx0b3ZlcmxheSA9IFlVTU1ZLm92ZXJsYXkoZW50ZXJpbmdWaWV3KVxuXHRcdFx0XHRZVU1NWS5mYWRlKG92ZXJsYXksIDAsIDAsIHRpbWUqMC41KVxuXHRcdFx0XHR3aW5kb3cuc2hvd092ZXJsYXkgPSBmYWxzZVxuXG5cdFx0XHRlbHNlXG5cblx0XHRcdFx0IyB2aWV3XG5cdFx0XHRcdGVudGVyaW5nVmlldy54ID0gMFxuXHRcdFx0XHRlbnRlcmluZ1ZpZXcueSA9IFlVTU1ZLnZhcmlhYmxlKFwic2NyZWVuSGVpZ2h0XCIpXG5cdFx0XHRcdGxlYXZpbmdWaWV3VG9YID0gMFxuXHRcdFx0XHRsZWF2aW5nVmlld1RvWSA9IDBcblx0XHRcdFx0bGVhdmluZ1ZpZXdUb1NjYWxlID0gMC45XG5cblx0XHRcdFx0IyBvdmVybGF5XG5cdFx0XHRcdG92ZXJsYXkgPSBZVU1NWS5vdmVybGF5KGxlYXZpbmdWaWV3KVxuXHRcdFx0XHRvdmVybGF5Lm9wYWNpdHkgPSAwXG5cdFx0XHRcdFlVTU1ZLmZhZGUob3ZlcmxheSwgMSwgMCwgdGltZSowLjUpXG5cdFx0XHRcdHdpbmRvdy5zaG93T3ZlcmxheSA9IHRydWVcblxuXHRcdGxlYXZpbmdWaWV3LmFuaW1hdGVcblx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdGRlbGF5OiBkZWxheVxuXHRcdFx0XHR0aW1lOiB0aW1lXG5cdFx0XHRcdGN1cnZlOiBlYXNlXG5cdFx0XHR4OiBsZWF2aW5nVmlld1RvWFxuXHRcdFx0eTogbGVhdmluZ1ZpZXdUb1lcblx0XHRcdHNjYWxlOiBsZWF2aW5nVmlld1RvU2NhbGVcblxuXHRcdGVudGVyaW5nVmlldy5hbmltYXRlXG5cdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRkZWxheTogZGVsYXlcblx0XHRcdFx0dGltZTogdGltZVxuXHRcdFx0XHRjdXJ2ZTogZWFzZVxuXHRcdFx0eDogMFxuXHRcdFx0eTogMFxuXHRcdFx0c2NhbGU6IGVudGVyaW5nVmlld1RvU2NhbGVcblxuXHRcdCMgYWZ0ZXIgYW5pbWF0aW9uIGZ1bmN0aW9uXG5cdFx0ZW50ZXJpbmdWaWV3Lm9uQW5pbWF0aW9uRW5kIC0+XG5cblx0XHRcdGVudGVyaW5nVmlldy5vZmYoRXZlbnRzLkFuaW1hdGlvbkVuZClcblx0XHRcdGxlYXZpbmdWaWV3VG9TY2FsZSA9IDFcblx0XHRcdGxlYXZpbmdWaWV3LnZpc2libGUgPSBmYWxzZVxuXG5cdFx0XHRmb3IgdmlldyBpbiB3aW5kb3cudmlld3Ncblx0XHRcdFx0dmlldy5pbmRleCA9IDFcblxuXHRcdFx0aWYgZnJvbSA9PSBcIm92ZXJsYXlcIlxuXHRcdFx0XHRvdmVybGF5LmRlc3Ryb3koKVxuXG5cdFx0IyBuZXh0IGZ1bmN0aW9uXG5cdFx0aWYgbmV4dEZ1bmN0aW9uXG5cdFx0XHRsZWF2aW5nVmlldy5vbkFuaW1hdGlvbkVuZCAtPlxuXHRcdFx0XHRsZWF2aW5nVmlldy5vZmYoRXZlbnRzLkFuaW1hdGlvbkVuZClcblx0XHRcdFx0bmV4dEZ1bmN0aW9uKClcblxuXHRAZmFkZSA9IChsYXllciwgdG9BbHBoYSwgZGVsYXksIHRpbWUpIC0+XG5cblx0XHQjIGxheWVyIGFzIGxheWVyXG5cdFx0IyB0b0FscGhhIGFzIGludFxuXHRcdCMgZGVsYXkgYXMgaW50XG5cdFx0IyB0aW1lIGFzIGludFxuXG5cdFx0aWYgbGF5ZXIudmlzaWJsZSA9PSBmYWxzZVxuXHRcdFx0bGF5ZXIudmlzaWJsZSA9IHRydWVcblx0XHRcdGxheWVyLm9wYWNpdHkgPSAwXG5cblx0XHRpZiBsYXllci5vcGFjaXR5ICE9IHRvQWxwaGFcblx0XHRcdGlmIG5vdCBsYXllci5pc0FuaW1hdGluZ1xuXHRcdFx0XHRpZiB0b0FscGhhID09IDFcblx0XHRcdFx0XHRsYXllci52aXNpYmxlID0gdHJ1ZVxuXHRcdFx0XHRsYXllci5hbmltYXRlXG5cdFx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHRcdHRpbWU6IHRpbWVcblx0XHRcdFx0XHRcdGN1cnZlOiBCZXppZXIubGluZWFyXG5cdFx0XHRcdFx0XHRkZWxheTogZGVsYXlcblx0XHRcdFx0XHRvcGFjaXR5OiB0b0FscGhhXG5cdFx0XHRcdGxheWVyLm9uQW5pbWF0aW9uRW5kIC0+XG5cdFx0XHRcdFx0bGF5ZXIub2ZmKEV2ZW50cy5BbmltYXRpb25FbmQpXG5cdFx0XHRcdFx0aWYgdG9BbHBoYSA9PSAwXG5cdFx0XHRcdFx0XHRsYXllci52aXNpYmxlID0gZmFsc2VcblxuXHRAbW92ZSA9IChsYXllciwgdG9YLCB0b1ksIGRlbGF5LCB0aW1lLCBjdXJ2ZSwgYW5pbWF0aW9uRW5kRnVuY3Rpb24pIC0+XG5cblx0XHQjIGxheWVyIGFzIGxheWVyXG5cdFx0IyB0b1ggYXMgaW50XG5cdFx0IyB0b1kgYXMgaW50XG5cdFx0IyBkZWxheSBhcyBpbnRcblx0XHQjIHRpbWUgYXMgaW50XG5cdFx0IyBjdXJ2ZSBhcyBjdXJ2ZVxuXHRcdCMgYW5pbWF0aW9uRW5kRnVuY3Rpb24gYXMgZnVuY3Rpb25cblxuXHRcdGlmIG5vdCBsYXllci5pc0FuaW1hdGluZ1xuXHRcdFx0bGF5ZXIuYW5pbWF0ZVxuXHRcdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRcdGN1cnZlOiBjdXJ2ZVxuXHRcdFx0XHRcdGRlbGF5OiBkZWxheVxuXHRcdFx0XHRcdHRpbWU6IHRpbWVcblx0XHRcdFx0eDogdG9YXG5cdFx0XHRcdHk6IHRvWVxuXHRcdFx0aWYgYW5pbWF0aW9uRW5kRnVuY3Rpb25cblx0XHRcdFx0bGF5ZXIub25BbmltYXRpb25FbmQgLT5cblx0XHRcdFx0XHRsYXllci5vZmYoRXZlbnRzLkFuaW1hdGlvbkVuZClcblx0XHRcdFx0XHRhbmltYXRpb25FbmRGdW5jdGlvbigpXG5cbm1vZHVsZS5leHBvcnRzID0gWVVNTVkiLCJfZ2V0SGllcmFyY2h5ID0gKGxheWVyKSAtPlxuICBzdHJpbmcgPSAnJ1xuICBmb3IgYSBpbiBsYXllci5hbmNlc3RvcnMoKVxuICAgIHN0cmluZyA9IGEubmFtZSsnPicrc3RyaW5nXG4gIHJldHVybiBzdHJpbmcgPSBzdHJpbmcrbGF5ZXIubmFtZVxuXG5fbWF0Y2ggPSAoaGllcmFyY2h5LCBzdHJpbmcpIC0+XG4gICMgcHJlcGFyZSByZWdleCB0b2tlbnNcbiAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1xccyo+XFxzKi9nLCc+JykgIyBjbGVhbiB1cCBzcGFjZXMgYXJvdW5kIGFycm93c1xuICBzdHJpbmcgPSBzdHJpbmcuc3BsaXQoJyonKS5qb2luKCdbXj5dKicpICMgYXN0ZXJpa3MgYXMgbGF5ZXIgbmFtZSB3aWxkY2FyZFxuICBzdHJpbmcgPSBzdHJpbmcuc3BsaXQoJyAnKS5qb2luKCcoPzouKik+JykgIyBzcGFjZSBhcyBzdHJ1Y3R1cmUgd2lsZGNhcmRcbiAgc3RyaW5nID0gc3RyaW5nLnNwbGl0KCcsJykuam9pbignJHwnKSAjIGFsbG93IG11bHRpcGxlIHNlYXJjaGVzIHVzaW5nIGNvbW1hXG4gIHJlZ2V4U3RyaW5nID0gXCIoXnw+KVwiK3N0cmluZytcIiRcIiAjIGFsd2F5cyBib3R0b20gbGF5ZXIsIG1heWJlIHBhcnQgb2YgaGllcmFyY2h5XG5cbiAgcmVnRXhwID0gbmV3IFJlZ0V4cChyZWdleFN0cmluZykgXG4gIHJldHVybiBoaWVyYXJjaHkubWF0Y2gocmVnRXhwKVxuXG5fZmluZEFsbCA9IChzZWxlY3RvciwgZnJvbUxheWVyKSAtPlxuICBsYXllcnMgPSBGcmFtZXIuQ3VycmVudENvbnRleHQuX2xheWVyc1xuXG4gIGlmIHNlbGVjdG9yP1xuICAgIHN0cmluZ05lZWRzUmVnZXggPSBfLmZpbmQgWycqJywnICcsJz4nLCcsJ10sIChjKSAtPiBfLmluY2x1ZGVzIHNlbGVjdG9yLGNcbiAgICB1bmxlc3Mgc3RyaW5nTmVlZHNSZWdleCBvciBmcm9tTGF5ZXJcbiAgICAgIGxheWVycyA9IF8uZmlsdGVyIGxheWVycywgKGxheWVyKSAtPiBcbiAgICAgICAgaWYgbGF5ZXIubmFtZSBpcyBzZWxlY3RvciB0aGVuIHRydWVcbiAgICBlbHNlXG4gICAgICBsYXllcnMgPSBfLmZpbHRlciBsYXllcnMsIChsYXllcikgLT5cbiAgICAgICAgICBoaWVyYXJjaHkgPSBfZ2V0SGllcmFyY2h5KGxheWVyKVxuICAgICAgICAgIGlmIGZyb21MYXllcj9cbiAgICAgICAgICAgIF9tYXRjaChoaWVyYXJjaHksIGZyb21MYXllci5uYW1lKycgJytzZWxlY3RvcilcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBfbWF0Y2goaGllcmFyY2h5LCBzZWxlY3RvcilcbiAgZWxzZVxuICAgIGxheWVyc1xuXG5cbiMgR2xvYmFsXG5leHBvcnRzLkZpbmQgICAgPSAoc2VsZWN0b3IsIGZyb21MYXllcikgLT4gX2ZpbmRBbGwoc2VsZWN0b3IsIGZyb21MYXllcilbMF1cbmV4cG9ydHMuxpIgICAgICAgPSAoc2VsZWN0b3IsIGZyb21MYXllcikgLT4gX2ZpbmRBbGwoc2VsZWN0b3IsIGZyb21MYXllcilbMF1cblxuZXhwb3J0cy5GaW5kQWxsID0gKHNlbGVjdG9yLCBmcm9tTGF5ZXIpIC0+IF9maW5kQWxsKHNlbGVjdG9yLCBmcm9tTGF5ZXIpXG5leHBvcnRzLsaSxpIgICAgICA9IChzZWxlY3RvciwgZnJvbUxheWVyKSAtPiBfZmluZEFsbChzZWxlY3RvciwgZnJvbUxheWVyKVxuXG4jIE1ldGhvZHNcbkxheWVyOjpmaW5kICAgICA9IChzZWxlY3RvciwgZnJvbUxheWVyKSAtPiBfZmluZEFsbChzZWxlY3RvciwgQClbMF1cbkxheWVyOjrGkiAgICAgICAgPSAoc2VsZWN0b3IsIGZyb21MYXllcikgLT4gX2ZpbmRBbGwoc2VsZWN0b3IsIEApWzBdXG5cbkxheWVyOjpmaW5kQWxsICA9IChzZWxlY3RvciwgZnJvbUxheWVyKSAtPiBfZmluZEFsbChzZWxlY3RvciwgQClcbkxheWVyOjrGksaSICAgICAgID0gKHNlbGVjdG9yLCBmcm9tTGF5ZXIpIC0+IF9maW5kQWxsKHNlbGVjdG9yLCBAKSIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBRUFBO0FEQUEsSUFBQTs7QUFBQSxhQUFBLEdBQWdCLFNBQUMsS0FBRDtBQUNkLE1BQUE7RUFBQSxNQUFBLEdBQVM7QUFDVDtBQUFBLE9BQUEscUNBQUE7O0lBQ0UsTUFBQSxHQUFTLENBQUMsQ0FBQyxJQUFGLEdBQU8sR0FBUCxHQUFXO0FBRHRCO0FBRUEsU0FBTyxNQUFBLEdBQVMsTUFBQSxHQUFPLEtBQUssQ0FBQztBQUpmOztBQU1oQixNQUFBLEdBQVMsU0FBQyxTQUFELEVBQVksTUFBWjtBQUVQLE1BQUE7RUFBQSxNQUFBLEdBQVMsTUFBTSxDQUFDLE9BQVAsQ0FBZSxVQUFmLEVBQTBCLEdBQTFCO0VBQ1QsTUFBQSxHQUFTLE1BQU0sQ0FBQyxLQUFQLENBQWEsR0FBYixDQUFpQixDQUFDLElBQWxCLENBQXVCLE9BQXZCO0VBQ1QsTUFBQSxHQUFTLE1BQU0sQ0FBQyxLQUFQLENBQWEsR0FBYixDQUFpQixDQUFDLElBQWxCLENBQXVCLFNBQXZCO0VBQ1QsTUFBQSxHQUFTLE1BQU0sQ0FBQyxLQUFQLENBQWEsR0FBYixDQUFpQixDQUFDLElBQWxCLENBQXVCLElBQXZCO0VBQ1QsV0FBQSxHQUFjLE9BQUEsR0FBUSxNQUFSLEdBQWU7RUFFN0IsTUFBQSxHQUFhLElBQUEsTUFBQSxDQUFPLFdBQVA7QUFDYixTQUFPLFNBQVMsQ0FBQyxLQUFWLENBQWdCLE1BQWhCO0FBVEE7O0FBV1QsUUFBQSxHQUFXLFNBQUMsUUFBRCxFQUFXLFNBQVg7QUFDVCxNQUFBO0VBQUEsTUFBQSxHQUFTLE1BQU0sQ0FBQyxjQUFjLENBQUM7RUFFL0IsSUFBRyxnQkFBSDtJQUNFLGdCQUFBLEdBQW1CLENBQUMsQ0FBQyxJQUFGLENBQU8sQ0FBQyxHQUFELEVBQUssR0FBTCxFQUFTLEdBQVQsRUFBYSxHQUFiLENBQVAsRUFBMEIsU0FBQyxDQUFEO2FBQU8sQ0FBQyxDQUFDLFFBQUYsQ0FBVyxRQUFYLEVBQW9CLENBQXBCO0lBQVAsQ0FBMUI7SUFDbkIsSUFBQSxDQUFBLENBQU8sZ0JBQUEsSUFBb0IsU0FBM0IsQ0FBQTthQUNFLE1BQUEsR0FBUyxDQUFDLENBQUMsTUFBRixDQUFTLE1BQVQsRUFBaUIsU0FBQyxLQUFEO1FBQ3hCLElBQUcsS0FBSyxDQUFDLElBQU4sS0FBYyxRQUFqQjtpQkFBK0IsS0FBL0I7O01BRHdCLENBQWpCLEVBRFg7S0FBQSxNQUFBO2FBSUUsTUFBQSxHQUFTLENBQUMsQ0FBQyxNQUFGLENBQVMsTUFBVCxFQUFpQixTQUFDLEtBQUQ7QUFDdEIsWUFBQTtRQUFBLFNBQUEsR0FBWSxhQUFBLENBQWMsS0FBZDtRQUNaLElBQUcsaUJBQUg7aUJBQ0UsTUFBQSxDQUFPLFNBQVAsRUFBa0IsU0FBUyxDQUFDLElBQVYsR0FBZSxHQUFmLEdBQW1CLFFBQXJDLEVBREY7U0FBQSxNQUFBO2lCQUdFLE1BQUEsQ0FBTyxTQUFQLEVBQWtCLFFBQWxCLEVBSEY7O01BRnNCLENBQWpCLEVBSlg7S0FGRjtHQUFBLE1BQUE7V0FhRSxPQWJGOztBQUhTOztBQW9CWCxPQUFPLENBQUMsSUFBUixHQUFrQixTQUFDLFFBQUQsRUFBVyxTQUFYO1NBQXlCLFFBQUEsQ0FBUyxRQUFULEVBQW1CLFNBQW5CLENBQThCLENBQUEsQ0FBQTtBQUF2RDs7QUFDbEIsT0FBTyxDQUFDLENBQVIsR0FBa0IsU0FBQyxRQUFELEVBQVcsU0FBWDtTQUF5QixRQUFBLENBQVMsUUFBVCxFQUFtQixTQUFuQixDQUE4QixDQUFBLENBQUE7QUFBdkQ7O0FBRWxCLE9BQU8sQ0FBQyxPQUFSLEdBQWtCLFNBQUMsUUFBRCxFQUFXLFNBQVg7U0FBeUIsUUFBQSxDQUFTLFFBQVQsRUFBbUIsU0FBbkI7QUFBekI7O0FBQ2xCLE9BQU8sQ0FBQyxFQUFSLEdBQWtCLFNBQUMsUUFBRCxFQUFXLFNBQVg7U0FBeUIsUUFBQSxDQUFTLFFBQVQsRUFBbUIsU0FBbkI7QUFBekI7O0FBR2xCLEtBQUssQ0FBQSxTQUFFLENBQUEsSUFBUCxHQUFrQixTQUFDLFFBQUQsRUFBVyxTQUFYO1NBQXlCLFFBQUEsQ0FBUyxRQUFULEVBQW1CLElBQW5CLENBQXNCLENBQUEsQ0FBQTtBQUEvQzs7QUFDbEIsS0FBSyxDQUFBLFNBQUUsQ0FBQSxDQUFQLEdBQWtCLFNBQUMsUUFBRCxFQUFXLFNBQVg7U0FBeUIsUUFBQSxDQUFTLFFBQVQsRUFBbUIsSUFBbkIsQ0FBc0IsQ0FBQSxDQUFBO0FBQS9DOztBQUVsQixLQUFLLENBQUEsU0FBRSxDQUFBLE9BQVAsR0FBa0IsU0FBQyxRQUFELEVBQVcsU0FBWDtTQUF5QixRQUFBLENBQVMsUUFBVCxFQUFtQixJQUFuQjtBQUF6Qjs7QUFDbEIsS0FBSyxDQUFBLFNBQUUsQ0FBQSxFQUFQLEdBQWtCLFNBQUMsUUFBRCxFQUFXLFNBQVg7U0FBeUIsUUFBQSxDQUFTLFFBQVQsRUFBbUIsSUFBbkI7QUFBekI7Ozs7QURoRGxCLElBQUE7O0FBQU07OztFQUVMLEtBQUMsQ0FBQSxRQUFELEdBQVksU0FBQyxJQUFEO0FBSVgsUUFBQTtBQUFBLFlBQUEsS0FBQTtBQUFBLFdBQ00sSUFBQSxLQUFRLGFBRGQ7UUFDaUMsTUFBQSxHQUFTLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQXJCLEdBQTJCO0FBQS9EO0FBRE4sV0FFTSxJQUFBLEtBQVEsY0FGZDtRQUVrQyxNQUFBLEdBQVMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBckIsR0FBNEI7QUFBakU7QUFGTixXQUdNLElBQUEsS0FBUSxZQUhkO1FBR2dDLE1BQUEsR0FBUztBQUFuQztBQUhOLFdBSU0sSUFBQSxLQUFRLGFBSmQ7UUFJaUMsTUFBQSxHQUFTO0FBQXBDO0FBSk4sV0FLTSxJQUFBLEtBQVEsZ0JBTGQ7UUFLb0MsTUFBQSxHQUFTO0FBTDdDO0FBT0EsV0FBTztFQVhJOztFQWFaLEtBQUMsQ0FBQSxLQUFELEdBQVMsU0FBQyxLQUFEO0FBSVIsUUFBQTtJQUFBLE1BQU0sQ0FBQyxLQUFQLEdBQWU7QUFFZjtTQUFBLHVDQUFBOztNQUNDLElBQUksQ0FBQyxJQUFMLEdBQVk7TUFDWixJQUFJLENBQUMsS0FBTCxHQUFhO01BQ2IsSUFBSSxDQUFDLE9BQUwsR0FBZTtNQUNmLElBQUksQ0FBQyxDQUFMLEdBQVM7bUJBQ1QsSUFBSSxDQUFDLENBQUwsR0FBUztBQUxWOztFQU5ROztFQWFULEtBQUMsQ0FBQSxPQUFELEdBQVcsU0FBQyxLQUFEO0FBSVYsUUFBQTtJQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCO0FBRWpCO1NBQUEseUNBQUE7O01BRUMsUUFBQSxHQUFXLE1BQU0sQ0FBQztNQUVsQixJQUFHLFFBQVEsQ0FBQyxNQUFULEdBQWtCLENBQXJCO1FBRUMsTUFBTSxDQUFDLFlBQVAsQ0FBb0IsU0FBQTtBQUNuQixjQUFBO1VBQUEsWUFBQSxHQUFlLElBQUksQ0FBQztBQUNwQjtlQUFBLGdEQUFBOztZQUNDLElBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFYLENBQW9CLFNBQXBCLENBQUg7NEJBQ0MsS0FBSyxDQUFDLE9BQU4sR0FBZ0IsT0FEakI7YUFBQSxNQUFBO29DQUFBOztBQUREOztRQUZtQixDQUFwQjtxQkFNQSxNQUFNLENBQUMsVUFBUCxDQUFrQixTQUFBO0FBQ2pCLGNBQUE7VUFBQSxZQUFBLEdBQWUsSUFBSSxDQUFDO0FBQ3BCO2VBQUEsZ0RBQUE7O1lBQ0MsSUFBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVgsQ0FBb0IsU0FBcEIsQ0FBSDs0QkFDQyxLQUFLLENBQUMsT0FBTixHQUFnQixNQURqQjthQUFBLE1BQUE7b0NBQUE7O0FBREQ7O1FBRmlCLENBQWxCLEdBUkQ7T0FBQSxNQUFBO1FBZ0JDLE1BQU0sQ0FBQyxZQUFQLENBQW9CLFNBQUE7aUJBQ25CLElBQUksQ0FBQyxPQUFMLEdBQWU7UUFESSxDQUFwQjtxQkFFQSxNQUFNLENBQUMsVUFBUCxDQUFrQixTQUFBO2lCQUNqQixJQUFJLENBQUMsT0FBTCxHQUFlO1FBREUsQ0FBbEIsR0FsQkQ7O0FBSkQ7O0VBTlU7O0VBK0JYLEtBQUMsQ0FBQSxPQUFELEdBQVcsU0FBQyxNQUFEO0FBSVYsUUFBQTtXQUFBLE9BQUEsR0FBYyxJQUFBLEtBQUEsQ0FDYjtNQUFBLGVBQUEsRUFBaUIsZ0JBQWpCO01BQ0EsTUFBQSxFQUFRLEtBQUssQ0FBQyxRQUFOLENBQWUsY0FBZixDQURSO01BRUEsSUFBQSxFQUFNLFNBRk47TUFHQSxNQUFBLEVBQVEsTUFIUjtNQUlBLEtBQUEsRUFBTyxLQUFLLENBQUMsUUFBTixDQUFlLGFBQWYsQ0FKUDtNQUtBLENBQUEsRUFBRyxDQUxIO01BTUEsQ0FBQSxFQUFHLENBTkg7S0FEYTtFQUpKOztFQWFYLEtBQUMsQ0FBQSxZQUFELEdBQWdCLFNBQUMsSUFBRCxFQUFPLFlBQVAsRUFBcUIsS0FBckIsRUFBNEIsSUFBNUIsRUFBa0MsSUFBbEMsRUFBd0MsWUFBeEM7QUFTZixRQUFBO0lBQUEsV0FBQSxHQUFjLE1BQU0sQ0FBQztJQUNyQixNQUFNLENBQUMsUUFBUCxHQUFrQjtJQUVsQixZQUFZLENBQUMsT0FBYixHQUF1QjtJQUN2QixZQUFZLENBQUMsT0FBYixHQUF1QjtJQUV2QixZQUFZLENBQUMsS0FBYixHQUFxQjtJQUNyQixXQUFXLENBQUMsS0FBWixHQUFvQjtJQUVwQixjQUFBLEdBQWlCO0lBQ2pCLGNBQUEsR0FBaUI7SUFFakIsZ0JBQUEsR0FBbUI7SUFDbkIsaUJBQUEsR0FBb0I7SUFHcEIsSUFBRyxJQUFBLEtBQVEsTUFBWDtNQUVDLFlBQVksQ0FBQyxDQUFiLEdBQWlCLENBQUMsS0FBSyxDQUFDLFFBQU4sQ0FBZSxhQUFmO01BQ2xCLFlBQVksQ0FBQyxDQUFiLEdBQWlCO01BQ2pCLGNBQUEsR0FBaUIsS0FBSyxDQUFDLFFBQU4sQ0FBZSxhQUFmO01BQ2pCLGNBQUEsR0FBaUIsRUFMbEI7S0FBQSxNQU9LLElBQUcsSUFBQSxLQUFRLE9BQVg7TUFFSixZQUFZLENBQUMsQ0FBYixHQUFpQixLQUFLLENBQUMsUUFBTixDQUFlLGFBQWY7TUFDakIsWUFBWSxDQUFDLENBQWIsR0FBaUI7TUFDakIsY0FBQSxHQUFpQixDQUFDLEtBQUssQ0FBQyxRQUFOLENBQWUsYUFBZjtNQUNsQixjQUFBLEdBQWlCLEVBTGI7S0FBQSxNQU9BLElBQUcsSUFBQSxLQUFRLE9BQVg7TUFFSixZQUFZLENBQUMsT0FBYixHQUF1QjtNQUN2QixZQUFZLENBQUMsQ0FBYixHQUFpQjtNQUNqQixZQUFZLENBQUMsQ0FBYixHQUFpQjtNQUNqQixZQUFZLENBQUMsS0FBYixHQUFxQjtNQUVyQixZQUFZLENBQUMsT0FBYixDQUNDO1FBQUEsT0FBQSxFQUNDO1VBQUEsS0FBQSxFQUFPLEtBQVA7VUFDQSxJQUFBLEVBQU0sSUFETjtVQUVBLEtBQUEsRUFBTyxJQUZQO1NBREQ7UUFJQSxPQUFBLEVBQVMsQ0FKVDtRQUtBLEtBQUEsRUFBTyxDQUxQO09BREQsRUFQSTtLQUFBLE1BZUEsSUFBRyxJQUFBLEtBQVEsT0FBWDtNQUVKLFlBQVksQ0FBQyxPQUFiLEdBQXVCO01BQ3ZCLFlBQVksQ0FBQyxDQUFiLEdBQWlCO01BQ2pCLFlBQVksQ0FBQyxDQUFiLEdBQWlCO01BQ2pCLFlBQVksQ0FBQyxLQUFiLEdBQXFCO01BQ3JCLFdBQVcsQ0FBQyxLQUFaLEdBQW9CO01BRXBCLFlBQVksQ0FBQyxPQUFiLENBQ0M7UUFBQSxPQUFBLEVBQ0M7VUFBQSxLQUFBLEVBQU8sS0FBUDtVQUNBLElBQUEsRUFBTSxJQUROO1VBRUEsS0FBQSxFQUFPLElBRlA7U0FERDtRQUlBLE9BQUEsRUFBUyxDQUpUO09BREQ7TUFNQSxXQUFXLENBQUMsT0FBWixDQUNDO1FBQUEsT0FBQSxFQUNDO1VBQUEsS0FBQSxFQUFPLEtBQVA7VUFDQSxJQUFBLEVBQU0sSUFETjtVQUVBLEtBQUEsRUFBTyxJQUZQO1NBREQ7UUFJQSxPQUFBLEVBQVMsQ0FKVDtRQUtBLEtBQUEsRUFBTyxHQUxQO09BREQsRUFkSTtLQUFBLE1Bc0JBLElBQUcsSUFBQSxLQUFRLE9BQVg7TUFFSixZQUFZLENBQUMsT0FBYixHQUF1QjtNQUN2QixZQUFZLENBQUMsQ0FBYixHQUFpQjtNQUNqQixZQUFZLENBQUMsQ0FBYixHQUFpQjtNQUNqQixZQUFZLENBQUMsS0FBYixHQUFxQjtNQUNyQixXQUFXLENBQUMsS0FBWixHQUFvQjtNQUVwQixZQUFZLENBQUMsT0FBYixDQUNDO1FBQUEsT0FBQSxFQUNDO1VBQUEsS0FBQSxFQUFPLEtBQVA7VUFDQSxJQUFBLEVBQU0sSUFETjtVQUVBLEtBQUEsRUFBTyxJQUZQO1NBREQ7UUFJQSxPQUFBLEVBQVMsQ0FKVDtPQUREO01BTUEsV0FBVyxDQUFDLE9BQVosQ0FDQztRQUFBLE9BQUEsRUFDQztVQUFBLEtBQUEsRUFBTyxLQUFQO1VBQ0EsSUFBQSxFQUFNLElBRE47VUFFQSxLQUFBLEVBQU8sSUFGUDtTQUREO1FBSUEsT0FBQSxFQUFTLENBSlQ7T0FERCxFQWRJO0tBQUEsTUFxQkEsSUFBRyxJQUFBLEtBQVEsU0FBWDtNQUVKLElBQUcsTUFBTSxDQUFDLFdBQVY7UUFHQyxZQUFZLENBQUMsQ0FBYixHQUFpQjtRQUNqQixZQUFZLENBQUMsQ0FBYixHQUFpQjtRQUNqQixjQUFBLEdBQWlCO1FBQ2pCLGNBQUEsR0FBaUIsS0FBSyxDQUFDLFFBQU4sQ0FBZSxjQUFmO1FBQ2pCLFdBQVcsQ0FBQyxLQUFaLEdBQW9CO1FBQ3BCLFlBQVksQ0FBQyxLQUFiLEdBQXFCO1FBQ3JCLG1CQUFBLEdBQXNCO1FBR3RCLE9BQUEsR0FBVSxLQUFLLENBQUMsT0FBTixDQUFjLFlBQWQ7UUFDVixLQUFLLENBQUMsSUFBTixDQUFXLE9BQVgsRUFBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsSUFBQSxHQUFLLEdBQS9CO1FBQ0EsTUFBTSxDQUFDLFdBQVAsR0FBcUIsTUFkdEI7T0FBQSxNQUFBO1FBbUJDLFlBQVksQ0FBQyxDQUFiLEdBQWlCO1FBQ2pCLFlBQVksQ0FBQyxDQUFiLEdBQWlCLEtBQUssQ0FBQyxRQUFOLENBQWUsY0FBZjtRQUNqQixjQUFBLEdBQWlCO1FBQ2pCLGNBQUEsR0FBaUI7UUFDakIsa0JBQUEsR0FBcUI7UUFHckIsT0FBQSxHQUFVLEtBQUssQ0FBQyxPQUFOLENBQWMsV0FBZDtRQUNWLE9BQU8sQ0FBQyxPQUFSLEdBQWtCO1FBQ2xCLEtBQUssQ0FBQyxJQUFOLENBQVcsT0FBWCxFQUFvQixDQUFwQixFQUF1QixDQUF2QixFQUEwQixJQUFBLEdBQUssR0FBL0I7UUFDQSxNQUFNLENBQUMsV0FBUCxHQUFxQixLQTdCdEI7T0FGSTs7SUFpQ0wsV0FBVyxDQUFDLE9BQVosQ0FDQztNQUFBLE9BQUEsRUFDQztRQUFBLEtBQUEsRUFBTyxLQUFQO1FBQ0EsSUFBQSxFQUFNLElBRE47UUFFQSxLQUFBLEVBQU8sSUFGUDtPQUREO01BSUEsQ0FBQSxFQUFHLGNBSkg7TUFLQSxDQUFBLEVBQUcsY0FMSDtNQU1BLEtBQUEsRUFBTyxrQkFOUDtLQUREO0lBU0EsWUFBWSxDQUFDLE9BQWIsQ0FDQztNQUFBLE9BQUEsRUFDQztRQUFBLEtBQUEsRUFBTyxLQUFQO1FBQ0EsSUFBQSxFQUFNLElBRE47UUFFQSxLQUFBLEVBQU8sSUFGUDtPQUREO01BSUEsQ0FBQSxFQUFHLENBSkg7TUFLQSxDQUFBLEVBQUcsQ0FMSDtNQU1BLEtBQUEsRUFBTyxtQkFOUDtLQUREO0lBVUEsWUFBWSxDQUFDLGNBQWIsQ0FBNEIsU0FBQTtBQUUzQixVQUFBO01BQUEsWUFBWSxDQUFDLEdBQWIsQ0FBaUIsTUFBTSxDQUFDLFlBQXhCO01BQ0Esa0JBQUEsR0FBcUI7TUFDckIsV0FBVyxDQUFDLE9BQVosR0FBc0I7QUFFdEI7QUFBQSxXQUFBLHFDQUFBOztRQUNDLElBQUksQ0FBQyxLQUFMLEdBQWE7QUFEZDtNQUdBLElBQUcsSUFBQSxLQUFRLFNBQVg7ZUFDQyxPQUFPLENBQUMsT0FBUixDQUFBLEVBREQ7O0lBVDJCLENBQTVCO0lBYUEsSUFBRyxZQUFIO2FBQ0MsV0FBVyxDQUFDLGNBQVosQ0FBMkIsU0FBQTtRQUMxQixXQUFXLENBQUMsR0FBWixDQUFnQixNQUFNLENBQUMsWUFBdkI7ZUFDQSxZQUFBLENBQUE7TUFGMEIsQ0FBM0IsRUFERDs7RUFsS2U7O0VBdUtoQixLQUFDLENBQUEsSUFBRCxHQUFRLFNBQUMsS0FBRCxFQUFRLE9BQVIsRUFBaUIsS0FBakIsRUFBd0IsSUFBeEI7SUFPUCxJQUFHLEtBQUssQ0FBQyxPQUFOLEtBQWlCLEtBQXBCO01BQ0MsS0FBSyxDQUFDLE9BQU4sR0FBZ0I7TUFDaEIsS0FBSyxDQUFDLE9BQU4sR0FBZ0IsRUFGakI7O0lBSUEsSUFBRyxLQUFLLENBQUMsT0FBTixLQUFpQixPQUFwQjtNQUNDLElBQUcsQ0FBSSxLQUFLLENBQUMsV0FBYjtRQUNDLElBQUcsT0FBQSxLQUFXLENBQWQ7VUFDQyxLQUFLLENBQUMsT0FBTixHQUFnQixLQURqQjs7UUFFQSxLQUFLLENBQUMsT0FBTixDQUNDO1VBQUEsT0FBQSxFQUNDO1lBQUEsSUFBQSxFQUFNLElBQU47WUFDQSxLQUFBLEVBQU8sTUFBTSxDQUFDLE1BRGQ7WUFFQSxLQUFBLEVBQU8sS0FGUDtXQUREO1VBSUEsT0FBQSxFQUFTLE9BSlQ7U0FERDtlQU1BLEtBQUssQ0FBQyxjQUFOLENBQXFCLFNBQUE7VUFDcEIsS0FBSyxDQUFDLEdBQU4sQ0FBVSxNQUFNLENBQUMsWUFBakI7VUFDQSxJQUFHLE9BQUEsS0FBVyxDQUFkO21CQUNDLEtBQUssQ0FBQyxPQUFOLEdBQWdCLE1BRGpCOztRQUZvQixDQUFyQixFQVREO09BREQ7O0VBWE87O0VBMEJSLEtBQUMsQ0FBQSxJQUFELEdBQVEsU0FBQyxLQUFELEVBQVEsR0FBUixFQUFhLEdBQWIsRUFBa0IsS0FBbEIsRUFBeUIsSUFBekIsRUFBK0IsS0FBL0IsRUFBc0Msb0JBQXRDO0lBVVAsSUFBRyxDQUFJLEtBQUssQ0FBQyxXQUFiO01BQ0MsS0FBSyxDQUFDLE9BQU4sQ0FDQztRQUFBLE9BQUEsRUFDQztVQUFBLEtBQUEsRUFBTyxLQUFQO1VBQ0EsS0FBQSxFQUFPLEtBRFA7VUFFQSxJQUFBLEVBQU0sSUFGTjtTQUREO1FBSUEsQ0FBQSxFQUFHLEdBSkg7UUFLQSxDQUFBLEVBQUcsR0FMSDtPQUREO01BT0EsSUFBRyxvQkFBSDtlQUNDLEtBQUssQ0FBQyxjQUFOLENBQXFCLFNBQUE7VUFDcEIsS0FBSyxDQUFDLEdBQU4sQ0FBVSxNQUFNLENBQUMsWUFBakI7aUJBQ0Esb0JBQUEsQ0FBQTtRQUZvQixDQUFyQixFQUREO09BUkQ7O0VBVk87Ozs7OztBQXVCVCxNQUFNLENBQUMsT0FBUCxHQUFpQiJ9
