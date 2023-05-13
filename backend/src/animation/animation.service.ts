import { Injectable } from "@nestjs/common";
import { Animation } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";


//export type AnimationWithGenres = Animation & { genreList: Genre[] };


@Injectable()
export class AnimationService{

    constructor(private prisma: PrismaService) {}

    async findAllAnimation(): Promise<Animation[]> {
        return this.prisma.animation.findMany();
      }
}