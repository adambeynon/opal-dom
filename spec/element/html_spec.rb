describe "Element#html" do
  before do
    @div = Element.new <<-HTML
      <div id="html-spec">
        <div id="foo">Hey there</div>
        <div id="bar"><p>Erm</p></div>

        <div class="bridge">Hello</div>
        <div class="bridge">Hello as well</div>
      </div>
    HTML

    @div.append_to_body
  end

  after do
    @div.remove
  end

  it "should return the html content of the Element" do
    Document['#foo'].html.should == "Hey there"
    Document['#bar'].html.should == "<p>Erm</p>"
  end
end