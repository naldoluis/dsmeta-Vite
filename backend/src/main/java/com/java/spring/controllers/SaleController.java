package com.java.spring.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.java.spring.entities.Sale;
import com.java.spring.services.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
//import com.java.spring.services.SmsService;

@RestController
@RequestMapping(value = "/sales")
public class SaleController {

    @Autowired
    private SaleService service;

//  @Autowired
//  private SmsService smsService;
    
    @GetMapping
    public Page<Sale> findSales(
        @RequestParam(value="minDate", defaultValue = "") String minDate,
        @RequestParam(value="maxDate", defaultValue = "") String maxDate,
        Pageable pageable) {
        return service.findSales(minDate, maxDate, pageable);
    }

//   @GetMapping("/notification")
//   public void notifySms() {
//      smsService.sendSms();
//   }
}