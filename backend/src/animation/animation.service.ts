import { Injectable } from "@nestjs/common";
import { Animation ,Genre } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";
import { SourceTextModule } from "vm";

//export type AnimationWithGenres = Animation & { genreList: Genre[] };


@Injectable()
export class AnimationService{

    constructor(private prisma: PrismaService) {}

   
}