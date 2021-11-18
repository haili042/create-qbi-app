// @ts-ignore
import * as InquirerList from 'inquirer/lib/prompts/list';

export class DescList extends InquirerList {
  render() {
    const originScreen = this.screen;
    const originScreenRender = this.screen.render;

    this.screen.render = (message: string, bottomContent: string) => {
      const currentSelected = this.opt.choices.getChoice(this.selected);

      originScreenRender.call(
        originScreen,
        message,
        (currentSelected as any).description ||
          currentSelected.name ||
          currentSelected,
      );
    };
    super.render();
  }
}
