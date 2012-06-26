describe "Element#add_class" do
  before do
    @div = Element <<-HTML
      <div id="add-class-spec">
        <div id="foo" class="apples"></div>
        <div id="bar"></div>
        <div id="baz" class="lemons bananas"></div>
        <div id="buz" class="mangos"></div>

        <div id="lunch" class="pie beef"></div>
        <div id="dinner" class="pie chicken"></div>
      </div>
    HTML

    @div.append_to_body
  end

  after do
    @div.remove
  end

  it "should add the given classname onto the element" do
    foo = Element('#foo')
    foo.class_name.should == 'apples'
    foo.add_class 'oranges'
    foo.class_name.should == 'apples oranges'

    bar = Element('#bar')
    bar.class_name.should == ''
    bar.add_class 'pineapples'
    bar.class_name.should == 'pineapples'
  end

  it "should not add the classname if the element already has it" do
    baz = Element '#baz'
    baz.add_class 'lemons'
    baz.class_name.should == 'lemons bananas'

    baz.add_class 'bananas'
    baz.class_name.should == 'lemons bananas'

    baz.add_class 'grapes'
    baz.class_name.should == 'lemons bananas grapes'

    buz = Element '#buz'
    buz.add_class 'mangos'
    buz.class_name.should == 'mangos'

    buz.add_class 'melons'
    buz.class_name.should == 'mangos melons'
  end

  it "should return self" do
    spec = Element '#add-class-spec'
    spec.add_class('wow').should == spec
  end
end