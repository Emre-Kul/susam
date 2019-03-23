export default class Loader {
  protected url: string;

  constructor(url: string = '') {
    this.url = url;
  }

  public requestUrl(url: string = this.url) {
    return new Promise((resolve) => {
      const request = new XMLHttpRequest();
      request.open('GET', url);
      request.addEventListener('load', () => {
        resolve(request.response);
      });
      request.send();
    });
  }
}
