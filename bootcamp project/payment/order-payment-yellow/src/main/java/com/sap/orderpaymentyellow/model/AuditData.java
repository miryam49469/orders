package com.sap.orderpaymentyellow.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@SuperBuilder(toBuilder = true)
public class AuditData {
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    public AuditData(LocalDateTime createDate) {
        this.createDate = createDate;
    }
}
