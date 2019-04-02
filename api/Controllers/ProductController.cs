using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace header_navigation.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        // GET api/values
        [HttpGet(Name = "GetProducts")]
        public ActionResult<IEnumerable<Product>> Get(int? page = 1, int? pageSize = 5)
        {
            var links = BuildLinks(page.Value, pageSize.Value, Products.Count());
            Response.Headers.Add("Link", links);
            return Ok(Products.Skip((page.Value - 1) * pageSize.Value).Take(pageSize.Value));
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

        private string BuildLinks(int currentPage, int pageSize, int itemsCount)
        {
            var pagesCount = Math.Ceiling((double)itemsCount / pageSize);
            var sb = new System.Text.StringBuilder();
            var baseUrl = (Url.RouteUrl("GetProducts", new { }));
            if (currentPage != pagesCount)
            {
                sb.Append($"<{baseUrl}?page={currentPage + 1}&pageSize={pageSize}>; rel=\"next\",");
                sb.Append($"<{baseUrl}?page={pagesCount}&pageSize={pageSize}>; rel=\"last\",");
            }
            if (currentPage != 1)
            {
                sb.Append($"<{baseUrl}?page={currentPage - 1}&pageSize={pageSize}>; rel=\"prev\",");
                sb.Append($"<{baseUrl}?page={1}&pageSize={pageSize}>; rel=\"first\",");
            }
            return sb.ToString().TrimEnd(',');
        }
    }
    public class Product
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
