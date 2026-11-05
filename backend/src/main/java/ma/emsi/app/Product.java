package ma.emsi.app;

import jakarta.persistence.*;
@Entity
public class Product {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 private String name;
 private java.math.BigDecimal price;
 private int quantity;
 private boolean selected;
 public Product() {}
 public Long getId(){return id;} public void setId(Long v){id=v;}
 public String getName(){return name;} public void setName(String v){name=v;}
 public java.math.BigDecimal getPrice(){return price;} public void setPrice(java.math.BigDecimal v){price=v;}
 public int getQuantity(){return quantity;} public void setQuantity(int v){quantity=v;}
 public boolean getSelected(){return selected;} public void setSelected(boolean v){selected=v;}
}
