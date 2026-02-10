import Path from 'path';
import FS from 'fs';

/**
 * 深度查找
 * @param {string[]} folders 文件夹数组
 * @param {string} target 查找目标
 * @param {boolean} deep 是否深度查找
 * @returns {string[]} 查找结果
 */
export function seek(folders: string[], target: string, deep: boolean): string[] {
  const find = target.trim().toLowerCase();
  const dirs = folders.filter((f) => FS.existsSync(f));
  const result: string[] = [];
  while (dirs.length) {
    const dir = dirs.shift() as string;
    // accessSync根本预判不了readdirSync报错
    // FS.accessSync(dir, FS.constants.R_OK);
    const lc = Path.basename(dir).toLowerCase();
    if (lc.includes(find)) result.push(dir);
    if (deep && FS.statSync(dir).isDirectory()) {
      try {
        // readdirSync读取$RECYCLE.BIN这种文件就会出错
        const ls = FS.readdirSync(dir).map((d) => Path.resolve(dir, d));
        dirs.unshift(...ls);
      } catch {}
    }
  }
  return result;
}
