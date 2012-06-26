describe "Element#append" do
  before do
    @div = Element <<-HTML
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
      woosh = Element '#woosh'
      woosh.append '<p>Hey there</p>'
      woosh.html.should == "<p>Hey there</p>"
    end

    it "should append multiple elements from html string" do
      kapow = Element '#kapow'
      kapow.append '<p>Hello</p><p>World</p>'
      kapow.html.should == '<p>Hello</p><p>World</p>'
    end
  end
end