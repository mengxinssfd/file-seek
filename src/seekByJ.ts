import { runSeek } from './utils';
import Path from 'path';
import FS from 'fs';

// 命令： tsx src/seekByJ.ts 查找目标 深度查找(默认Y开启，输入任意为否)
// 需要在__json__/seekByJ.json添加目标文件夹，在文件夹多且不需要更改的时候使用

const [, , find$ = '', deep$ = 'Y'] = process.argv;

(function () {
  runSeek(getFolders(), find$, deep$ === 'Y');
})();

/**
 * 获取文件夹
 * @returns {string[]} 文件夹数组
 */
function getFolders(): string[] {
  const path = Path.resolve(__dirname, '../__json__/seekByJ.json');
  if (!FS.existsSync(path)) {
    throw new Error('不存在__json__/seekByJ.json文件');
  }
  const folders$ = FS.readFileSync(path, 'utf8');
  if (!folders$) {
    throw new Error('json文件内文件夹路径为空');
  }

  let folders: string[] = [];

  try {
    folders = JSON.parse(folders$);
  } catch {
    throw new Error('json文件内格式不正确');
  }

  folders = folders.map((v) => v.trim()).filter(Boolean);

  return folders;
}
