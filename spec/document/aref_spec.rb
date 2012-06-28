describe "Document.[]" do
  describe "when given an element id" do
    before do
      @div = Element.new <<-HTML
        <div id="document-aref-spec">
          <div id="foo" class="bar"></div>
        </div>
      HTML

      @div.append_to_body
    end

    after do
      @div.remove
    end

    it "should return a new Element wrapping native element" do
      Document['#foo'].class_name.should == 'bar'
    end

    it "should return nil when no element with id is found" do
      Document['#bad-id'].should be_nil
    end
  end

  describe "when given a generic CSS selector" do
    before do
      @div = Element.new <<-HTML
        <div id="aref-spec">
          <div id="foo" class="bar"></div>
          <div class="bar"></div>
          <p class="woosh"></p>
        </div>
      HTML

      @div.append_to_body
    end

    after do
      @div.remove
    end

    it "should return an array of all matching elements" do
      bar = Document['.bar']
      bar.should be_kind_of(Array)
      bar.size.should == 2

      woosh = Document['.woosh']
      woosh.size.should == 1
    end

    it "should return an empty array for no matching elements" do
      Document['.some_random_selector'].should == []
    end
  end
end