import { NgModule } from '@angular/core';
import { TitleCasePipe } from './../pipes/title-case/title-case';
@NgModule({
    declarations: [TitleCasePipe],
    imports: [],
    exports: [TitleCasePipe]
})
export class PipesModule {}
