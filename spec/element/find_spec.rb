describe "Element#find" do
  before do
    @div = Element.new <<-HTML
      <div id="find-spec">
        <div id="foo">
          <p id="bar" class="wow"></p>
          <p class="wow"></p>
        </div>
      </div>
    HTML

    @div.append_to_body
  end

  after do
    @div.remove
  end

  it "should return the first element matching selector" do
    Document['#foo'].find('.wow').id.should == 'bar'
  end

  it "should return nil when no elements are found matching selector" do
    Document['#foo'].find('.zomg').should be_nil
  end
end