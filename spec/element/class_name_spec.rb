describe "Element#class_name" do
  before do
    @div = Element <<-HTML
      <div id="class-name-spec">
        <div id="foo" class="whiskey"></div>
        <div id="bar" class="scotch brandy"></div>
        <div id="baz" class=""></div>
        <div id="buz"></div>

        <div class="red dark"></div>
        <div class="red light"></div>
      </div>
    HTML

    @div.append_to_body
  end

  after do
    @div.remove
  end

  it "should return the elements' classname" do
    Element('#foo').class_name.should == 'whiskey'
    Element('#bar').class_name.should == 'scotch brandy'
  end

  it "should return an empty string for elements with no classname" do
    Element('#baz').class_name.should == ''
    Element('#buz').class_name.should == ''
  end
end

describe "Element#class_name=" do
  before do
    @div = Element <<-HTML
      <div id="set-class-name-spec">
        <div id="foo" class=""></div>
        <div id="bar" class="oranges"></div>

        <div id="baz" class="banana"></div>
        <div id="buz" class="banana"></div>
      </div>
    HTML

    @div.append_to_body
  end

  after do
    @div.remove
  end

  it "should set the given class name on the element" do
    Element('#foo').class_name = 'apples'
    Element('#foo').class_name.should == 'apples'
  end

  it "should replace any existing classname" do
    bar = Element '#bar'
    bar.class_name.should == 'oranges'

    bar.class_name = 'lemons'
    bar.class_name.should == 'lemons'
  end
end