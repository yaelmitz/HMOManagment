package com.javatpoint.service;

import com.javatpoint.dto.HmoMemberDto;
import com.javatpoint.model.HmoMember;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-03-28T16:21:33+0200",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 1.8.0_111 (Oracle Corporation)"
)
@Component
public class MapStructMapperImpl implements MapStructMapper {

    @Override
    public List<HmoMemberDto> hmoMembersToDto(List<HmoMember> members) {
        if ( members == null ) {
            return null;
        }

        List<HmoMemberDto> list = new ArrayList<HmoMemberDto>( members.size() );
        for ( HmoMember hmoMember : members ) {
            try {
                list.add( hmoMemberToDto( hmoMember ) );
            }
            catch ( IOException e ) {
                throw new RuntimeException( e );
            }
        }

        return list;
    }
}
