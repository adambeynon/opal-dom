describe "Element#inspect" do
  before do
    @div = Element <<-HTML
      <div id="inspect-spec">
        <div id="foo"></div>
        <div id="blah" class="bar"></div>
        <p id="lol" class="bar"></div>
      </div>
    HTML

    @div.append_to_body
  end

  after do
    @div.remove
  end

  it "should return a string representation of the element" do
    Element('#foo').inspect.should == '<div id="foo">'
    Element('#lol').inspect.should == '<p id="lol" class="bar">'
  end
end