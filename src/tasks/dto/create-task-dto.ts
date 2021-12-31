import { IsNotEmpty, isNotEmpty } from "class-validator";

export class CreateClassDto{
    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    description:string;
}