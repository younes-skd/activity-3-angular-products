package ma.emsi.app;

import jakarta.validation.constraints.*;
public record ProductRequest(@NotBlank String name, @NotNull @DecimalMin("0.0") java.math.BigDecimal price, @Min(0) int quantity, boolean selected) {}
