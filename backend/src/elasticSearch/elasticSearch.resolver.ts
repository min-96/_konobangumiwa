import { Resolver,Query, Args } from "@nestjs/graphql";
import { MyElasticSearchService } from "./elasticSearch.service";

@Resolver()
export class MyElasticSearchResolver {

    constructor(private elasticService : MyElasticSearchService) {}

     @Query(()=> String)
    async settingAnalyzer() : Promise<any> {
        return this.elasticService.settingAnalyzer();
    }

    @Query(()=> String)
    async indexAnimation() : Promise<any> {
        return this.elasticService.indexAnimationList();
    }




}