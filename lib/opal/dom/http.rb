class HTTP

  %x{
    var make_xhr = function() {
      if (typeof XMLHttpRequest !== 'undefined' && (window.location.protocol !== 'file:' || !window.ActiveXObject)) {
        return new XMLHttpRequest();
      } else {
        try {
          return new ActiveXObject('Msxml2.XMLHTTP.6.0');
        } catch(e) { }
        try {
          return new ActiveXObject('Msxml2.XMLHTTP.3.0');
        } catch(e) { }
        try {
          return new ActiveXObject('Msxml2.XMLHTTP');
        } catch(e) { }
      }

      #{ raise "Cannot make request" };
    }
  }
  def initialize
    %x{
      this.xhr = make_xhr();
    }
  end

  def ok?
    `this.status >= 200 && this.status < 300`
  end
end