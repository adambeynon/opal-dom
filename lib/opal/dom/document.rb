module Document
  def self.[](selector)
    %x{
      if (selector.charAt(0) === '#') {
        var el = document.getElementById(selector.substr(1));

        if (el) {
          return #{ Element.new `el` }
        }

        return nil;
      }
      else if (/\\s*</.test(selector)) {
        console.log("Document#['html string to parse'] is depreciated. Use Element.new() instead");
        return #{ Element.new `selector` }
      }
      else {
        var el = document.querySelectorAll(selector), res = #{ Element.allocate };

        for (var i = 0, length = el.length; i < length; i++) {
          res[i] = el[i];
        }

        res.length = el.length;
        return res;
      }
    }
  end

  def self.body_ready?
    `!!(document && document.body)`
  end

  def self.ready?(&block)
    `setTimeout(function() { block.call(block._s); }, 0)`
  end
end