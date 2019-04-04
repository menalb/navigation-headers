namespace header_navigation.Pagination
{
    public class PaginationInfo
    {
        public PaginationInfo(int currentPage, int pageSize, int itemsCount)
        {
            CurrentPage = currentPage;
            PageSize = pageSize;
            ItemsCount = itemsCount;
        }
        public int CurrentPage { get; }
        public int PageSize { get; }
        public int ItemsCount { get; }
    }
}