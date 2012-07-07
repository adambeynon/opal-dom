describe "Element#up" do
  before do
    @div = Element.new <<-HTML
      <div id="foo">
        <div id="bar" class="woosh">
          <p id="baz" class="kapow">
            <a id="buz">Hello</a>
          </p>
        </div>
      </div>
    HTML

    @div.append_to_body
  end

  after do
    @div.remove
  end

  describe "when given no selector" do
    it "should return the elements parent" do
      Document['#bar'].up.id.should == 'foo'
    end

    it "should return nil when the element has no parent" do
      Element.new('div').up.should be_nil
    end
  end

  describe "when given a CSS selector" do
    it "should return the first parent that matches the selector" do
      Document['#buz'].up('.kapow').id.should == "baz"
      Document['#buz'].up('.woosh').id.should == "bar"
      Document['#buz'].up('div').id.should == "bar"
    end

    it "should return nil when no parents match selector" do
      Document['#buz'].up('.random_class').should be_nil
    end
  end
end