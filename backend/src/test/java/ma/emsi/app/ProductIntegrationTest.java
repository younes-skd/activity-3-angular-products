package ma.emsi.app;

import org.junit.jupiter.api.Test;
    import org.springframework.boot.test.context.SpringBootTest;
    import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.test.web.servlet.MockMvc;
    import org.springframework.http.MediaType;
    import com.fasterxml.jackson.databind.ObjectMapper;
    import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
    import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
    @SpringBootTest(properties={"spring.cloud.config.enabled=false","eureka.client.enabled=false"}) @AutoConfigureMockMvc
    class ProductIntegrationTest {
     @Autowired MockMvc mvc; @Autowired ObjectMapper json;
     @Test void createReadUpdateDelete() throws Exception {
      String body="{\"name\": \"Test produit\", \"price\": 99.5, \"quantity\": 5, \"selected\": false}";
      var res=mvc.perform(post("/products").contentType(MediaType.APPLICATION_JSON).content(body)).andExpect(status().isCreated()).andReturn();
      long id=json.readTree(res.getResponse().getContentAsString()).get("id").asLong();
      mvc.perform(get("/products/"+id)).andExpect(jsonPath("$.name").value("Test produit"));
      mvc.perform(put("/products/"+id).contentType(MediaType.APPLICATION_JSON).content(body.replace("Test produit","Updated"))).andExpect(jsonPath("$.name").value("Updated"));
      mvc.perform(patch("/products/"+id+"/selection")).andExpect(jsonPath("$.selected").value(true));
      mvc.perform(delete("/products/"+id)).andExpect(status().isNoContent());
      mvc.perform(get("/products/"+id)).andExpect(status().isNotFound());
     }
     @Test void invalidRequestAndCors() throws Exception {
      mvc.perform(post("/products").contentType(MediaType.APPLICATION_JSON).content("{}")).andExpect(status().isBadRequest());
      mvc.perform(options("/products").header("Origin","http://localhost:4200").header("Access-Control-Request-Method","GET")).andExpect(header().string("Access-Control-Allow-Origin","http://localhost:4200"));
     }
    }
