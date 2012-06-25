describe "Element#prev" do
  before do
    @div = Element <<-HTML
      <div id="prev-spec">
        <div id="foo"></div>
        <div id="bar"></div>
      </div>
    HTML

    @div.append_to_body
  end

  after do
    @div.remove
  end

  it "should return the prev sibling" do
    Element('#bar').prev.id.should == 'foo'
  end

  it "should return nil when no prev element" do
    Element('#foo').prev.should be_nil
  end
end