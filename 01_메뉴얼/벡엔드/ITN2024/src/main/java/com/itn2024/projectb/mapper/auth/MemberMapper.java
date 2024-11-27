package com.itn2024.projectb.mapper.auth;

import com.itn2024.projectb.vo.auth.Member;
import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;


@Mapper
public interface MemberMapper {
    public Optional<Member> selectMember(String email);
}
