import { runSeek } from './utils';

// 命令： tsx src/seek.ts "文件夹1,文件夹2" 查找目标 深度查找(默认Y开启，输入任意为否)

const [, , folders$, find$ = '', deep$ = 'Y'] = process.argv;

(function () {
  runSeek(getFolders(), find$, deep$ === 'Y');
})();

/**
 * 获取文件夹
 * @returns {string[]} 文件夹数组
 */
function getFolders(): string[] {
  if (!folders$) throw new Error('缺少文件夹路径');

  const folders = folders$
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
  if (!folders.length) throw new Error('缺少文件夹路径');
  return folders;
}
