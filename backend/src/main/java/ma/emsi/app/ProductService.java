package ma.emsi.app;

import org.springframework.stereotype.Service;
    import org.springframework.transaction.annotation.Transactional;
    import org.springframework.web.server.ResponseStatusException;
    import org.springframework.http.HttpStatus;
    import java.util.List;
    @Service @Transactional
    public class ProductService {
      private final ProductRepository repo;
      public ProductService(ProductRepository r){repo=r;}
      public List<Product> all(){return repo.findAll();}
      public Product get(Long id){return repo.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Product not found"));}
      public Product create(ProductRequest r){return apply(new Product(),r);}
      public Product update(Long id,ProductRequest r){return apply(get(id),r);}
      private Product apply(Product e,ProductRequest r){e.setName(r.name()); e.setPrice(r.price()); e.setQuantity(r.quantity()); e.setSelected(r.selected()); return repo.save(e);}
      public void delete(Long id){repo.delete(get(id));}
      public Product toggle(Long id){Product p=get(id);p.setSelected(!p.getSelected());return repo.save(p);}
    }
