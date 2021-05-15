/*
 * @Author: duanguang
 * @Date: 2021-05-15 16:51:08
 * @LastEditTime: 2021-05-15 20:35:11
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-echarts/tests/cwebp.js
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
const { spawn } = require('child_process');
const src = '/Users/duanguang/Documents/Front-End/legions/legions-design-element/packages/legions-pro-design/src/examples/assets/images/containers/ChMkKmCcnN2INzJBAATXBEkTqDoAAOv9gGHxKgABNcc744.jpg';
const root='/Users/duanguang/Documents/Front-End/legions/legions-design-element/packages/legions-pro-design/src/examples/assets/images/containers/'
const ls = spawn('cwebp',[src,'-o',`${root}/test1.webp`,'-crop',96, 0, 1728, 1080,'-q',100]);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`子进程退出，退出码 ${code}`);
});
/* execFile(cwebp, [mattera, '-o', 'output.webp'], err => {
	if (err) {
		throw err;
	}

	console.log('Image is converted!');
}); */