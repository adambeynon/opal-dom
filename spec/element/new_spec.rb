describe "Element.new" do
  describe "when given no arguments" do
    it "should return a new div element" do
      el = Element.new
      el.tag.should == 'div'
    end
  end

  describe "when given a tag name argument" do
    it "should return a new element with the given tag name" do
      Element.new('div').tag.should == 'div'
      Element.new('p').tag.should == 'p'
      Element.new('script').tag.should == 'script'
    end
  end

  describe "when given a real dom element" do
    before do
      @div = Element.new <<-HTML
        <div id="element-new-spec">
          <div id="foo"></div>
          <p id="bar"></div>
        </div>
      HTML

      @div.append_to_body
    end

    after do
      @div.remove
    end

    it "should wrap the native element" do
      Element.new(`document.getElementById('foo')`).tag.should == 'div'
      Element.new(`document.getElementById('bar')`).tag.should == 'p'
    end
  end

  describe "when given a string of raw html code" do
    it "should parse the given html and wrap the new element" do
      Element.new('<div id="woosh"></div>').id.should == 'woosh'
      Element.new('<div id="kapow"><p></p></div><p></p>').id.should == 'kapow'
    end
  end
end