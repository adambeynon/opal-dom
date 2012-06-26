describe "DOM#prev" do
  before do
    @div = DOM <<-HTML
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
    DOM('#bar').prev.id.should == 'foo'
  end

  it "should return nil when no prev DOM" do
    DOM('#foo').prev.should be_nil
  end
end