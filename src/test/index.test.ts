import { promises } from 'fs';
import { join } from 'path';
import childProcess = require('child_process');

/**
 * This e2e test builds an example app with the new plugin, but dumps to local
 * json files and asserts on that output 
**/

const buildExampleApp = () => {
  return new Promise<void>((resolve, reject) => {
    childProcess.exec("npm --prefix playground install && npm --prefix playground run build", (err) => {
      err ? reject(err): resolve();
    })
  });
};

interface WrittenSpan {
  traceId: string;
  parentId: string;
  name: string;
  id: string;
  kind: string;
  timestamp: number;
  duration: number;
  attributes: Record<string, string>;
  status: string;
  events: string;
}

describe('@emattiza/unplugin-opentelemetry', () => {
  describe('build one application', () => {
    let spans: WrittenSpan[];
    let rootSpan: WrittenSpan;
    jest.setTimeout(20*1000);
    beforeAll(async () => {
      await buildExampleApp();
      const spansStr = await promises.readFile(
        join(__dirname, "tmp/spans.json"),
        'utf-8'
      )

      spans = JSON.parse(spansStr);
      spans.forEach((span) => {
        if (!span.parentId) {
          rootSpan = span;
        }
      });
    });
    it('should build successfully', async () => {
      expect(rootSpan.name).toEqual('unplugin-opentelemetry');
    })
  })
});