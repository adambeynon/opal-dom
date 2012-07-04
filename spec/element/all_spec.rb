describe "Element#all" do
  before do
    @div = Element.new <<-HTML
      <div id="all-spec">
        <div id="foo">
          <p class="foo"></p>
          <p class="bar"></p>
          <p id="woosh" class="foo"></p>
        </div>
      </div>
    HTML

    @div.append_to_body
  end

  after do
    @div.remove
  end

  it "should return an array of all matched elements in scope" do
    Document['#foo'].all('.foo').size.should == 2
    Document['#foo'].all('.bar').size.should == 1

    Document['#foo'].all('.foo').each { |a| a.should be_kind_of(Element) }
  end

  it "returns an empty array when no elements matching" do
    Document['#foo'].all('.kapow').should == []
  end
end