describe "Element#next" do
  before do
    @div = Element <<-HTML
      <div id="next-spec">
        <div id="foo"></div>
        <div id="bar"></div>
      </div>
    HTML

    @div.append_to_body
  end

  after do
    @div.remove
  end

  it "should return the next sibling" do
    Element('#foo').next.id.should == 'bar'
  end

  it "should return nil when no next Element" do
    Element('#bar').next.should be_nil
  end
end