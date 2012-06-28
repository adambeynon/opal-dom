describe "Element#next" do
  before do
    @div = Element.new <<-HTML
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
    Document['#foo'].next.id.should == 'bar'
  end

  it "should return nil when no next Element" do
    Document['#bar'].next.should be_nil
  end
end