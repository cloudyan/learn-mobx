// ${projectRoot}/plugin.ts
// https://github.com/umijs/umi-next/blob/master/examples/boilerplate/plugin.ts
import { IApi } from 'umi';

export default (api: IApi) => {
  api.modifyHTML(($) => {
    return $;
  });
  api.addHTMLMetas(() => [
    {property:"og:title", content: "数禾科技技术特刊"},
    {property:"og:image", content: "https://static.huanbeiloan.com/techweb/imgs/techweb-logo.png"},
    {property:"og:description", content: "一起围观公司数字化建设最新成果～"},
    { name: 'foo', content: 'bar' },
  ]);
  // api.addHTMLLinks(() => [{ rel: 'foo', content: 'bar' }]);
  // api.addHTMLStyles(() => [`body { color: red; }`]);
  // api.addHTMLHeadScripts(() => [`console.log('hello world from head')`]);
  // api.addHTMLScripts(() => [`console.log('hello world')`]);
  // api.addEntryCodeAhead(() => [`console.log('entry code ahead')`]);
  // api.addEntryCode(() => [`console.log('entry code')`]);
  // api.onDevCompileDone((opts) => {
  //   opts;
  //   // console.log('> onDevCompileDone', opts.isFirstCompile);
  // });
  // api.onBuildComplete((opts) => {
  //   opts;
  //   // console.log('> onBuildComplete', opts.isFirstCompile);
  // });
  // api.chainWebpack((memo) => {
  //   memo;
  // });
  // api.onStart(() => {});
  // api.onCheckCode((args) => {
  //   args;
  //   // console.log('> onCheckCode', args);
  // });

  // api.modifyHTML(($) => {
  //   $('head').append([
  //     `<script src='https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js'></script>`,
  //     `<script src='others...'></script>`
  //   ])
  //   return $;
  // });
};

/*
<meta name="description" content="一起围观公司数字化建设最新成果～" />
<link rel="icon" type="image/x-icon" href="/techweb/favicon.png" />
<meta property="og:title" content="数禾科技技术特刊" />
<meta
  property="og:image"
  content="https://static.huanbeiloan.com/techweb/imgs/techweb-logo.png"
/>
<meta
  property="og:description"
  content="一起围观公司数字化建设最新成果～"
/>
*/
