package com.company.turbohireclone.backend.dto.HR;


import java.time.LocalTime;

import com.company.turbohireclone.backend.enums.SlotStatus;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HrSlotDto {
    private Long slotId;
    private LocalTime startTime;
    private LocalTime endTime;
    private SlotStatus slotStatus;
}


