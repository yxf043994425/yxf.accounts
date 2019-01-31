import { ReadFile } from './utils/file';

console.log('file');
ReadFile('./docs/项目需求分解说明.md', (data) => {
  console.log(data);
})