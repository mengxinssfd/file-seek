import { selectFilesInConsole } from './selectFilesInConsole';
import { selectFile } from './selectFile';
import { openFile } from './openFile';
import { prompt } from 'enquirer';

/**
 * 文件操作
 * @param {string[]} files 文件路径列表
 * @param {boolean} removeSelect 是否移除文件选择选项，默认为false
 */
export function operateFile(files: string[], removeSelect: boolean = false): void {
  enum Options {
    EXPLORER = '在文件夹打开全部',
    OPEN_ALL = '打开全部',
    SELECT = '选择文件',
    EXIT = '退出',
  }
  const question: Parameters<typeof prompt>[0] = {
    choices: removeSelect
      ? [Options.OPEN_ALL, Options.EXPLORER, Options.EXIT]
      : [Options.OPEN_ALL, Options.EXPLORER, Options.SELECT, Options.EXIT],
    name: 'operation',
    type: 'select',
    message: '操作',
    initial: 0,
  };
  prompt(question)
    .then((answer) => {
      const { operation } = answer as { operation: Options };
      switch (operation) {
        case Options.OPEN_ALL:
          files.forEach((item) => openFile(item));
          break;
        case Options.EXPLORER:
          files.forEach((item) => selectFile(item));
          break;
        case Options.SELECT:
          selectFilesInConsole(files).then((files) => {
            if (files.length) operateFile(files, true);
          });
          break;
        case Options.EXIT:
          break;
      }
    })
    .catch(console.error);
}
