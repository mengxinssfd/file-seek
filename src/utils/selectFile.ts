import CP from 'child_process';

/**
 * 打开文件所在文件夹并选中文件
 * @param {...string} paths 文件路径
 */
export function selectFile(...paths: string[]): void {
  paths.forEach((p) => {
    CP.spawnSync('explorer.exe', [`/select,${p}`], { shell: true });
    // cp.spawnSync('explorer.exe', [`/select`, p], { shell: true });
  });
}
