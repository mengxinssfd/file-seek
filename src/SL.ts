import { removeSync, copySync } from 'fs-extra';
import { spawnSync } from 'node:child_process';
import FS from 'fs';

// 用于给单机游戏save load
// tsx src/SL.ts 备份文件夹路径 新文件夹路径 游戏启动文件路径
const [, , from$, to$, exe$] = process.argv;

(function () {
  if (!from$) throw new Error('缺少备份文件夹路径');
  if (!to$) throw new Error('缺少新文件夹路径');
  if (!FS.existsSync(from$)) throw new Error('备份文件夹路径不存在');
  removeSync(to$);
  copySync(from$, to$);
  exe$ && spawnSync(exe$);
})();
