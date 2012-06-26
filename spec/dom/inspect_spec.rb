describe "DOM#inspect" do
  before do
    @div = DOM <<-HTML
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

  it "should return a string representation of the elements" do
    DOM('#foo').inspect.should == '(<div id="foo">)'
    DOM('.bar').inspect.should == '(<div class="bar">, <p id="lol" class="bar">)'
  end

  it "returns '()' when called on an empty collection" do
    DOM('.empty-collection').inspect.should == "()"
  end
end