package com.yellow.ordermanageryellow.controller;
import com.yellow.ordermanageryellow.Dto.TopEmploeeyDTO;
import com.yellow.ordermanageryellow.service.GraphService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.Month;
import java.util.List;
import java.util.Map;
import com.yellow.ordermanageryellow.Dto.TopProductDTO;
import com.yellow.ordermanageryellow.Exception.NoDataException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/Graph")
public class GraphController {
    @Autowired
    private GraphService graphService;
    @GetMapping("/topEmploeey")
    public ResponseEntity topEmploeey(@RequestHeader("Authorization") String token) {
        try{
        return ResponseEntity.status(HttpStatus.OK).body( graphService.topEmployee(token));
        }
        catch(Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        }
    }
    @GetMapping("/topProduct")
    public ResponseEntity topProduct(@RequestHeader("Authorization") String token) {
        try {
            List<TopProductDTO> topProducts = graphService.topSoldProduct(token);
            return ResponseEntity.status(HttpStatus.OK).body(topProducts);
        } catch (NoDataException e) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @GetMapping("/statusOrder")
    public ResponseEntity getStatus(@RequestParam Integer monthAmount, @RequestHeader("Authorization") String token) {
        try {
            Map<Month, Map<Integer, Integer>> ordersMap = graphService.getStatus(monthAmount, token);
            return ResponseEntity.ok().body(ordersMap);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    }


