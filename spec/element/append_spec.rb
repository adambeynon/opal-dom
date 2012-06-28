describe "Element#append" do
  before do
    @div = Element.new <<-HTML
      <div id="append-spec">
        <div id="woosh"></div>
        <div id="kapow"></div>
      </div>
    HTML

    @div.append_to_body
  end

  after do
    @div.remove
  end

  describe "when given string content" do
    it "should append the dom nodes in the string into the element" do
      woosh = Document['#woosh']
      html  = '<p>Hey there</p>'
      woosh.append html
      # FIXME? IE uses uppercase element names?
      woosh.html.downcase.should == html.downcase
    end

    it "should append multiple elements from html string" do
      kapow = Document['#kapow']
      html  = '<p>Hello</p><p>World</p>'
      kapow.append html
      # FIXME? IE uses uppercase element names?
      kapow.html.downcase.should == html.downcase
    end
  end
end