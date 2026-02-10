/* eslint-disable no-console */
import { operateFile } from './operateFile';
import { seek } from './seek';
import chalk from 'chalk';

/**
 * @param {string[]} folders 要搜索的文件夹
 * @param {string} target 搜索目标
 * @param {boolean} deep 深度搜索
 */
export function runSeek(folders: string[], target: string, deep: boolean): void {
  if (!target) throw new Error('无搜索内容');

  console.log(
    '-'.repeat(10),
    '已',
    deep ? chalk.green('开启') : chalk.red('关闭'),
    '深度查找',
    '-'.repeat(10),
  );

  console.log('在以下文件夹: ');
  console.log(chalk.magenta(folders.join('\n')));
  console.log('搜索：', chalk.cyan(target));
  console.log('='.repeat(10), '搜索中...', '='.repeat(10));

  const result = seek(folders, target, deep);
  if (!result.length) {
    console.log('未搜索到目标');
    return;
  }

  console.log(chalk.cyan(result.join('\n')));
  console.log('*'.repeat(10), `搜索到以上${chalk.cyan(result.length)}个结果`, '*'.repeat(10));

  operateFile(result);
}
