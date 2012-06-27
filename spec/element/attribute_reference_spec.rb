describe "Element#[]" do
  before do
    @div = DOM <<-HTML
      <div id="attribute-reference-spec">
        <div id="foo" title="Hello there!"></div>
        <div id="bar"></div>
        <div id="baz" title=""></div>

        <a id="href-test" href="foo.js"></a>
      </div>
    HTML

    @div.append_to_body
  end

  after do
    @div.remove
  end

  it "should retrieve the attr value from the element" do
    DOM('#foo')[:title].should == "Hello there!"
  end

  it "should return an empty string for an empty attribute value" do
    DOM('#bar')[:title].should == ""
    DOM('#baz')[:title].should == ""
  end

  it "should read 'href' attribute correctly" do
    DOM('#href-test')[:href].should == "foo.js"
  end
end