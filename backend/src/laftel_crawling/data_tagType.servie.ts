import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";

interface Tag {
    tags: string[];
  }

@Injectable()
export class CrawlingTagTypeService{
    constructor(private prisma: PrismaService) {} 

    async createTagType(tagList): Promise<void> {
        
        const selectTagType = await this.prisma.tagType.findMany({
            select: {
                type: true,
              },
        });


        let befTagArray : Array<string> = selectTagType.map((ele) => (ele.type));  // 장르를 셀렉트 해와서 어레이로 담기 
        let addTagArray : Array<string> = []; 

            tagList.forEach(tag => {
              if (!befTagArray.includes(tag) && !addTagArray.includes(tag)) {
                addTagArray.push(tag);
              }
            });

      
          for (const tagType of addTagArray) {
            await this.prisma.tagType.create({
              data: {
                type: tagType,
              },
            });
          }
        }

        async createTag(animationId: number, tagList: string[],prisma): Promise<void> {
          const tagPromises = tagList.map((tag) =>
            prisma.tag.create({
              data: {
                animationId: animationId,
                tagtypeId: tag,
              },
            })
          );
        
          await Promise.all(tagPromises);
        }
        
        
      }