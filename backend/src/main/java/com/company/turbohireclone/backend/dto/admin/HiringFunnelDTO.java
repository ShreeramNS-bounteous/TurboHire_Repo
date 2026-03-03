package com.company.turbohireclone.backend.dto.admin;


import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HiringFunnelDTO {

    private List<StageCountDTO> stages;

}