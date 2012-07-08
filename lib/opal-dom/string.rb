class String
  def to_uri_component
    `encodeURIComponent(this)`
  end
end