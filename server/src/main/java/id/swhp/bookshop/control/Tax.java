package id.swhp.bookshop.control;

import java.math.BigDecimal;

/**
 *
 * @author Sukma Wardana
 * @since 1.0.0
 */
public class Tax {

    private static final BigDecimal PERCENTAGE_TAX;

    static {
        PERCENTAGE_TAX = new BigDecimal("0.10");
    }

    public BigDecimal priceWithTax(BigDecimal price, boolean isTaxIncluded) {
        if (isTaxIncluded) {
            return price;
        } else {
            BigDecimal tax = price.multiply(PERCENTAGE_TAX);
            return price.add(tax);
        }
    }

}
