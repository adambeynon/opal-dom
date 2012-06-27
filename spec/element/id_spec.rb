describe "Element#id" do
  before do
    @div = DOM <<-HTML
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
    DOM('#foo').id.should == 'foo'
    DOM('#bar').id.should == 'bar'
  end
end