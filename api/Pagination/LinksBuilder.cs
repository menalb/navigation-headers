using System;
using System.Text;

namespace header_navigation.Pagination
{
    public class HeaderLinksBuilder
    {
        private readonly PaginationInfo _paginationInfo;
        private string _actionLink;
        private readonly int _pagesCount;

        public HeaderLinksBuilder(PaginationInfo paginationInfo, string actionLink)
        {
            _paginationInfo = paginationInfo;
            _actionLink = actionLink;
            _pagesCount = (int)Math.Ceiling((double)_paginationInfo.ItemsCount / _paginationInfo.PageSize);
        }
        public string Build()
        {
            var sb = new StringBuilder();
            if (_paginationInfo.CurrentPage != _pagesCount)
            {
                sb.Append(BuildNext());
                sb.Append(BuildLast());
            }
            if (_paginationInfo.CurrentPage != 1)
            {
                sb.Append(BuildPrev());
                sb.Append(BuildFirst());
            }
            return sb.ToString().TrimEnd(',');
        }

        private string BuildNext() =>
            BuildLink(_actionLink, _paginationInfo.CurrentPage + 1, _paginationInfo.PageSize, "next");

        private string BuildPrev() =>
            BuildLink(_actionLink, _paginationInfo.CurrentPage - 1, _paginationInfo.PageSize, "prev");

        private string BuildLast() =>
            BuildLink(_actionLink, _pagesCount, _paginationInfo.PageSize, "last");

        private string BuildFirst() =>
            BuildLink(_actionLink, 1, _paginationInfo.PageSize, "first");

        private static string BuildLink(string baseUrl, int page, int pageSize, string rel) =>
               $"<{baseUrl}?page={page}&pageSize={pageSize}>; rel=\"{rel}\",";

    }
}