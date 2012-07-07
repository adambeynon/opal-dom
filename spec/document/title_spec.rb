describe "Document#title" do
  it "should return the documents title" do
    Document.title.should be_kind_of(String)
  end
end

describe "Document#title=" do
  it "should set the document title to the given value" do
    old = Document.title
    Document.title = "foo"

    Document.title.should == "foo"
    Document.title = old
  end
end