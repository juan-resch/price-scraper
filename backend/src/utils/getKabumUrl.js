function getKabumUrl({
  query = "",
  page = 1,
  maxProducts = 100,
  category = "",
  isCategory = false,
}) {
  if (isCategory) {
    return `https://www.kabum.com.br/${category}?page_number=${page}&page_size=${maxProducts}&facet_filters=&sort=most_searched`;
  }
  return `https://www.kabum.com.br/busca/${query}?page_number=${page}&page_size=${maxProducts}&facet_filters=&sort=most_searched`;
}

export default getKabumUrl;
