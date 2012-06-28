describe "Element#inspect" do
  before do
    @div = Element.new <<-HTML
      <div id="inspect-spec">
        <div id="foo"></div>
        <div class="bar"></div>
        <p id="lol" class="bar"></div>
      </div>
    HTML

    @div.append_to_body
  end

  after do
    @div.remove
  end

  it "should return a string representation of the element" do
    Document['#foo'].inspect.should == '<div id="foo">'
    Document['#lol'].inspect.should == '<p id="lol" class="bar">'
  end
end