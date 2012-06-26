describe "DOM#class_name" do
  before do
    @div = DOM <<-HTML
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

  it "should return the DOMs' classname" do
    DOM('#foo').class_name.should == 'whiskey'
    DOM('#bar').class_name.should == 'scotch brandy'
  end

  it "should return an empty string for DOMs with no classname" do
    DOM('#baz').class_name.should == ''
    DOM('#buz').class_name.should == ''
  end

  it "should return classname of first element if length > 1" do
    DOM('.red').class_name.should == 'red dark'
  end

  it "should return an empty string when length == 0" do
    DOM('.no-elements').class_name.should == ''
  end
end

describe "DOM#class_name=" do
  before do
    @div = DOM <<-HTML
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

  it "should set the given class name on the DOM" do
    DOM('#foo').class_name = 'apples'
    DOM('#foo').class_name.should == 'apples'
  end

  it "should replace any existing classname" do
    bar = DOM '#bar'
    bar.class_name.should == 'oranges'

    bar.class_name = 'lemons'
    bar.class_name.should == 'lemons'
  end

  it "should set the classname on all elements in instance" do
    el = DOM '.banana'
    el.size.should == 2

    el.class_name = 'pop'

    DOM('#baz').class_name.should == 'pop'
    DOM('#buz').class_name.should == 'pop'
  end
end