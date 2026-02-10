import { prompt } from 'enquirer';

/**
 * 选择文件
 * @param {string[]} files 文件路径数组
 * @returns {Promise<string[]>} 选中的文件数组
 */
export async function selectFilesInConsole(files: string[]): Promise<string[]> {
  const question: Parameters<typeof prompt>[0] = {
    message: '选择文件(多选，箭头移动光标，空格键选中，回车键确定)',
    type: 'multiselect',
    choices: files,
    name: 'files',
  };
  const answer = await prompt(question);
  return (answer as { files: string[] }).files;
}
