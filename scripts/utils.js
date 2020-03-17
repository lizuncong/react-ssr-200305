function format(time) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

function createCompilation(name, compiler, config) {
  const namesMap = {
    client: '客户端',
    server: '服务端',
  };
  const title = namesMap[name];
  let timeStart = new Date();
  compiler.hooks.compile.tap(name, () => {
    timeStart = new Date();
    console.info(`[${format(timeStart)}] 正在编译${title}...`);
  });

  compiler.hooks.done.tap(name, (stats) => {
    // console.log('config...', config.stats);
    console.info(stats.toString(config.stats));
    const timeEnd = new Date();
    const time = timeEnd.getTime() - timeStart.getTime();
    if (stats.hasErrors()) {
      console.info(
        `[${format(timeEnd)}] ${title}编译失败，耗时  ${time} ms`,
      );
      console.log(new Error('编译失败'));
    } else {
      console.info(
        `[${format(
          timeEnd,
        )}] ${title} 编译完成，耗时 ${time} ms`,
      );
      // console.log(stats);
    }
  });
}

module.exports = {
  createCompilation,
};
