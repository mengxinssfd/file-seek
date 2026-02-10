import CP from 'child_process';

/**
 * 打开文件
 * @param {string} path 文件路径
 */
export function openFile(path: string): void {
  CP.spawnSync('explorer.exe', [path]);
}
