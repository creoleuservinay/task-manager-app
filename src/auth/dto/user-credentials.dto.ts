import { IsString, isString, Matches, MaxLength, maxLength, MinLength, minLength } from "class-validator";

export class AuthCredentialDto{
    @IsString()
    @MinLength(4)
    @MaxLength(8)
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Please choose strong password'
    })
    password: string;
}