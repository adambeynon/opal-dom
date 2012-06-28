describe "Element#text" do
  before do
    @div = Element.new <<-HTML
      <div id="text-spec">
        <div id="foo">Hey there</div>
        <div id="bar"></div>
        <div id="baz"><p>Hey </p>over<span> there</span></div>
      </div>
    HTML

    @div.append_to_body
  end

  after do
    @div.remove
  end

  it "should return the text content for simple Element nodes" do
    Document['#foo'].text.should == "Hey there"
  end

  it "should return an empty string when no text content" do
    Document['#bar'].text.should == ''
  end

  it "should return the text content from multiple child nodes" do
    Document['#baz'].text.should == "Hey over there"
  end
end

describe "Element#text=" do
  before do
    @div = Element.new <<-HTML
      <div id="set-text-spec">
        <div id="foo"></div>
        <div id="bar">woosh</div>
        <div id="baz"></div>
      </div>
    HTML

    @div.append_to_body
  end

  after do
    @div.remove
  end

  it "should set simple text contents on Elements" do
    foo = Document['#foo']
    foo.text = "Hello world"
    foo.text.should == "Hello world"
  end

  it "should replace any current content in the Element" do
    bar = Document['#bar']
    bar.text.should == "woosh"
    bar.text = "kapow"
    bar.text.should == "kapow"
  end

  it "should escape contents correctly" do
    baz = Document['#baz']
    baz.text = "<div><p>lol</p></div>"
    baz.text.should == "<div><p>lol</p></div>"
  end
end