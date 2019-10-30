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
                Products.GetAll().Skip((page.Value - 1) * pageSize.Value).Take(pageSize.Value),
                "GetProducts",
                new PaginationInfo(page.Value, pageSize.Value, Products.GetAll().Count())
                );

        [HttpPost(Name = "AddProduct")]
        public ActionResult Add(Product product)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            if (CheckDuplicate(product.Name))
                return Conflict();
            Products.Add(product);
            return Ok();
        }

        private bool CheckDuplicate(string productName)
        {
            return Products.GetAll().Any(p => p.Name.Equals(productName, StringComparison.InvariantCultureIgnoreCase));
        }
        private ActionResult OkWithLinksHeader<T>(T content, string actionName, PaginationInfo paginationInfo)
        {
            Response.Headers.Add(
                "Link",
                new HeaderLinksBuilder(paginationInfo, Url.RouteUrl(actionName, new { })).Build()
                );
            return Ok(content);
        }


    }
}
