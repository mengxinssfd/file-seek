/* eslint-disable no-console */
import { operateFile, seek } from './utils';
import chalk from 'chalk';

// 命令： tsx src/seek.ts "文件夹1,文件夹2" 查找目标 深度查找(默认Y开启，输入任意为否)

const [, , folders$, find$, deep$ = 'Y'] = process.argv;

(function () {
  const deep = deep$ === 'Y';
  console.log(
    '-'.repeat(10),
    '已',
    deep ? chalk.green('开启') : chalk.red('关闭'),
    '深度查找',
    '-'.repeat(10),
  );

  if (!folders$) {
    console.error(chalk.red('缺少文件夹路径'));
    return;
  }

  const folders = folders$
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
  if (!folders.length) {
    console.error(chalk.red('缺少文件夹路径'));
    return;
  }

  if (!find$) {
    console.error(chalk.red('无搜索内容'));
    return;
  }

  console.log('在以下文件夹: ');
  console.log(chalk.magenta(folders.join('\n')));
  console.log('搜索：', chalk.cyan(find$));
  console.log('='.repeat(10), '搜索中...', '='.repeat(10));

  const result = seek(folders, find$, deep);
  if (!result.length) {
    console.log('未搜索到目标');
    return;
  }

  console.log(chalk.cyan(result.join('\n')));
  console.log('*'.repeat(10), `搜索到以上${chalk.cyan(result.length)}个结果`, '*'.repeat(10));

  operateFile(result);
})();
