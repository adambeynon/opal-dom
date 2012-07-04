describe "Element#value" do
  before do
    @div = Element.new <<-HTML
      <div id="value-spec">
        <input type="text" id="foo" value="apples">
        <button id="my-button" value="oranges">
        <textarea id="my-textarea">Hello World</textarea>
      </div>
    HTML

    @div.append_to_body
  end

  after do
    @div.remove
  end

  it "should return the value for a text input" do
    Document['#foo'].value.should == "apples"
  end

  it "should return the value for a button" do
    Document['#my-button'].value.should == "oranges"
  end

  it "should return the value for a textarea" do
    Document['#my-textarea'].value.should == "Hello World"
  end
end