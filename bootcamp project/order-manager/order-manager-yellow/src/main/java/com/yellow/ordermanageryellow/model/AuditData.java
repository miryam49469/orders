package com.yellow.ordermanageryellow.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@SuperBuilder(toBuilder = true)
public class AuditData {
    //@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    public AuditData(LocalDateTime createDate) {
        this.createDate = createDate;
    }
}
