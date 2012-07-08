# Wrapper around native `XMLHttpRequest` object to perform ajax calls.
class HTTP

  # HTTP.get
  #
  #   HTTP.get("api/users/1") do |res|
  #     alert "got result"
  #   end
  #
  # @param [String] url url to get
  # @param [Hash] options any options to use
  # @return [HTTP] returns new instance
  def self.get(url, options={}, &handler)
    self.new 'GET', url, options, handler
  end

  # The response body from the request. This will be nil until the
  # request is completed.
  #
  #   HTTP.get("api/users/1") do |res|
  #     alert "result: #{res}"
  #   end
  # 
  # @return [String]
  attr_reader :body

  # The status number of the request.
  #
  #   HTTP.get("api/users/1") do |res|
  #     if res.status = 404
  #       raise "we got a 404!"
  #     else
  #       alert "got result!"
  #     end
  #   end
  #
  # @return [Numeric]
  attr_reader :status

  # Use one of the designated methods insead (HTTP.get(), etc).
  # @private
  def initialize(method, url, options, handler)
    @handler = handler
    %x{
      var xhr = this.xhr = make_xhr(), http = this;

      xhr.open(method.toUpperCase(), url, true);
      xhr.onreadystatechange = function() {
        #{ `http`.on_state_change };
      }

      xhr.send(null);
    }
  end

  # Returns true if this request succeeded, false otherwise.
  #
  #   HTTP.get('foo.html') do |res|
  #     if res.ok?
  #       puts "it worked!"
  #     end
  #   end
  #
  # @return [true, false]
  def ok?
    `this.status >= 200 && this.status < 300`
  end

  # Handles the native xhr object `onreadystatechange` callback. You
  # shouldn't call this method directly.
  #
  # @private
  def on_state_change
    xhr = @xhr
    return if `xhr.readyState != 4`

    # accessing status breaks sometimes
    begin
      @status = `xhr.status`
    rescue => e
      @status = 0
    end

    @body = `xhr.responseText || ''`

    @handler.call self
  end

  # Create a native xhr object
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
end