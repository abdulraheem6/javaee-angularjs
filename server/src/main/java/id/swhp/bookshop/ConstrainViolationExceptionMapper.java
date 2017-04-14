package id.swhp.bookshop;

import java.util.stream.Collectors;
import javax.json.Json;
import javax.json.JsonObject;
import javax.validation.ConstraintViolationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

/**
 * Global exception for JAX-RS validation, returned response with message failed
 * and the put the exception message transfered via extended HTTP header.
 *
 * @author Sukma Wardana
 * @since 1.0.0
 */
@Provider
public class ConstrainViolationExceptionMapper implements ExceptionMapper<ConstraintViolationException> {

    @Override
    public Response toResponse(ConstraintViolationException exception) {
        final JsonObject response = Json.createObjectBuilder()
                .add("message", "Failed...").build();
        
        final String message = exception.getConstraintViolations().stream()
                .map(v -> v.getPropertyPath() + ": " + v.getMessage())
                .collect(Collectors.joining(", "));

        return Response.status(Response.Status.BAD_REQUEST)
                .header("X-Validation-Error", message)
                .entity(response)
                .build();
    }

}
