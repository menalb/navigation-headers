using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace header_navigation.Products
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        [HttpGet(Name = "GetProducts")]
        public ActionResult<IEnumerable<Product>> Get(int? page = 1, int? pageSize = 5)
        {
            var links = BuildLinks(page.Value, pageSize.Value, Products.Count());
            Response.Headers.Add("Link", links);
            return Ok(Products.Skip((page.Value - 1) * pageSize.Value).Take(pageSize.Value));
        }

        private string BuildLinks(int currentPage, int pageSize, int itemsCount)
        {
            var pagesCount = Math.Ceiling((double)itemsCount / pageSize);
            var sb = new StringBuilder();
            var baseUrl = (Url.RouteUrl("GetProducts", new { }));
            if (currentPage != pagesCount)
            {
                sb.Append(BuildLink(baseUrl, currentPage + 1, pageSize, "next"));
                sb.Append(BuildLink(baseUrl, (int)pagesCount, pageSize, "last"));
            }
            if (currentPage != 1)
            {
                sb.Append(BuildLink(baseUrl, currentPage - 1, pageSize, "prev"));
                sb.Append(BuildLink(baseUrl, 1, pageSize, "first"));
            }
            return sb.ToString().TrimEnd(',');
        }
        private string BuildLink(string baseUrl, int page, int pageSize, string rel) =>
            $"<{baseUrl}?page={page}&pageSize={pageSize}>; rel=\"{rel}\",";

        private IEnumerable<Product> Products = new Product[]
        {
            new Product { Id = 1, Name = "Spaghetti", Code = "S001", Description = "Best Spaghetti" },
            new Product { Id = 2, Name = "Rigatoni", Code = "R001", Description = "Nice Rigatoni" },
            new Product { Id = 3, Name = "Orecchiette", Code = "O001", Description = "Tasty Orecchiette" },
            new Product { Id = 4, Name = "Fusilly", Code = "F001", Description = "Lovelly Fusilli" },
            new Product { Id = 5, Name = "Mezze Maniche", Code = "MM01", Description = "First class Mezze Maniche" },
            new Product { Id = 6, Name = "Penne", Code = "P001", Description = "Best Penne, ideal for Matriciana" },
            new Product { Id = 7, Name = "Farfalle", Code = "FF01", Description = "Butterfly Farfalle" },
            new Product { Id = 8, Name = "Sedanini", Code = "SS01", Description = "Sedanini rigati" },
        };
    }
}
