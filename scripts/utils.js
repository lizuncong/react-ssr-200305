function format(time) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

function createCompilationPromise(name, compiler, config) {
  const title = name === 'client' ? '客户端' : '服务端';
  return new Promise((resolve, reject) => {
    let timeStart = new Date();

    compiler.hooks.compile.tap(name, () => {
      timeStart = new Date();
      console.info(`[${format(timeStart)}] 编译${title}...`);
    });

    compiler.hooks.done.tap(name, (stats) => {
      console.info(stats.toString(config.stats));
      const timeEnd = new Date();
      const time = timeEnd.getTime() - timeStart.getTime();
      if (stats.hasErrors()) {
        console.info(
          `[${format(timeEnd)}] ${title}编译失败， 耗时 ${time} ms`,
        );
        reject(new Error('编译失败!'));
      } else {
        console.info(
          `[${format(
            timeEnd,
          )}] ${title}编译完成， 耗时 ${time} ms`,
        );
        resolve(stats);
      }
    });
  });
}

module.exports = {
  createCompilationPromise,
  format,
};
