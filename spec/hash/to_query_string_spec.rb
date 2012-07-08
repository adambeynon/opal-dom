describe "Hash#to_query_string" do
  it "should return the query string with simple values" do
    {}.to_query_string.should == ""
    {foo: 42}.to_query_string.should == "foo=42"
    {foo: "woosh", bar: "kapow"}.to_query_string.should == "foo=woosh&bar=kapow"
  end
end