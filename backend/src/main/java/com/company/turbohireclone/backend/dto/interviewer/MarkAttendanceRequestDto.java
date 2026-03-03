package com.company.turbohireclone.backend.dto.interviewer;

import com.company.turbohireclone.backend.enums.AttendanceStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MarkAttendanceRequestDto {

    private AttendanceStatus attendanceStatus;

}

