package com.javatpoint.service;

import com.javatpoint.dto.HmoMemberDto;
import com.javatpoint.model.HmoMember;
import org.mapstruct.Mapper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;

@Mapper(componentModel = "spring")
public interface MapStructMapper {
    List<HmoMemberDto> hmoMembersToDto(List<HmoMember> members);
//    List<HmoMember> DtoTohmoMembers(List<HmoMemberDto> members);

    default HmoMemberDto hmoMemberToDto(HmoMember h) throws IOException {
        HmoMemberDto hmoMemberDto = new HmoMemberDto();
        hmoMemberDto.setId(h.getId());
        hmoMemberDto.setFirstName(h.getFirstName());
        hmoMemberDto.setLastName(h.getLastName());
        hmoMemberDto.setDateOfBirth(h.getDateOfBirth());
        hmoMemberDto.setCity(h.getCity());
        hmoMemberDto.setStreet(h.getStreet());
        hmoMemberDto.setBuildingNumber(h.getBuildingNumber());
        hmoMemberDto.setPhone(h.getPhone());
        hmoMemberDto.setMobilePhone(h.getMobilePhone());
        hmoMemberDto.setImage(h.getImage());
        hmoMemberDto.setCoronaDetails(h.getCoronaDetails());
        Path filename = Paths.get(h.getImage());
        //הופך את התמונה למערך של ביטים base64-שזה יותר קל
        byte[] byteImage = Files.readAllBytes(filename);
        hmoMemberDto.setImage(Base64.getEncoder().encodeToString(byteImage));
        return hmoMemberDto;
    }

        default HmoMember dtoToHmoMember(HmoMemberDto h) throws IOException {
            HmoMember hmoMember=new HmoMember();
            hmoMember.setId(h.getId());
            hmoMember.setFirstName(h.getFirstName());
            hmoMember.setLastName(h.getLastName());
            hmoMember.setDateOfBirth(h.getDateOfBirth());
            hmoMember.setCity(h.getCity());
            hmoMember.setStreet(h.getStreet());
            hmoMember.setBuildingNumber(h.getBuildingNumber());
            hmoMember.setPhone(h.getPhone());
            hmoMember.setMobilePhone(h.getMobilePhone());
            hmoMember.setImage(h.getImage());
            hmoMember.setCoronaDetails(h.getCoronaDetails());
            return hmoMember;
}
}
