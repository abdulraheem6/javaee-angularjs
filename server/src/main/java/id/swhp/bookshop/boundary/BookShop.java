package id.swhp.bookshop.boundary;

import id.swhp.bookshop.control.Tax;
import id.swhp.bookshop.entity.Book;
import java.net.URI;
import java.util.List;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author Sukma Wardana
 * @since 1.0.0
 */
@Stateless
public class BookShop {

    @PersistenceContext
    EntityManager em;

    @Inject
    Tax tax;

    public List<Book> findAllBook() {
        return this.em.createNamedQuery(Book.FIND_ALL, Book.class).getResultList();
    }

    public Book findBySlug(String slug) {
        return this.em.createNamedQuery(Book.FIND_BY_SLUG, Book.class)
                .setParameter("slug", slug).getSingleResult();
    }

    public void addBookStock(Book book) {
        this.em.persist(book);
    }

    public void updateBook(String slug, Book book) {
        /**
         * Make sure to set the ID of the book, or JPA will perform insert
         * rather than update.
         */
        Book b = findBySlug(slug);
        book.setId(b.getId());
        this.em.merge(book);
    }

    public void remove(String title) {
        final Book managedBook = findBySlug(title);

        this.em.remove(managedBook);
    }

    public JsonObject checkOrder(String slug, URI self) {
        Book book = findBySlug(slug);
        return Json.createObjectBuilder()
                .add("isbn", book.getIsbn())
                .add("title", book.getTitle())
                .add("price", book.getPrice())
                .add("actual_price", tax.priceWithTax(book.getPrice(), book.getTaxIncluded()))
                .add("tax_included", book.getTaxIncluded())
                .add("_links", Json.createObjectBuilder()
                        .add("rel", "self")
                        .add("href", self.toString())
                ).build();
    }
}
