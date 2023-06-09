import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCreadentialDto {
    @IsString()
    @MinLength(2)
    @MaxLength(10)
    username: string;

    @IsString()
    @MinLength(2)
    @MaxLength(10)
    // 영어랑 숫자만 가능한 유효성 체크
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'password only accepts english and number'
    })
    password: string;
}