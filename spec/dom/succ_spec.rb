describe "Element#succ" do
  before do
    @div = DOM <<-HTML
      <div id="succ-spec">
        <div id="foo"></div>
        <div id="bar"></div>
      </div>
    HTML

    @div.append_to_body
  end

  after do
    @div.remove
  end

  it "should return the succ sibling" do
    DOM('#foo').succ.id.should == 'bar'
  end

  it "should return nil when no succ Element" do
    DOM('#bar').succ.should be_nil
  end
end