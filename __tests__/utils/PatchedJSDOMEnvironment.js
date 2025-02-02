import JSDOMEnvironment from 'jest-environment-jsdom';

/**
 * JSDOM has a documented issue re: missing support of core JS available since Node 17
 * e.g. https://github.com/jsdom/jsdom/issues/1721
 * e.g. https://github.com/jsdom/jsdom/issues/3363
 */
export default class PatchedJSDOMEnvironment extends JSDOMEnvironment {
  /** */
  constructor(...args) {
    super(...args);

    // delegate to node for structuredClone
    this.global.structuredClone = structuredClone;
  }
}
