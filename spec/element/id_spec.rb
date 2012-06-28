describe "Element#id" do
  before do
    @div = Element.new <<-HTML
      <div id="Element-id-spec">
        <div id="foo"></div>
        <div id="bar"></div>
      </div>
    HTML

    @div.append_to_body
  end

  after do
    @div.remove
  end

  it "should return the Element's id" do
    Document['#foo'].id.should == 'foo'
    Document['#bar'].id.should == 'bar'
  end
end