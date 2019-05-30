# navigation-headers

This repo is just a demo on how to implement resources navigation using the [Link HttpHeader](https://www.w3.org/wiki/LinkHeader).

A very popular scenario is to display on the screen a table with navigation buttons.

In the source code, there is a web api (`/api`) and an Angular app (`/nav-header`).

## API
This is a very basic REST api that provides an edpoint to GET a list of products

The response of this call includes a particular header

`
link: 
</api/products?page=3&pageSize=2>; rel="next",</api/products?page=1&pageSize=2>; rel="prev",</api/products?page=1&pageSize=2>; rel="first",</api/products?page=4&pageSize=2>; rel="last" 
`

This contains the navigation information to deal with a paginated result set.

The specific message tells which is the link to get the `next` page, the `prev`ious page, the `first` page and the `last` page.

Note that, when the client gets the first or the last page, this header will contains only the valid navigation links for the current position. So, in the first page' result, there won't be the links to previous and first page. In the last page, there won't be the link to the next and last page.

## Angular App
This is the front-end. It's just an Angular app that render a single page with a grid that gets the data from the back-end api and, using the pagination links in the header, enable/disable the navigation buttons.

The element that takes care of the navigation logic is the product service.
This interface the grid with the api and knows how to navigate the data.
It reads the header links in the Http Response and provides methods to let the grid decide which navigation button to show.

To be able to inspect the **Link** header in Angular, some additional headers must be provided:
```javascript 
this.http.get<Product[]>(url, {
        observe: "response",
        headers: new HttpHeaders({ Accept: "application/json" })
      })
```
