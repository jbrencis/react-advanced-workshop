const shell = require('shelljs');

[
  '01.application-composition',
  '02.context',
  '03.refs',
  '04.modern-lifecycle-methods',
  '05.profiler',
  '06.hooks',
  '07.suspense',
  '08.testing',
].forEach(dir => {
  shell.cd(`${dir}`)
  shell.echo(`\nPreparing topic ${dir}:`)
  shell.exec('yarn')
  shell.cd('..')
});
