using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using header_navigation.Pagination;

namespace header_navigation.Products
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        [HttpGet(Name = "GetProducts")]
        public ActionResult<IEnumerable<Product>> Get(int? page = 1, int? pageSize = 5) =>
             OkWithLinksHeader(
                Products.Skip((page.Value - 1) * pageSize.Value).Take(pageSize.Value),
                "GetProducts",
                new PaginationInfo(page.Value, pageSize.Value, Products.Count())
                );

        private ActionResult OkWithLinksHeader<T>(T content, string actionName, PaginationInfo paginationInfo)
        {
            Response.Headers.Add(
                "Link",
                new HeaderLinksBuilder(paginationInfo, Url.RouteUrl(actionName, new { })).Build()
                );
            return Ok(content);
        }

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
