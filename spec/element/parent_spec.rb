describe "Element#parent" do
  before do
    @div = Element.new <<-HTML
      <div id="foo">
        <div id="bar"></div>
        <div id="baz"></div>
      </div>
    HTML

    @div.append_to_body
  end

  after do
    @div.remove
  end

  it "should return the parent of the element" do
    Document['#bar'].parent.id.should == "foo"
  end

  it "should return nil when the element has no parent" do
    el = Element.new '<div id="woosh"></div>'
    el.parent.should be_nil
  end
end