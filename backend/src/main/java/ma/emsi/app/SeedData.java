package ma.emsi.app;

import org.springframework.context.annotation.*;
import org.springframework.boot.CommandLineRunner;
@Configuration
public class SeedData { @Bean CommandLineRunner seed(ProductService s){return args->{s.create(new ProductRequest("Ordinateur Portable",new java.math.BigDecimal("1300"),10,true));s.create(new ProductRequest("Imprimante Multifonction",new java.math.BigDecimal("300"),15,false));s.create(new ProductRequest("Smartphone 5G",new java.math.BigDecimal("800"),20,true));};} }
