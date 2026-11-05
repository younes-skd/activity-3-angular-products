package ma.emsi.app;

import org.springframework.web.bind.annotation.*;
    import org.springframework.http.HttpStatus;
    import jakarta.validation.Valid;
    import java.util.List;
    @RestController @RequestMapping("/products") @CrossOrigin(origins="http://localhost:4200")
    public class ProductController {
      private final ProductService service;
      public ProductController(ProductService s){service=s;}
      @GetMapping public List<Product> all(){return service.all();}
      @GetMapping("/{id}") public Product get(@PathVariable Long id){return service.get(id);}
      @PostMapping @ResponseStatus(HttpStatus.CREATED) public Product create(@Valid @RequestBody ProductRequest r){return service.create(r);}
      @PutMapping("/{id}") public Product update(@PathVariable Long id,@Valid @RequestBody ProductRequest r){return service.update(id,r);}
      @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id){service.delete(id);}
      @PatchMapping("/{id}/selection") public Product toggle(@PathVariable Long id){return service.toggle(id);}
    }
