// tslint:disable-next-line: no-unused
declare var __webpack_public_path__: string;
const url = new URL(document.currentScript['src']);
const index = url.href.lastIndexOf('/');
__webpack_public_path__ = url.href.substring(0, index + 1);
