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
end