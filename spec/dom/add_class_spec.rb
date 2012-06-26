describe "DOM#add_class" do
  before do
    @div = DOM <<-HTML
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
    foo = DOM('#foo')
    foo.class_name.should == 'apples'
    foo.add_class 'oranges'
    foo.class_name.should == 'apples oranges'

    bar = DOM('#bar')
    bar.class_name.should == ''
    bar.add_class 'pineapples'
    bar.class_name.should == 'pineapples'
  end

  it "should not add the classname if the element already has it" do
    baz = DOM '#baz'
    baz.add_class 'lemons'
    baz.class_name.should == 'lemons bananas'

    baz.add_class 'bananas'
    baz.class_name.should == 'lemons bananas'

    baz.add_class 'grapes'
    baz.class_name.should == 'lemons bananas grapes'

    buz = DOM '#buz'
    buz.add_class 'mangos'
    buz.class_name.should == 'mangos'

    buz.add_class 'melons'
    buz.class_name.should == 'mangos melons'
  end

  it "should return self" do
    spec = DOM '#add-class-spec'
    spec.add_class('wow').should == spec
  end

  it "should add the class name to each element in the collection" do
    pies = DOM '.pie'
    pies.size.should == 2

    pies.add_class 'eaten'

    DOM('#lunch').has_class?('eaten').should be_true
    DOM('#dinner').has_class?('eaten').should be_true
  end
end