/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.swhp.bookshop.boundary;

import id.swhp.bookshop.entity.Book;
import java.net.URI;
import java.util.List;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

/**
 *
 * @author Sukma Wardana
 * @since 1.0.0
 */
@Stateless
@Path("books")
@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
public class BookResources {

    @Context
    UriInfo uriInfo;

    @Inject
    BookShop bookShop;

    @GET
    public Response allBooks() {
        List<Book> all = this.bookShop.findAllBook();

        if (all == null || all.isEmpty()) {
            return Response.noContent().build();
        }

        JsonArray data = all.stream()
                .map(this::toJson)
                .collect(
                        Json::createArrayBuilder,
                        JsonArrayBuilder::add,
                        JsonArrayBuilder::add
                ).build();

        return Response.ok().entity(data).build();
    }

    @GET
    @Path("{slug}")
    public Response findBySlug(@PathParam("slug") final String slug) {
        Book book = this.bookShop.findBySlug(slug);

        if (book == null) {
            return Response.noContent().build();
        }

        return Response.ok().entity(toJson(book)).build();
    }

    @POST
    public Response create(@Valid Book book) {
        this.bookShop.addBookStock(book);

        URI self = uriBuilder(book.getSlug());
        
        return Response.created(self).build();
    }

    @PUT
    @Path("{slug}")
    public Response update(@PathParam("slug") final String slug, @Valid Book book) {
        URI self = uriBuilder(slug);

        this.bookShop.updateBook(slug, book);

        return Response.accepted().build();
    }

    @DELETE
    @Path("{slug}")
    public Response remove(@PathParam("slug") final String slug) {
        this.bookShop.remove(slug);

        return Response.ok().build();
    }

    private JsonObject toJson(Book book) {
        URI self = uriBuilder(book.getSlug());

        return Json.createObjectBuilder()
                .add("isbn", book.getIsbn())
                .add("title", book.getTitle())
                .add("price", book.getPrice())
                .add("summary", book.getSummary())
                .add("stock", book.getStock())
                .add("tax_included", book.getTaxIncluded())
                .add("slug", book.getSlug())
                .add("_links", Json.createObjectBuilder()
                        .add("rel", "self")
                        .add("href", self.toString())
                ).build();
    }

    private URI uriBuilder(String slug) {
        return this.uriInfo.getBaseUriBuilder().path(BookResources.class)
                .path(BookResources.class, "findBySlug").build(slug);
    }
}
