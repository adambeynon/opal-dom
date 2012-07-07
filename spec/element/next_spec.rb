describe "Element#next" do
  before do
    @div = Element.new <<-HTML
      <div id="next-spec">
        <div id="woosh"></div>
        <div id="kapow" class="erm"></div>
        <div id="ping" class="pong"></div>

        <div id="foo"></div>
        <div id="bar"></div>
      </div>

    HTML

    @div.append_to_body
  end

  after do
    @div.remove
  end

  describe "when given no selector" do
    it "should return the next sibling" do
      Document['#foo'].next.id.should == 'bar'
    end

    it "should return nil when no next Element" do
      Document['#bar'].next.should be_nil
    end
  end

  describe "when given a selector" do
    it "should return the next sibling matching the selector" do
      Document['#woosh'].next('.erm').id.should == "kapow"
      Document['#woosh'].next('.pong').id.should == "ping"
    end

    it "should return nil when no next sibling matches selector" do
      Document['#woosh'].next('.nothingness').should be_nil
      Element.new('p').next('.erm').should be_nil
    end
  end
end