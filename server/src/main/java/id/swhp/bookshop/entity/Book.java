package id.swhp.bookshop.entity;

import java.math.BigDecimal;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Sukma Wardana
 * @since 1.0.0
 */
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
@Entity()
@Table(
    name = "book",
    uniqueConstraints = {
        @UniqueConstraint(
            columnNames = {"isbn", "title"}
        )
    }
)
@NamedQueries({
    @NamedQuery(name = Book.FIND_ALL, query = "select b from Book b"),
    @NamedQuery(name = Book.FIND_BY_SLUG, query = "select b from Book b "
            + "where b.slug = :slug")
})
public class Book {

    public static final String FIND_ALL = "Book.FindAll";
    public static final String FIND_BY_SLUG = "Book.FindByTitle";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 1, max = 100)
    private String isbn;

    @NotNull
    private String title;
    
    @XmlTransient
    private String slug;

    @NotNull
    private String summary;

    @NotNull
    private BigDecimal price;

    @NotNull
    @XmlElement(name = "tax_included")
    private Boolean taxIncluded;

    @NotNull
    private Long stock;

    public Book() {
    }

    public Book(Long id, String isbn, String title, String summary, BigDecimal price, Boolean taxIncluded, Long stock) {
        this.id = id;
        this.isbn = isbn;
        this.title = title;
        this.summary = summary;
        this.price = price;
        this.taxIncluded = taxIncluded;
        this.stock = stock;
    }
    
    /**
     * Automatically generate slug from title which is replace space with dash
     * and make string to lower case.
     */
    @PrePersist
    @PreUpdate
    public void generateSlug() {
        this.slug = this.title.replaceAll(" ", "-").toLowerCase();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Boolean getTaxIncluded() {
        return taxIncluded;
    }

    public void setTaxIncluded(Boolean taxIncluded) {
        this.taxIncluded = taxIncluded;
    }

    public Long getStock() {
        return stock;
    }

    public void setStock(Long stock) {
        this.stock = stock;
    }

    @Override
    public String toString() {
        return "Book{"
                + "id=" + id
                + ", isbn=" + isbn
                + ", title=" + title
                + ", summary=" + summary
                + ", price=" + price
                + ", taxIncluded="
                + taxIncluded + ", stock="
                + stock + '}';
    }
}
