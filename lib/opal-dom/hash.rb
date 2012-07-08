class Hash
  def to_query_string
    %x{
      var result = [], map = this.map, bucket;

      for (var assoc in map) {
        bucket = map[assoc];
        result.push(bucket[0] + '=' + encodeURIComponent(bucket[1]));
      }

      return result.join('&');
    }
  end
end