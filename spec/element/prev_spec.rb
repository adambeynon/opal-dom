describe "Element#prev" do
  before do
    @div = Element.new <<-HTML
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
    Document['#bar'].prev.id.should == 'foo'
  end

  it "should return nil when no prev Element" do
    Document['#foo'].prev.should be_nil
  end
end